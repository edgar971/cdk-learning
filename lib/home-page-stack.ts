import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { resolve } from 'path';

export class HomePageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'Bucket', {
        removalPolicy: RemovalPolicy.DESTROY,
        accessControl: BucketAccessControl.PRIVATE,
    });

    new BucketDeployment(this, 'BucketDeployment', {
        destinationBucket: bucket,
        sources: [Source.asset(resolve(__dirname, `./pages`))]
    })

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');

    bucket.grantRead(originAccessIdentity);

    new Distribution(this, 'Distribution', {
        defaultRootObject: 'index.html',
        defaultBehavior: {
            origin: new S3Origin(bucket, {originAccessIdentity}),
        },
    })
  }
}

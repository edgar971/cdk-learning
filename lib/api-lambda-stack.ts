import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path'

export class ApiLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiFunction = new NodejsFunction(this, 'hello-world-function', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: Runtime.NODEJS_14_X,
      handler: 'main',
      bundling: {
        minify: true
      },
      entry: path.join(__dirname, `/../lib/functions/hello-world/index.ts`),
    });

    const serverlessApi = new RestApi(this, "serverless-app-api", {
      restApiName: "Serverless app API",
    });

    serverlessApi.root.addMethod("ANY", new LambdaIntegration(apiFunction));

    new cdk.CfnOutput(this, "HTTP API URL", {
      value:  serverlessApi.url ?? "Something went wrong with the deploy",
    });
  }
}

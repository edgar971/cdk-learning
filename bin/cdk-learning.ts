#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiLambdaStack } from '../lib/api-lambda-stack';
import { HomePageStack } from '../lib/home-page-stack';

const app = new cdk.App();
new ApiLambdaStack(app, 'CdkLearningStack', {});
new HomePageStack(app, 'HomePageStack', {});

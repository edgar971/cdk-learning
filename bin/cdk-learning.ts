#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkLearningStack } from '../lib/cdk-learning-stack';

const app = new cdk.App();
new CdkLearningStack(app, 'CdkLearningStack', {
  
});
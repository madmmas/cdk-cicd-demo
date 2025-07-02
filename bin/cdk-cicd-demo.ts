#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkCicdDemoStack } from '../lib/cdk-cicd-demo-stack';

const app = new cdk.App();
new CdkCicdDemoStack(app, 'CdkCicdDemoStack', {});
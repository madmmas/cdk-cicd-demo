import path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Duration } from 'aws-cdk-lib';

export class CdkCicdDemoStack extends cdk.Stack {
  
  urlOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, 'Handler', {
      code: new lambda.AssetCode(path.resolve(__dirname, '../lambda')),
      handler: 'handler.handler',
      runtime: lambda.Runtime.PYTHON_3_12,
    });

    const alias = new lambda.Alias(this, 'x', {
      aliasName: 'Current',
      version: handler.currentVersion,
    });
    
    const gw = new apigateway.LambdaRestApi(this, 'ApiGateway', {
      description: 'Endpoint for simple lambda powered web service',
      handler: alias,
    });

    const apiGateway5xx = new cloudwatch.Metric({
      metricName: '5XXError',
      namespace: 'AWS/ApiGateway',
      dimensionsMap: {
        ApiName: gw.restApiName,
      },
      statistic: 'Sum',
      period: Duration.minutes(1),
    });

    const failureAlarm = new cloudwatch.Alarm(this, 'RollbackAlarm', {
      metric: apiGateway5xx,
      threshold: 1,
      evaluationPeriods: 1,
    });

    
    new codedeploy.LambdaDeploymentGroup(this, 'DeploymentGroup ', {
      alias,
      deploymentConfig:
        codedeploy.LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES,
      alarms: [failureAlarm],
    });

    this.urlOutput = new cdk.CfnOutput(this, 'url', { value: gw.url });
  }
}

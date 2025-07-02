import path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class CdkCicdDemoStack extends cdk.Stack {
  
  urlOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, 'Handler', {
      code: new lambda.AssetCode(path.resolve(__dirname, 'lambda')),
      handler: 'handler.handler',
      runtime: lambda.Runtime.PYTHON_3_9,
    });

    const gw = new apigateway.LambdaRestApi(this, 'ApiGateway', {
      description: 'Endpoint for simple lambda powered web service',
      handler: handler,
    });

    this.urlOutput = new cdk.CfnOutput(this, 'url', { value: gw.url });
  }
}

import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkCicdDemo from '../lib/cdk-cicd-demo-stack';

test('Lambda Function Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkCicdDemo.CdkCicdDemoStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'python3.12'
  });
});

test('API Gateway Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkCicdDemo.CdkCicdDemoStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Description: 'Endpoint for simple lambda powered web service'
  });
});

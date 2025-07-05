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

test('Lambda Handler', () => {
  // GIVEN
  const app = new cdk.App();

  // WHEN
  new CdkCicdDemo.CdkCicdDemoStack(app, 'Stack');

  const template = app.synth().getStackByName('Stack').template['Resources'] as Map<String, any>
  const functions = Object.entries(template)
    .filter((resource) => resource[1]['Type'] === 'AWS::Lambda::Function');

  // THEN
  expect(functions.length).toEqual(1);
  expect(functions[0][1].Properties.Handler).toEqual('handler.handler');
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

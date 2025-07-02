// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface CdkCicdDemoProps {
  // Define construct properties here
}

export class CdkCicdDemo extends Construct {

  constructor(scope: Construct, id: string, props: CdkCicdDemoProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkCicdDemoQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

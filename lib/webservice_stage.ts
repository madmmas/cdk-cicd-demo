import { CfnOutput, StackProps, Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkCicdDemoStack } from "./cdk-cicd-demo-stack";

export class WebserviceStage extends Stage {
    urlOutput: CfnOutput;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const service = new CdkCicdDemoStack(this, 'WebService', {
            tags: {
                Application: 'WebService',
                Environment: id
            }
        });

        this.urlOutput = service.urlOutput;
    }
}
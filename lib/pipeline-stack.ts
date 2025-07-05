import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { WebserviceStage } from './webservice_stage';

export class PipelineStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const source = pipelines.CodePipelineSource.gitHub('madmmas/cdk-cicd-demo', 'main', {
            authentication: cdk.SecretValue.secretsManager('github-token'),
        });

        const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyAppPipeline',
            synth: new pipelines.ShellStep('Synth', {
                input: source,
                commands: [
                    'npm ci',
                    'npm run build',
                    'npm test',
                    'npx cdk synth'
                ]
            })
        });

        const preProdStage = new WebserviceStage(this, 'Pre-Prod');
        
        pipeline.addStage(preProdStage, {
            // pre: [new pipelines.ManualApprovalStep('ManualApproval')],
            post: [
                new pipelines.ShellStep('IntegrationTests', {
                    input: source,
                    commands: [
                        'npm install',
                        'npm run build',
                        'npm run integration'
                    ],
                    envFromCfnOutputs: {
                        SERVICE_URL: preProdStage.urlOutput
                    }
                })
            ]
        });
    }
}
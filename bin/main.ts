import { App } from '@aws-cdk/core';
import { EksBlueprint } from '@aws-quickstart/ssp-amazon-eks';
import { SnykMonitorAddOn } from '../dist';

const app = new App();

// AWS Properties
const account = '<account id>' // e.g. 492635582501
const region = '<region>' // e.g. us-east-1
const stackID = '<stack id>' // e.g. ssp-amazon-eks-snyk
const stackProps = { env: { account, region } }

// Snyk Properties
const integrationId = '<integration ID>' // e.g. abcd1234-abcd-1234-abcd-1234abcd1234
const dockerCfgJson = '{}' // for public registry
// use {"credsStore":"ecr-login"} for private ECR

EksBlueprint.builder()
    .addOns(new SnykMonitorAddOn({
        integrationId: Buffer.from(integrationId).toString('base64'),
        dockerCfgJson: Buffer.from(dockerCfgJson).toString('base64'),
        values: {} // additional Helm chart values
    }))
    .build(app, stackID, stackProps);

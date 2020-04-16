// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export interface EnvironmentSettings {
  production: boolean;
  hostUrl: string;
  hostUrlRGAuth: string;
}

export const environment = {
  production: false,
  hostUrl: 'http://13.229.135.210:8099',
  // hostUrl: 'http://FOM-CORE-UAT-AMS.ap-southeast-1.elasticbeanstalk.com:8099',
  hostUrlRepairProgress: 'http://FOM-CORE-UAT-ARC.ap-southeast-1.elasticbeanstalk.com',
  hostUrlRODetails: 'http://fom-core-uat-arc.ap-southeast-1.elasticbeanstalk.com',
  hostBOMHistoryUrl: 'http://fom-core-uat-arc.ap-southeast-1.elasticbeanstalk.com',
  loginUrl: 'http://fom-core-uat-user-portal.ap-southeast-1.elasticbeanstalk.com',
  analyticHostUrl: 'http://fom-core-uat-analytics.ap-southeast-1.elasticbeanstalk.com',
  // analyticHostUrl:'http://192.168.2.195:8100',
  arcHostURL:'http://FOM-CORE-UAT-ARC.ap-southeast-1.elasticbeanstalk.com',
  trackURL:'http://fom-core-uat-logistics.ap-southeast-1.elasticbeanstalk.com'
};

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
  //hostUrl:'http://18.136.44.170:8020',
  //hostUrlDeviceDelivered:'http://3.0.95.198:8099',
  hostUrlDeviceDelivered:'http://fom-core-uat-ams.ap-southeast-1.elasticbeanstalk.com',
  hostUrl: 'http://fom-core-uat-arc.ap-southeast-1.elasticbeanstalk.com',
  loginUrl: 'http://fom-core-uat-user-portal.ap-southeast-1.elasticbeanstalk.com',
  analyticHostUrl: 'http://fom-core-uat-analytics.ap-southeast-1.elasticbeanstalk.com',
  amtrustDispatchHostURL: 'http://fom-core-uat-logistics.ap-southeast-1.elasticbeanstalk.com',
  trackURL:'http://fom-core-uat-logistics.ap-southeast-1.elasticbeanstalk.com'

};
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BuildOrigin: "web",
  tenantId: "devTenant",
  // backendBaseUrl:"https://riabackend.staqlab-tunnel.com",
  backendBaseUrl:"http://localhost:8080",
  contextPath:"",
  origin:"https://riagroceries-mpm.web.app",
  // origin:"http://localhost:4200",
  orgName1: "Ria",
  orgName2: "Groceries"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  BuildOrigin: "web",
  // tenantId: "ria.mpm",
  tenantId: "devTenant",
  // backendBaseUrl:"https://riabackend.staqlab-tunnel.com",
  backendBaseUrl:"http://localhost:8080",
  contextPath:"",
  // origin:"https://riagroceriesadmin-mpm.web.app",
  origin:"http://localhost:4100",
  orgName: "Ria Groceries"
};

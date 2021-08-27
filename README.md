### Phyllo Connect SDK (Middleware)

#### Process to modify redirection URLs:


- Open [phylloConnectSDK.js](https://github.com/abhishek-digiqt/phyllo-connect/blob/npm-module/sdk/phylloConnectSDK.js "phylloConnectSDK.js")
- Modify the variable `PHYLLO_CONNECT_URL` ,here the keys `sandbox` and `production` are for sandbox and production React APP urls respectively.
-  Modify these as per your wish.
- Navigate back to the root directory of the Phyllo Connect SDK(Middleware) and execute the command `npm run-script build`. This will bundle all the code into the `dist` folder. Output bundled file name will be `phylloConnectSDK.js`. This contains all the code needed to access the SDK.

#### Important Notes:
- Please ensure to run `npm install` if setting this process up for the first time.
- Do not modify `webpack-config.js`. This can break the bundling process.
- Do not modify `package.json` or `package-lock.json` without understanding its contents. This will break the entire project structure.

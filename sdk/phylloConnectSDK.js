// INPUTS: Env, Used Id, Token, Developer Name, Redirect URL

const PHYLLO_CONNECT_URL = {
  sandbox: "http://localhost:3000/",
  production: "http://localhost:3000/",
};

const validateParams = (params) => {
  if (!params.env || !["sandbox", "production"].includes(params.env)) {
    throw new Error("Please Provide Valid Environment");
  }
  if (!params.userId) {
    throw new Error("Please Provide User Id");
  }
  if (!params.appName) {
    throw new Error("Please Provide App Name");
  }
  if (!params.token) {
    throw new Error("Please Provide Token");
  }
};

const clientConnect = async (
  env,
  userId,
  token,
  appName,
  workPlatformId = null
) => {
  //TODO: VALIDATE ALL PARAMS
  try {
    validateParams({ env, userId, token, appName });
    var workPlatformIdQueryParam = `workPlatformId=${workPlatformId}&`;
    if (
      workPlatformId === null ||
      workPlatformId === undefined ||
      workPlatformId === ""
    ) {
      workPlatformIdQueryParam = "";
    }
    var phylloConnectURL = `${PHYLLO_CONNECT_URL[env]}?userId=${userId}&appName=${appName}&workPlatformId=${workPlatformId}&redirectURL=${window.location.href}&token=${token}&env=${env}`;
    return phylloConnectURL;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { clientConnect: clientConnect };

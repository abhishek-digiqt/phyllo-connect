import { v4 as uuidv4 } from "uuid";

import Phyllo from "./phylloInstance";
import api from "./phylloAxios";

const CLIENT_REDIRECT_URL = "http://localhost:3000/status/";
export class PhylloSDK {
  constructor() {
    this.api = api;
    this._URL_CREATE_USER_TOKEN = "/v1/sdk-tokens";
    this._URL_CREATE_USER = "/v1/users";
  }

  //create user
  async createUser(name) {
    let externalId = uuidv4();
    name = name || "testuser";

    try {
      let response = await this.api.post(this._URL_CREATE_USER, {
        name: name,
        external_id: externalId,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(`Error ${err} occurred while generating user token`);
      return err.body;
    }
  }

  async createUserToken(userId, redirectURL) {
    if (!userId) {
      let err = new Error("User id cannot be blank or null");
      throw err;
    }
    try {
      let response = await this.api.post(this._URL_CREATE_USER_TOKEN, {
        user_id: userId,
        redirect_uri: redirectURL,
        products: ["IDENTITY", "ENGAGEMENT", "INCOME"],
      });
      return response.data;
    } catch (err) {
      console.error(`Error ${err} occurred while generating user token`);
      return err.body;
    }
  }
}

export const getSDKInstance = async (
  appName,
  enviroment,
  isExistingUser = false
) => {
  let phylloDemoAPIInstance = new PhylloSDK();
  var userID = "";

  //check if existing user or not
  if (isExistingUser) {
    userID = localStorage.getItem("phyllo_userid");
  } else if (
    (isExistingUser && !localStorage.getItem("phyllo_userid")) ||
    !isExistingUser
  ) {
    // If existing user and no localstorage key found or if is not existing user
    let userInstance = await phylloDemoAPIInstance.createUser();
    userID = userInstance.id;
    localStorage.setItem("phyllo_userid", userID);
  }
  // Generate token.
  let tokenInstance = await phylloDemoAPIInstance.createUserToken(
    userID,
    CLIENT_REDIRECT_URL
  );
  let token = tokenInstance.sdk_token;

  // If token not generated then pass the message.
  if (!token) {
    let error = new Error(tokenInstance.msg);
    throw error;
  }

  // Create the instance of the phyllo sdk.
  var phylloInstance = new Phyllo({
    userID: userID,
    token: token,
    authEvents: {},
    env: enviroment,
    appName: appName,
  });

  return phylloInstance;
};

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

export const getSDKInstance = async (appName, enviroment) => {
  let phylloDemoAPIInstance = new PhylloSDK();
  let userInstance = await phylloDemoAPIInstance.createUser();
  const userId = userInstance.id;

  // let userId = "a0412c15-1fd5-4b0b-bac0-c67a6f1b60cf";
  // Generate token.
  let tokenInstance = await phylloDemoAPIInstance.createUserToken(
    userId,
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
    userID: userId,
    token: token,
    authEvents: {},
    env: enviroment,
    appName: appName,
  });

  return phylloInstance;
};

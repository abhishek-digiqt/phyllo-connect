const SANDBOX = "sandbox";
const PROD = "production";
const SANDBOX_URL = "https://api-sandbox.getphyllo.com";
const PROD_URL = "https://api.getphyllo.com";
const CLIENT_CONNECT_URL = "http://localhost:3000/introscreen/";

class Phyllo {
  constructor(data) {
    // Validate the request data.

    /*
      User id, token and auth events are required parameters in SDK.
    */
    // TODO: Provide link in the exceptions so that, user can directly redirect to that specific error.
    if (!data.userID) {
      let err = new Error("user_id is required.");
      throw err;
    }

    if (!data.token) {
      let err = new Error("Token is required.");
      throw err;
    }

    // Check that if auth events passed in the request then it is of the object type.
    if (data.authEvents && typeof data.authEvents !== "object") {
      let err = new Error("authEvents must be object({...}).");
      throw err;
    }

    // Initialize the tokens, userid, events etc.
    this.token = data.token;
    this.userID = data.userID;
    this.appName = data.appName;
    this.authEvents = data.authEvents;
    this.env = data.env;

    // Initialize the API.
    let env = data.env;
    if (env === SANDBOX) {
      this.baseDomain = SANDBOX_URL;
    } else if (env === PROD) {
      this.baseDomain = PROD_URL;
    } else {
      let err = new Error(`${SANDBOX} and ${PROD} are allowed values for env.`);
      throw err;
    }

    // Define urls.
    this._URL_GET_CONFIGURATION = this.baseDomain + "/v1/internal/config";
    this._URL_GET_AUTHORIZATIONS =
      this.baseDomain + "/v1/internal/authorizations";
    this._URL_GET_WORK_PLATFORMS =
      this.baseDomain + "/v1/internal/work-platforms";
    this._URL_GET_ALL_ACCOUNTS = this.baseDomain + "/v1/internal/accounts";
    this._URL_LOGOUT_ACCOUNT =
      this.baseDomain + "/v1/internal/accounts/{id}/logout";
  }

  addEvent(eventName, eventFunc) {
    this.authEvents[eventName] = eventFunc;
  }

  _getCommonHeaders() {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("sdk-type", "WEB");
    headers.append("sdk-version", "1.0");
    headers.append("content-type", "application/json");
    return headers;
  }

  getAppName() {
    return this.data.appName || "";
  }

  async getConfiguration() {
    let headers = this._getCommonHeaders();
    try {
      const response = await fetch(this._URL_GET_CONFIGURATION, {
        method: "GET",
        headers: headers,
        redirect: "follow",
      });

      try {
        return response.json();
      } catch (err) {
        console.error(
          `${response} has not received valid json for getConfigurations`
        );
        return {};
      }
    } catch (err) {
      console.error(`${err} occurred while calling getConfigurations`);
      return {};
    }
  }

  async getAuthorizations(workPlatformId) {
    if (!workPlatformId) {
      let err = new Error("Work platform id cannot be null or blank");
      throw err;
    }

    let headers = this._getCommonHeaders();
    try {
      const response = await fetch(this._URL_GET_AUTHORIZATIONS, {
        method: "POST",
        headers: headers,
        redirect: "follow",
        body: JSON.stringify({
          work_platform_id: workPlatformId,
        }),
      });

      try {
        return response.json();
      } catch (err) {
        console.error(
          `${response} has not received valid json for getAuthorizations`
        );
        return {};
      }
    } catch (err) {
      console.error(`${err} occurred while calling getAuthorizations`);
      return {};
    }
  }

  async getAllWorkPlatforms() {
    let headers = this._getCommonHeaders();
    try {
      const response = await fetch(this._URL_GET_WORK_PLATFORMS, {
        method: "GET",
        headers: headers,
        redirect: "follow",
      });

      try {
        return response.json();
      } catch (err) {
        console.error(
          `${response} has not received valid json for getAllWorkPlatforms`
        );
        return {};
      }
    } catch (err) {
      console.error(`${err} occurred while calling getAllWorkPlatforms`);
      return {};
    }
  }

  async getWorkPlatform(workPlatformId) {
    let headers = this._getCommonHeaders();
    try {
      const response = await fetch(
        `${this._URL_GET_WORK_PLATFORMS}/${workPlatformId}`,
        {
          method: "GET",
          headers: headers,
          redirect: "follow",
        }
      );

      try {
        return response.json();
      } catch (err) {
        console.error(
          `${response} has not received valid json for getAllWorkPlatforms`
        );
        return {};
      }
    } catch (err) {
      console.error(`${err} occurred while calling getAllWorkPlatforms`);
      return {};
    }
  }

  async getAllAccounts() {
    let headers = this._getCommonHeaders();
    try {
      const response = await await fetch(this._URL_GET_ALL_ACCOUNTS, {
        method: "GET",
        headers: headers,
        redirect: "follow",
      });

      try {
        return response.json();
      } catch (err) {
        console.error(
          `${response} has not received valid json for getAllAccounts`
        );
        return {};
      }
    } catch (err) {
      console.error(`${err} occurred while calling getAllAccounts`);
      return {};
    }
  }

  async getAccountInfo(accountId) {
    let headers = this._getCommonHeaders();
    try {
      const response = await fetch(
        `${this._URL_GET_ALL_ACCOUNTS}/${accountId}`,
        {
          method: "GET",
          headers: headers,
          redirect: "follow",
        }
      );
      try {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Error Fetching ${accountId}`);
        }
      } catch (err) {
        console.error(
          `${response} has not received valid json for getAllAccounts`
        );
        return {};
      }
    } catch (err) {
      console.error(`${err} occurred while calling getAllAccounts`);
      return {};
    }
  }

  async logoutAccount(accountId) {
    let headers = this._getCommonHeaders();
    try {
      const response = await await fetch(
        `${this._URL_LOGOUT_ACCOUNT}`.replace("{id}", accountId),
        {
          method: "GET",
          headers: headers,
          redirect: "follow",
        }
      );

      try {
        return response.json();
      } catch (err) {
        console.error(
          `${response} has not received valid json for getAllAccounts`
        );
        return {};
      }
    } catch (err) {
      console.error(`${err} occurred while calling getAllAccounts`);
      return {};
    }
  }

  async clientConnect(flow) {
    const workPlatformId =
      flow !== null || flow !== "undefined" ? flow : "main";
    console.log(
      `${CLIENT_CONNECT_URL}?userId=${this.userID}&?appName=${this.appName}&?workPlatformId=${workPlatformId}`
    );
    window.location.replace(
      `${CLIENT_CONNECT_URL}?userId=${this.userID}&appName=${this.appName}&workPlatformId=${workPlatformId}&redirectURL=${window.location.href}&token=${this.token}&env=${this.env}`
    );
  }
}

export default Phyllo;

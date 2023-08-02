import axios from "axios";

class ApiClient {
  constructor(remoteHostUrl) {
    this.token = null;
    this.remoteHostUrl = "http://localhost:3001";
    // this.remoteHostUrl = "https://cashflow-api-l7eq.onrender.com"
  }

  setToken(token) {
    this.token = token;
  }

  async request({ endpoint, method, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    console.debug("API Call:", endpoint, data, method);
    const params = method === "GET" ? data : {};
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, params, headers });
      return { data: res.data, error: null, message: null };
    } catch (error) {
      console.error("APIclient.makeRequest.error", error.response);
      if (error?.response?.status === 404)
        return { data: null, error: "Not found" };
      const message = error?.response?.data?.error?.message;
      return { data: null, error: error?.response, message };
    }
  }

  async register(creds) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: creds,
    });
  }

  async me(creds) {
    return await this.request({
      endpoint: `auth/me`,
      method: `GET`,
      data: creds,
    });
  }

  async login(creds) {
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: creds,
    });
  }
  async goals(creds) {
    return await this.request({
      endpoint: `auth/goal`,
      method: `POST`,
      data: creds,
    });
  }
  async quiz(creds) {
    return await this.request({
      endpoint: `auth/updatequiz`,
      method: `POST`,
      data: creds,
    });
  }

  async total_points(creds) {
    return await this.request({
      endpoint: `auth/totalpoints`,
      method: `PATCH`,
      data: creds,
    });
  }
  async imageStats(creds) {
    return await this.request({
      endpoint: `auth/imageStatus`,
      method: `PATCH`,
      data: creds,
    });
  }

  async goalStat(creds) {
    return await this.request({
      endpoint: `auth/goalStatus`,
      method: `PATCH`,
      data: creds,
    });
  }
}

export default  new ApiClient("http://localhost:3001");
// export default new ApiClient("https://cashflow-api-l7eq.onrender.com");

import { Client } from "./client";
import { Api } from "../utils/api";

export class HrApi extends Client {
  constructor(endpoint) {
    super();
    this._client = new Api(endpoint);
  }

  async loadData() {
    return this._client.get("users");
  }
}

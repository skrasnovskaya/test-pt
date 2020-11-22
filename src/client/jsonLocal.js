import { Client } from "./client";

import Data from "../data/testtakers.json";

export class JsonLocal extends Client {
  constructor(path) {
    super();
    this._data = Data;
  }

  loadData() {
    return this._data;
  }
}

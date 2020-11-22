import { Client } from "./client";

import Data from "../data/testtakers.csv";

/**
 * Loaded Data has the following view
 * [
 *   [key1, key2, key3],
 *   [value01, value02, value03],
 *   [value11, value12, value13],
 *   [value21, value22, value23]
 *   ...
 * ]
 */
export class CsvLocal extends Client {
  constructor(path) {
    super();
    this._data = Data;
  }

  loadData() {
    const keys = this._data[0];

    const processedData = [];

    for (let i = 1; i < this._data.length; i++) {
      const item = this._data[i];

      if (item[0] === "") {
        // Skip iteration in case of empty item after csv parsing
        continue;
      }
      const obj = keys.reduce((acc, key, index) => {
        acc[key] = item[index];
        return acc;
      }, {});

      processedData.push(obj);
    }

    return processedData;
  }
}

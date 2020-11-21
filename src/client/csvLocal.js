import { Client } from './client';

import Data from '../data/testtakers.csv';

export class CsvLocal extends Client {
    constructor() {
        super();
        this._data = Data;
    }

    async loadData() {
        const keys = this._data[0];

        const processedData = [];
        
        for(let i = 1; i < this._data.length; i++) {
          const item = this._data[i];
          const obj = keys.reduce((acc, key, index) => {
            acc[key] = item[index];
            return acc;
          }, {});

          processedData.push(obj);
        }

        return processedData;
    }
}
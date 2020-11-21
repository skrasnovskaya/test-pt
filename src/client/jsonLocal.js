import { Client } from './client';

import Data from '../data/testtakers.json';

export class JsonLocal extends Client {
    constructor() {
        super();
		this._data = Data;
    }

    async loadData() {
        return this._data;
    }
}
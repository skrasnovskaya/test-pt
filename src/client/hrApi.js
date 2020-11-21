import { Client } from './client';
import { Api } from '../utils/api';

export class HrApi extends Client {
    constructor() {
        super();
		this._client = new Api('https://hr.oat.taocloud.org/api/');
    }

    async loadData() {
        return this._client.get('users');
    }
}
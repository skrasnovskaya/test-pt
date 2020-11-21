import { Client } from './client';
import { Api } from '../utils/api';

/**
 * FYI: Request goes to https://hr.oat.taocloud.org/v1/ instead of the provided http://hr.oat.taocloud.org/api/ 
 */
export class HrApi extends Client {
    constructor() {
        super();
		this._client = new Api('https://hr.oat.taocloud.org/v1/');
    }

    async loadData() {
        return this._client.get('users');
    }
}
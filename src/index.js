import { List } from './components/list';
import { JsonLocal } from './client/jsonLocal';
import { CsvLocal } from './client/csvLocal';
import { HrApi } from './client/hrApi';

import './styles.css';

function componentList() {
    const data = [{name: "Test1"}, {name: "Test2"}];
    const list = new List(data);
    return list.render();
}

document.body.appendChild(componentList());

(async () => {
    try {
        // JSON
        const clientJson = new JsonLocal();
        const dataJson = await clientJson.loadData();
        const listJson = new List(dataJson, {
            renderItem: ({ login }) => (`<div>${login}</div>`)
        });

        document.body.appendChild(listJson.render());

        // CSV
        const clientCsv = new CsvLocal();
        const dataCsv = await clientCsv.loadData();
        const listCsv = new List(dataCsv, {
            renderItem: ({ login }) => (`<div>${login}</div>`)
        });

        document.body.appendChild(listCsv.render());

        // API
        const clientApi = new HrApi();
        const dataApi = await clientApi.loadData();
        const listApi = new List(dataApi, {
            renderItem: ({ login }) => (`<div>${login}</div>`)
        });

        document.body.appendChild(listApi.render());
    } catch (e) {
        // Deal with the fact the chain failed
    }
})();
  
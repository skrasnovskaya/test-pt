import { List } from './components/list';
import { JsonLocal } from './client/jsonLocal';
import { CsvLocal } from './client/csvLocal';
import { HrApi } from './client/hrApi';

import './styles.css';

(async () => {
    try {
        const presets = [
            {
                client: new JsonLocal(),
                listOptions: {
                    container: ['div', {className: 'block-list'}],
                    renderItem: ({ title, firstname, lastname }, index) => (`<div class="block-list-item">${index} - <span class="user-name">${title} ${firstname} ${lastname}</span></div>`)
                },
                parentNode: document.getElementById('local-json'),
            },
            {
                client: new CsvLocal(),
                listOptions: {
                    root: ['table', {className: 'csv-table'}],
                    container: ['tbody', {className: 'csv-tbody'}],
                    renderHeader: () => (`<thead><tr><th>N</th><th>Name</th><th>Email</th></tr></thead>`),
                    renderItem: ({ title, firstname, lastname, email }, index) => (`<tr class="csv-table-row"><td>${index}</td><td>${title} ${firstname} ${lastname}</td><td>${email}</td></tr>`)
                },
                parentNode: document.getElementById('local-csv'),
            },
            {
                client: new HrApi(),
                listOptions: {
                    container: ['ul', {className: 'list'}],
                    renderItem: ({ userId, firstName, lastName }) => (`<li class="list-item" onclick="(function(){alert('Hey ${firstName}');return false;})();return false;"><span class="list-item-id">${userId}</span><span class="list-item-delimeter">-</span><span class="list-item-name">${firstName} ${lastName}</span></li>`)
                },
                parentNode: document.getElementById('api-data'),
            }
        ];

        presets.forEach(async ({ client, listOptions, parentNode }) => {
            const data = await client.loadData();
            const list = new List(data, listOptions);
            parentNode.appendChild(list.render());
        });
       
    } catch (e) {
        console.error(e);

        const error = document.createElement('div');
        error.innerHTML = `<span><b>Error:</b> ${e.toString()}</span>`;
        document.body.appendChild(error);
    }
})();
  
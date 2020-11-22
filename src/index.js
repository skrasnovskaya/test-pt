import { List } from "./components/list";
import { JsonLocal } from "./client/jsonLocal";
import { CsvLocal } from "./client/csvLocal";
import { HrApi } from "./client/hrApi";

import "./styles.css";

(async () => {
  try {
    const presets = [
      {
        client: new JsonLocal("<local-path-to-file>"),
        listOptions: {
          container: ["div", { className: "block-list" }],
          renderItem: ({ title, firstname, lastname }, index) =>
            `<div class="block-list-item">${index} - <span class="user-name">${title} ${firstname} ${lastname}</span></div>`,
        },
        parentNode: document.getElementById("local-json"),
      },
      {
        client: new CsvLocal("<local-path-to-file>"),
        listOptions: {
          root: ["table", { className: "csv-table" }],
          container: ["tbody", { className: "csv-tbody" }],
          renderHeader: () =>
            `<thead><tr><th>N</th><th>Name</th><th>Email</th></tr></thead>`,
          renderItem: ({ title, firstname, lastname, email }, index) =>
            `<tr class="csv-table-row"><td>${index}</td><td>${title} ${firstname} ${lastname}</td><td>${email}</td></tr>`,
        },
        parentNode: document.getElementById("local-csv"),
      },
      {
        client: new HrApi("https://hr.oat.taocloud.org/v1/"),
        listOptions: {
          container: ["ul", { id: "test-list", className: "list" }],
          renderItem: (item) =>
            `<li class="list-item" data-item=${JSON.stringify(
              item
            )}><span class="list-item-id">${
              item.userId
            }</span><span class="list-item-delimeter">-</span><span class="list-item-name">${
              item.firstName
            } ${item.lastName}</span></li>`,
        },
        parentNode: document.getElementById("api-data"),
        afterRender: () => {
          const list = document.getElementById("test-list");
          if (list) {
            list.addEventListener("click", function (e) {
              const item = e.target && e.target.closest("li.list-item");
              if (item && item.dataset) {
                alert(item.dataset.item);
              }
            });
          }
        },
      },
    ];

    //
    presets.forEach(
      async ({ client, listOptions, parentNode, afterRender }) => {
        const data = await client.loadData();
        const list = new List(data, listOptions);
        parentNode.appendChild(list.render());

        if (afterRender) {
          afterRender();
        }
      }
    );

    // Check list without data passed
    const listInvalid = new List();
    document.getElementById("invalid-data").appendChild(listInvalid.render());
  } catch (e) {
    console.error(e);

    const error = document.createElement("div");
    error.innerHTML = `<span><b>Error:</b> ${e.toString()}</span>`;
    document.body.appendChild(error);
  }
})();

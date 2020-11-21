import { createNode } from '../utils/nodes';
/**
 * List  - render data in a list view
 * 
 * data - array of objects (required) 
 * options: 
 *   - (*required) renderItem: (item) => item string template,
 *   - renderHeader: () => header string template,
 *   - root: [tag, { props }] (e.g. ['div', { className: 'my-list'}]),
 *   - container: [tag, { props }] (e.g. ['div']),
 *   - visibleItems: number, (for virtualization)
 */

// TODO: element templates
// The HTML Content Template (<template>) element is not supported in IE. Avoid <template>?
// onClick events

// Add virtualized list

const defaultElements = {
    root: ['div', { className: 'my-list'}],
    container: ['div'],
    renderHeader: (keys) => (`<div>${keys.toString()}</div>`),
    renderItem: (item, index) => (`<div>${index}-${item.toString()}</div>`)
}
export class List {
    constructor(data = [], {
        root = defaultElements.root,
        container = defaultElements.container,
        renderHeader,
        renderItem = defaultElements.renderItem,
    } = {}) {
        this._data = data;
        this._root = root;
        this._container = container;
        this._renderHeader = renderHeader;
        this._renderItem = renderItem;
      }

      render() {
          const component = createNode(...this._root);

          if (this._renderHeader) {
            const keys = Object.keys(this._data[0] || {});
            const header = this._renderHeader(keys);
            component.insertAdjacentHTML('afterBegin', header);
          }         

          const items = this._data.map(this._renderItem).join(''); // TODO: process not only string templates

          const container = createNode(...this._container);
          container.insertAdjacentHTML('afterBegin', items);      

          component.appendChild(container);

          return component;
      }
}
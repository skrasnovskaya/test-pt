/**
 * List  - render data in a list view
 * 
 * data - array of objects (required) 
 * options: 
 *   - (*required) renderItem: (item) => item string template,
 *   - (*required) renderHeader: () => header string template,
 *   - renderRoot,
 *   - renderContainer,
 *   - visibleItems: number, (for virtualization)
 */

 // Add virtualized list

export class List {
    constructor(data, {
        renderItem = ({ name }) => (`<div>${name}</div>`),
    } = {}) {
        this._data = data;
        this._root = 'div';
        this._container = 'div';
        this._header = '<div>Test</div>';
        this._renderItem = renderItem;
      }

      render() {
          const parent = document.createElement('div');
          const items = this._data.map(this._renderItem).join('');
          parent.innerHTML = items;
          return parent;
      }
}
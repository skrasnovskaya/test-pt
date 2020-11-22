import { createNode, isDataValid, isRenderTemplateValid, isNodeTemplateValid } from '../utils';

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

// TODO: Add virtualized list
// TODO: Enhance element templates
// Remarks: The HTML Content Template (<template>) element is not supported in IE. Support onClick events

const defaultElements = {
    root: ['div', { className: 'my-list'}],
    container: ['div'],
    renderHeader: (keys) => (`<div>${keys.toString()}</div>`),
    renderItem: (item, index) => (`<div>${index}-${item.toString()}</div>`)
}

const validate = (data, options) => {
    if (!isDataValid(data)) {
        console.error('ERROR: The provided data is not an array');
        return false;
    }

    const { renderItem, renderHeader, root, container } = options;
    if (!isRenderTemplateValid(renderItem, [{}, 1]) 
        || (renderHeader && !isRenderTemplateValid(renderHeader, [{}, 1]))
        || (root && !isNodeTemplateValid(root))
        || (container && !isNodeTemplateValid(container))
    ) {
        console.error('ERROR: The provided options are incorrect.');
        return false;
    }

    return true;
}

export class List {
    constructor(data, options = {}) {
        const valid = validate(data, options);
        this._isValid = valid;
        if (valid) {
            this._data = data;
            this._root = options.root || defaultElements.root;
            this._container = options.container || defaultElements.container;
            this._renderHeader = options.renderHeader;
            this._renderItem = options.renderItem || defaultElements.renderItem;
        }
      }

      isValid() {
        return this._isValid;
      }

      render() {
          if (!this.isValid()) {
              return this._renderError();
          }

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

      _renderError() {
        const element = document.createElement('div');
        element.innerHTML = '<span style="color: red; font-style: italic;">An error occurred while rendering a List</span>';
        return element;
      }
}
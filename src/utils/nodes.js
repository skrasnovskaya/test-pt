export const getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;

export const isNode = element => element && element.nodeType;

export const createNode = (tag, props = {}) => {
    const element = document.createElement(tag);

    for (let key in props) {
        element[key] = props[key];
    }

    return element;
}
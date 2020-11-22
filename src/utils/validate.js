export const isFunction = (item) => typeof item === "function";

export const isObject = (item) =>
  Object.prototype.toString.call(item) === "[object Object]";

export const isDataValid = (data) => data && Array.isArray(data);

export const isRenderTemplateValid = (render, input) =>
  isFunction(render) && typeof render(...input) === "string";

export const isNodeTemplateValid = (template) =>
  Array.isArray(template) &&
  /^[a-z]+$/i.test(template[0]) &&
  (template[1] === undefined || isObject(template[1]));

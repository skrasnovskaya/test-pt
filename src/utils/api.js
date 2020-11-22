/**
 * API
 * endpoint - api url
 * options:
 *   - token - provided token for authorized access
 *
 *
 * No token provided
 * Only GET method implemented
 * Response type should be handled
 */

export class Api {
  constructor(endpoint, { token = "" } = {}) {
    this._endpoint = endpoint;
    this._token = token;
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  _request(method, src, data = {}) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    };

    if (data && Object.keys(data).length > 0) {
      options.body = JSON.stringify(data);
    }

    return fetch(`${this._endpoint}${src}`, options)
      .then((response) => {
        if (response.ok) {
          const contentType = response.headers.get("content-type");

          return contentType && contentType.includes("application/json")
            ? response.json()
            : response.text(); // TODO
        }

        throw Error(
          `${response.url} ${response.status} ${response.statusText}`
        );
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  get(src) {
    return this._request("GET", src);
  }
}

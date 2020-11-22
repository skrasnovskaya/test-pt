# Test OAT - User list

## Development

`./index.html` - template index.html file
`./src/index.js` - entrypoint
`./src/data/*` - test data .json, .csv

- Clone repo, run `npm install`. 
- Run `npm run start`.
- Go to `http://localhost:8000/` (should run automatically).

* Run browser with CORS turned off to allow requests from localhost to https://hr.oat.taocloud.org/v1/

To get built static files run `npm run build`, open `dist/index.html` file in a browser.

### `npm run start` 
Starts dev server (hot reload)

### `npm run build`
Builds files to `dist` folder

## Nice to have
- IoC
- virtualized list
- IE support?
- reconsidered templating
- loading effect
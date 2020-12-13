import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
    accessKey: APP_ACCESS_KEY,
    headers: {
        'X-Custom-Header': 'foo',
    },
    timeout: 500,
});

export { toJson, unsplash };

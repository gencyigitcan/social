const fs = require('fs').promises;
const path = require('path');

async function test() {
    console.log('KV ENV:', process.env.KV_REST_API_URL);
    if (process.env.KV_REST_API_URL) {
        console.log('Detected KV environment variable! Creating false positive for local dev.');
    } else {
        console.log('No KV environment variable detected.');
    }
}
test();

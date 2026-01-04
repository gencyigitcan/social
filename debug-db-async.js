const fs = require('fs').promises;
const path = require('path');

async function test() {
    console.log('CWD:', process.cwd());
    const DATA_FILE = path.join(process.cwd(), 'lib/data.json');
    console.log('Path:', DATA_FILE);
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        console.log('Read bytes:', data.length);
        await fs.writeFile(DATA_FILE, data);
        console.log('Write success!');
    } catch (e) {
        console.error('FAIL:', e);
    }
}
test();

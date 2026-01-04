const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'lib/data.json');
console.log('Attempting to write to:', DATA_FILE);

try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    console.log('Read success, length:', data.length);
    fs.writeFileSync(DATA_FILE, data); // Write it back
    console.log('Write success!');
} catch (e) {
    console.error('Operation failed:', e);
}

import fs from 'fs';
import path from 'path';

// Import data from the old TS files
import { services } from '../data/services';
import { problems } from '../data/problems';
import { locations } from '../data/locations';

const dataDir = path.join(__dirname, '../data');

function saveJson(filename: string, data: any) {
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Saved ${filename}`);
}

saveJson('services.json', services);
saveJson('problems.json', problems);
saveJson('locations.json', locations);

console.log('Migration complete.');

import fs from 'fs';
import path from 'path';
import { cases } from '../data/cases';

const dataDir = path.join(__dirname, '../data');

fs.writeFileSync(path.join(dataDir, 'cases.json'), JSON.stringify(cases, null, 2), 'utf-8');
console.log('Migrated cases.json');

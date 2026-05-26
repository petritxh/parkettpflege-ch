import * as fs from 'fs';
import * as path from 'path';

const PROBLEMS_FILE = path.join(process.cwd(), 'data', 'problems.json');

async function main() {
  if (!fs.existsSync(PROBLEMS_FILE)) {
    console.error('problems.json not found!');
    return;
  }

  const problemsData = JSON.parse(fs.readFileSync(PROBLEMS_FILE, 'utf-8'));
  console.log(`Processing ${problemsData.length} articles for image updates...`);

  let updatedCount = 0;

  for (const problem of problemsData) {
    const kw = problem.focusKeyword.toLowerCase();
    let selectedImage = '/uploads/mountain_parquet.png'; // Default elegant background

    // 1. Scratches & Physical Damage -> scratched_parquet.png
    if (
      kw.includes('kratzer') || 
      kw.includes('hund') || 
      kw.includes('katze') || 
      kw.includes('delle') || 
      kw.includes('brandfleck') || 
      kw.includes('bohrlöcher') || 
      kw.includes('haarrisse') || 
      kw.includes('bürostuhl') ||
      kw.includes('risse')
    ) {
      selectedImage = '/uploads/scratched_parquet.png';
    } 
    // 2. Stains, Mold & Water -> old_parquet.png
    else if (
      kw.includes('wasser') || 
      kw.includes('schimmel') || 
      kw.includes('muffig') || 
      kw.includes('fuge') || 
      kw.includes('fettfleck') || 
      kw.includes('fleck') || 
      kw.includes('rotwein') || 
      kw.includes('wachs') || 
      kw.includes('bad') ||
      kw.includes('kleber') ||
      kw.includes('streifen')
    ) {
      selectedImage = '/uploads/old_parquet.png';
    }
    // 3. Care, Cleaning & Shining -> kitchen_parquet.png
    else if (
      kw.includes('reinigen') || 
      kw.includes('wischen') || 
      kw.includes('glanz') || 
      kw.includes('stumpf') || 
      kw.includes('pflegen') || 
      kw.includes('nachölen') || 
      kw.includes('oelen') || 
      kw.includes('schleifen') || 
      kw.includes('versiegeln') ||
      kw.includes('austauschen') ||
      kw.includes('reparieren')
    ) {
      selectedImage = '/uploads/kitchen_parquet.png';
    }

    problem.imageUrl = selectedImage;
    updatedCount++;
    console.log(`Updated "${problem.focusKeyword}" -> ${selectedImage}`);
  }

  fs.writeFileSync(PROBLEMS_FILE, JSON.stringify(problemsData, null, 2), 'utf-8');
  console.log(`\n🎉 Successfully updated all ${updatedCount} article images!`);
}

main();

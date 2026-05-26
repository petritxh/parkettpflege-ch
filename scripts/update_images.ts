import * as fs from 'fs';
import * as path from 'path';

const PROBLEMS_FILE = path.join(process.cwd(), 'data', 'problems.json');

async function main() {
  if (!fs.existsSync(PROBLEMS_FILE)) {
    console.log("No problems.json found");
    return;
  }

  let problemsData = JSON.parse(fs.readFileSync(PROBLEMS_FILE, 'utf-8'));
  let updated = false;

  for (let i = 0; i < problemsData.length; i++) {
    const problem = problemsData[i];
    if (problem.imageUrl && (problem.imageUrl.includes('unsplash.com') || problem.imageUrl.includes('.png'))) {
      console.log(`Updating image for ${problem.slug}...`);
      
      const keyword = problem.focusKeyword || problem.h1;
      const cleanPrompt = keyword.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
      const filename = `seo_${Date.now()}_${cleanPrompt}.jpg`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      
      const aiPrompt = `beautiful clean elegant modern hardwood parquet floor, ${keyword}, ultra realistic, professional interior design architecture photography, high resolution, 8k, warm lighting, cozy elegant atmosphere`;
      const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(aiPrompt)}?width=1200&height=800&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
      
      try {
        const imgRes = await fetch(imgUrl);
        const buffer = await imgRes.arrayBuffer();
        fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(buffer));
        
        problem.imageUrl = `/uploads/${filename}`;
        updated = true;
        console.log(`📸 Bild erfolgreich generiert: ${filename}`);
        
        // short delay to not spam the image generator too much
        await new Promise(r => setTimeout(r, 1000));
      } catch (e) {
        console.error("⚠️ Bildgenerierung fehlgeschlagen", e);
      }
    }
  }

  if (updated) {
    fs.writeFileSync(PROBLEMS_FILE, JSON.stringify(problemsData, null, 2));
    console.log("problems.json updated successfully.");
  } else {
    console.log("No unsplash images found to update.");
  }
}

main();

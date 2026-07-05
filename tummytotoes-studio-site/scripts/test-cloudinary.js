import { v2 as cloudinary } from 'cloudinary';
import { existsSync, readFileSync } from 'node:fs';

function loadLocalEnv() {
  if (!existsSync('.env')) return;

  const lines = readFileSync('.env', 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

loadLocalEnv();

cloudinary.config({
  cloud_name: getRequiredEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
  api_key: getRequiredEnv('CLOUDINARY_API_KEY'),
  api_secret: getRequiredEnv('CLOUDINARY_API_SECRET'),
});

async function listFolders() {
  console.log('Fetching sample resources to identify folder structures...');
  try {
    const result = await cloudinary.api.root_folders();
    console.log('Root folders:', result.folders);
    
    // Search for some resources and look at their folder property
    const searchResult = await cloudinary.search
      .expression('resource_type:image')
      .max_results(100)
      .execute();
      
    const folders = new Set();
    searchResult.resources.forEach(r => {
      if (r.folder) folders.add(r.folder);
      if (r.asset_folder) folders.add(r.asset_folder);
    });
    
    console.log('\nFolders found in search results:');
    console.log(Array.from(folders));
  } catch (err) {
    console.error(err);
  }
}

listFolders();

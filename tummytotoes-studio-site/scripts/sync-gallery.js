import { createClient } from '@sanity/client';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';
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

// Cloudinary configuration
cloudinary.config({
  cloud_name: getRequiredEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
  api_key: getRequiredEnv('CLOUDINARY_API_KEY'),
  api_secret: getRequiredEnv('CLOUDINARY_API_SECRET'),
});

// Sanity Client with Write permissions
const client = createClient({
  projectId: getRequiredEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: getRequiredEnv('NEXT_PUBLIC_SANITY_DATASET'),
  apiVersion: '2026-05-15',
  token: getRequiredEnv('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
});

const CATEGORIES_MAPPING = [
  { id: 'newborn', title: 'Newborn Stories', categorySlug: 'Newborn', folders: ['New Born'] },
  { id: 'maternity', title: 'Maternity Glow', categorySlug: 'Maternity', folders: ['Maternity'] },
  { id: 'kids', title: 'Little Wonders', categorySlug: 'Kids', folders: ['Kids'] },
  { id: 'events', title: 'Event Highlights', categorySlug: 'Events', folders: ['Home/Events', 'Events'] },
  { id: 'fashion', title: 'Fashion Stories', categorySlug: 'Fashion', folders: ['Fashion'] },
  { id: 'wedding', title: 'Wedding & Love', categorySlug: 'Wedding', folders: ['Wedding'] },
];

const FALLBACK_PANELS_METADATA = [
  {
    category: 'Newborn',
    publicId: 'IMG_9706-copy_dsbpnu',
    title: 'Newborn Stories',
    description: 'Soft, natural portraits that preserve those first tiny details and quiet moments.',
    objectPosition: 'center center',
    order: 1,
  },
  {
    category: 'Maternity',
    publicId: 'IMGL1146-copy_p4zus6',
    title: 'Maternity Glow',
    description: 'Elegant frames that celebrate your journey with calm tones and gentle movement.',
    objectPosition: 'center 20%',
    order: 2,
  },
  {
    category: 'Kids',
    publicId: '05_rbgb45',
    title: 'Little Wonders',
    description: 'Joyful, unscripted frames of children being gloriously, authentically themselves.',
    objectPosition: 'center center',
    order: 3,
  },
  {
    category: 'Fashion',
    publicId: 'IMGL0342-copy_tyov64',
    title: 'Fashion Stories',
    description: 'Bold editorial sessions where personality meets light — crafted to captivate.',
    objectPosition: 'center center',
    order: 4,
  },
  {
    category: 'Events',
    publicId: '0F8A0009-copy_c6emkw',
    title: 'Event Highlights',
    description: 'Key celebration moments captured with artistic framing and documentary honesty.',
    objectPosition: 'center center',
    order: 5,
  },
];

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function mapCloudinaryResource(r, index, idPrefix) {
  const _key = `image_${idPrefix}_${index}_${crypto.randomBytes(4).toString('hex')}`;
  return {
    _type: 'cloudinary.asset',
    _key: _key,
    id: md5(r.public_id),
    public_id: r.public_id,
    resource_type: r.resource_type || 'image',
    type: r.type || 'upload',
    format: r.format,
    version: Number(r.version),
    secure_url: r.secure_url,
    width: r.width,
    height: r.height,
    bytes: r.bytes,
    created_at: r.created_at,
  };
}

async function fetchImagesFromFolders(folders) {
  for (const folder of folders) {
    const result = await cloudinary.search
      .expression(`resource_type:image AND asset_folder="${folder}"`)
      .sort_by('public_id', 'asc')
      .max_results(500)
      .execute();

    const resources = result.resources || [];
    console.log(`- Folder "${folder}": Found ${resources.length} images.`);
    if (resources.length > 0) {
      return resources;
    }
  }

  return [];
}

async function syncGalleryCategories() {
  console.log('1. Syncing Gallery Categories...');
  for (const cat of CATEGORIES_MAPPING) {
    try {
      const resources = await fetchImagesFromFolders(cat.folders);

      if (resources.length === 0) continue;

      const mappedImages = resources.map((r, i) => mapCloudinaryResource(r, i, cat.id));
      const documentId = `galleryCategory-${cat.id}`;

      await client.createOrReplace({
        _type: 'galleryCategory',
        _id: documentId,
        title: cat.title,
        category: cat.categorySlug,
        images: mappedImages,
      });
      console.log(`  ✓ Synced Gallery Category "${cat.categorySlug}"`);
    } catch (err) {
      console.error(`  ✗ Error syncing category "${cat.categorySlug}":`, err.message);
    }
  }
}

async function syncHeroSlides() {
  console.log('\n2. Syncing Hero Slides...');
  try {
    const result = await cloudinary.search
      .expression('resource_type:image AND asset_folder="hero-display"')
      .sort_by('public_id', 'asc')
      .execute();

    const resources = result.resources || [];
    console.log(`- Folder "hero-display": Found ${resources.length} images.`);

    for (let i = 0; i < resources.length; i++) {
      const r = resources[i];
      const docId = `heroSlide-${md5(r.public_id)}`;
      const mappedAsset = mapCloudinaryResource(r, 0, 'hero');

      await client.createOrReplace({
        _type: 'heroSlide',
        _id: docId,
        alt: `Hero Banner Image ${i + 1}`,
        order: (i + 1) * 10,
        active: true,
        image: mappedAsset,
      });
    }
    console.log(`  ✓ Synced ${resources.length} Hero Slides!`);
  } catch (err) {
    console.error('  ✗ Error syncing Hero Slides:', err.message);
  }
}

async function syncGalleryPanels() {
  console.log('\n3. Syncing Homepage Gallery Panels...');
  try {
    const publicIds = FALLBACK_PANELS_METADATA.map((p) => p.publicId);
    // Search Cloudinary for the cover images
    const expression = `public_id:(${publicIds.map((id) => `"${id}"`).join(' OR ')}) AND resource_type:image`;
    const result = await cloudinary.search.expression(expression).execute();
    const resources = result.resources || [];

    console.log(`- Found ${resources.length}/${publicIds.length} cover images in Cloudinary.`);

    for (const metadata of FALLBACK_PANELS_METADATA) {
      const match = resources.find((r) => r.public_id === metadata.publicId);
      if (!match) {
        console.warn(`  ! Could not find cover image for category ${metadata.category} in Cloudinary.`);
        continue;
      }

      const docId = `galleryPanel-${metadata.category.toLowerCase()}`;
      const mappedAsset = mapCloudinaryResource(match, 0, `panel_${metadata.category.toLowerCase()}`);

      await client.createOrReplace({
        _type: 'galleryPanel',
        _id: docId,
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        objectPosition: metadata.objectPosition,
        order: metadata.order,
        coverImage: mappedAsset,
      });
      console.log(`  ✓ Synced Homepage Gallery Panel "${metadata.title}"`);
    }
  } catch (err) {
    console.error('  ✗ Error syncing Homepage Gallery Panels:', err.message);
  }
}

async function runSync() {
  await syncGalleryCategories();
  await syncHeroSlides();
  await syncGalleryPanels();
  console.log('\n============================================');
  console.log('Sync complete!');
}

runSync().catch(console.error);

import { readFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = [
  { name: "logo", path: "src/assets/logo.png" },
  { name: "building", path: "src/assets/photos/building.jpg" },
  { name: "assembly", path: "src/assets/photos/assembly.jpg" },
  { name: "culturalGuests", path: "src/assets/photos/cultural-guests.jpg" },
  { name: "treePlanting", path: "src/assets/photos/tree-planting.jpg" },
  { name: "treePlantingGroup", path: "src/assets/photos/tree-planting-group.jpg" },
  { name: "computerClass", path: "src/assets/photos/computer-class.jpg" },
  { name: "parade", path: "src/assets/photos/parade.jpg" },
  { name: "exam", path: "src/assets/photos/exam.jpg" },
  { name: "procession", path: "src/assets/photos/procession.jpg" },
  { name: "classroom", path: "src/assets/photos/classroom.jpg" },
  { name: "girlsAlpona", path: "src/assets/photos/girls-alpona.jpg" },
  { name: "boysAlpona", path: "src/assets/photos/boys-alpona.jpg" },
  { name: "classHall", path: "src/assets/photos/class-hall.jpg" },
  { name: "prize1", path: "src/assets/photos/prize-1.jpg" },
  { name: "prize2", path: "src/assets/photos/prize-2.jpg" },
  { name: "prize3", path: "src/assets/photos/prize-3.jpg" },
  { name: "prize4", path: "src/assets/photos/prize-4.jpg" },
  { name: "prize5", path: "src/assets/photos/prize-5.jpg" },
].map((asset) => ({
  ...asset,
  filename: basename(asset.path),
  stem: basename(asset.path)
    .replace(/\.[^.]+$/, "")
    .toLowerCase(),
  extension: basename(asset.path).split(".").at(-1).toLowerCase(),
}));

const apiKey = process.env.IMGBB_API_KEY;
const mongoUri = process.env.MONGODB_URI;
if (!apiKey || !mongoUri) {
  throw new Error("Set IMGBB_API_KEY and MONGODB_URI in the server environment before migrating.");
}

const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 10000 });

function isImageReference(value) {
  return typeof value === "string" && /\.(?:png|jpe?g|webp|gif)(?:[?#].*)?$/i.test(value);
}

function imageAssetFor(value) {
  if (!isImageReference(value)) return null;
  let pathname;
  try {
    pathname = new URL(value, "http://localhost").pathname;
  } catch {
    return null;
  }
  const filename = basename(pathname).toLowerCase();
  return (
    assets.find(
      (asset) =>
        filename === asset.filename.toLowerCase() ||
        (filename.startsWith(`${asset.stem}-`) && filename.endsWith(`.${asset.extension}`)),
    ) ?? null
  );
}

function replaceImageReferences(value, urls) {
  if (typeof value === "string") {
    const asset = imageAssetFor(value);
    return asset ? urls[asset.name] : value;
  }
  if (Array.isArray(value)) return value.map((item) => replaceImageReferences(item, urls));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceImageReferences(item, urls)]),
    );
  }
  return value;
}

async function uploadImage(asset) {
  const bytes = await readFile(resolve(root, asset.path));
  const form = new FormData();
  form.set("image", new Blob([bytes]), asset.filename);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    body: form,
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(
      `ImgBB returned an invalid response for ${asset.filename} (${response.status}).`,
    );
  }
  const url = result?.data?.url;
  if (!response.ok || !result?.success || typeof url !== "string" || !url.startsWith("https://")) {
    throw new Error(`ImgBB upload failed for ${asset.filename} (${response.status}).`);
  }
  return url;
}

try {
  await client.connect();
  const database = client.db(process.env.MONGODB_DB || undefined);
  const migration = database.collection("alokdia_media_migration");
  const urls = {};

  for (const asset of assets) {
    const existing = await migration.findOne({ _id: asset.name });
    const url = existing?.url ?? (await uploadImage(asset));
    if (!existing) {
      await migration.insertOne({
        _id: asset.name,
        filename: asset.filename,
        url,
        createdAt: new Date(),
      });
    }
    urls[asset.name] = url;
  }

  const content = database.collection("alokdia_data");
  const records = await content.find({}).toArray();
  for (const record of records) {
    const next = replaceImageReferences(record, urls);
    if (JSON.stringify(next) !== JSON.stringify(record)) {
      await content.replaceOne({ _id: record._id }, next);
    }
  }

  console.log(JSON.stringify(urls, null, 2));
  console.log(`Migrated ${assets.length} default images and updated MongoDB image references.`);
} finally {
  await client.close();
}

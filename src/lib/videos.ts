import { readdir } from "node:fs/promises";
import path from "node:path";

const videoRoot = path.resolve(process.cwd(), "public/videos");
const supportedExtensions = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const publishMarker = ".published";

export interface VideoFile {
  title: string;
  slug: string;
  relativePath: string;
  assetUrl: string;
  pageUrl: string;
  mimeType: string;
}

function mimeTypeFor(extension: string) {
  switch (extension) {
    case ".webm":
      return "video/webm";
    case ".mov":
      return "video/quicktime";
    case ".m4v":
      return "video/x-m4v";
    default:
      return "video/mp4";
  }
}

function makeTitle(slug: string) {
  const fileName = slug.split("/").at(-1) ?? slug;
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

async function walk(
  directory: string,
  root: string,
  publishedOnly = false,
): Promise<VideoFile[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const videos: VideoFile[] = [];
  const isPublished = entries.some(
    (entry) => !entry.isDirectory() && entry.name === publishMarker,
  );

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      videos.push(...(await walk(absolutePath, root, publishedOnly)));
      continue;
    }

    if (publishedOnly && !isPublished) continue;

    const extension = path.extname(entry.name).toLowerCase();
    if (!supportedExtensions.has(extension)) continue;

    const relativePath = path
      .relative(root, absolutePath)
      .replaceAll("\\", "/");
    const slug = relativePath.replace(/\.[^/.]+$/, "");
    const encodedPath = relativePath
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const encodedSlug = slug
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

    videos.push({
      title: makeTitle(relativePath),
      slug,
      relativePath,
      assetUrl: `/videos/${encodedPath}`,
      pageUrl: `/videos/${encodedSlug}`,
      mimeType: mimeTypeFor(extension),
    });
  }

  return videos;
}

export async function getVideos(options: { publishedOnly?: boolean } = {}) {
  try {
    const videos = await walk(videoRoot, videoRoot, options.publishedOnly);
    return videos.sort((first, second) =>
      first.relativePath.localeCompare(second.relativePath),
    );
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export function getPublishedVideos() {
  return getVideos({ publishedOnly: true });
}

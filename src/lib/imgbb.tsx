const DATABASE_API = `http://${typeof window === "undefined" ? "127.0.0.1" : window.location.hostname}:8765/api`;

type ImgbbResponse = {
  url?: string;
  error?: string;
};

export async function uploadImageToImgbb({ data }: { data: { image: string } }) {
  const response = await fetch(`${DATABASE_API}/upload`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = (await response.json()) as ImgbbResponse;
  if (!response.ok || !result.url) {
    throw new Error(result.error ?? `ImgBB upload failed (${response.status}).`);
  }
  return { url: result.url };
}

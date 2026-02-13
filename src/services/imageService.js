const imageCache = new Map();

const fallbackImage = "/public/images/fallback-image.svg";

export async function fetchWordImage(word) {
  if (!word) return fallbackImage;

  const normalized = word.trim().toLowerCase();

  // cache
  if (imageCache.has(normalized)) {
    return imageCache.get(normalized);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        normalized,
      )}&per_page=1`,
      {
        headers: {
          Authorization:
            "Client-ID cWn8NA7LbX4dFyr50jHT2syLplZeI8cVwBSDtwSE8b4",
        },
      },
    );

    // rate limit
    if (response.status === 429) {
      console.warn("Unsplash rate limit exceeded");
      return fallbackImage;
    }

    const text = await response.text();

    // not a JSON
    if (!text.trim().startsWith("{")) {
      console.warn("Unsplash non-JSON response:", text);
      return fallbackImage;
    }

    const data = JSON.parse(text);

    const image = data.results?.[0]?.urls?.regular || fallbackImage;

    imageCache.set(normalized, image);
    return image;
  } catch (error) {
    console.error("Unsplash fetch failed:", error);
    return fallbackImage;
  }
}

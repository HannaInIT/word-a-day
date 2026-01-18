import { config } from "../config.js";

export async function fetchWordImage(word) {
  try {
    const response = await fetch(`${config.UNSPLASH_API_URL}?query=${word}`, {
      headers: {
        Authorization: `Client-ID ${config.UNSPLASH_ACCESS_KEY}`,
      },
    });
    const responseData = await response.json();

    return responseData.results[0].urls.full;
  } catch (error) {
    console.log(error);
  }
}

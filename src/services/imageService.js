export async function fetchWordImage(word) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${word}`,
      {
        headers: {
          Authorization:
            "Client-ID cWn8NA7LbX4dFyr50jHT2syLplZeI8cVwBSDtwSE8b4",
        },
      },
    );
    const responseData = await response.json();

    // Use optional chaining and fallback
    return (
      responseData.results?.[0]?.urls?.full ||
      "/public/images/fallback-image.svg"
    );
  } catch (error) {
    console.log(error);
    return "/public/images/fallback-image.svg";
  }
}

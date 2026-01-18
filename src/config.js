// Environment variables configuration
// For frontend applications, we need to handle env vars differently

export const config = {
  // In development, you can use this approach
  // In production, set these via build process or hosting platform

  UNSPLASH_ACCESS_KEY:
    import.meta.env?.VITE_UNSPLASH_ACCESS_KEY ||
    process.env?.UNSPLASH_ACCESS_KEY ||
    "cWn8NA7LbX4dFyr50jHT2syLplZeI8cVwBSDtwSE8b4", // fallback demo key

  DICTIONARY_API_URL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  UNSPLASH_API_URL: "https://api.unsplash.com/search/photos",
};

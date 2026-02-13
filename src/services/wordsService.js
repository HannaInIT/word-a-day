export async function fetchWordInformation(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (response.status === 404) return null;
    if (response.status === 429) {
      console.warn("Dictionary API rate limit");
      return null;
    }

    const text = await response.text();

    // not a JSON
    if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) {
      console.warn("Non-JSON response:", text);
      return null;
    }

    const data = JSON.parse(text);
    return data[0] ?? null;

  } catch (error) {
    console.error("Dictionary fetch failed:", error);
    return null;
  }
}


export async function getRandomWordInformation() {
  let englishWordsData = null;

  try {
    const englishWords = await fetch("./data/english_words.json");
    englishWordsData = await englishWords.json();
  } catch (error) {
    console.log(error);
  }

  const randomWord = getRandomWordFromArray(englishWordsData);

  const wordInformation = await fetchWordInformation(randomWord);

  return wordInformation;
}

function addAudio(audioSrc) {
  const audioTrack = document.createElement("audio");
  audioTrack.src = audioSrc;
  audioTrack.controls = true;

  body.appendChild(audioTrack);
}

function getRandomWordFromArray(array) {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
}

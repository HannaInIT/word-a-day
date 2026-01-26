export async function fetchWordInformation(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );

    if (response.status === 404) {
      return null; // Word not found - UI handles this
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData[0];
  } catch (error) {
    if (error.message.includes("API error:")) throw error;
    throw new Error("Network error occurred");
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

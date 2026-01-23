export async function fetchWordInformation(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    const responseData = await response.json();

    return responseData[0];
  } catch (error) {
    console.log(error);
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

import { MAIN_CONTENT_ID, CLASS_NEXT_WORD_WRAPPER } from "../constants.js";
import { initRandomWordPage } from "../pages/randomWordPage.js";

/**
 * Extracts up to three example sentences from the meanings array.
 * @param {Array} meanings - Array of meanings from the dictionary API response.
 * @returns {string[]} An array of example sentences (maximum of 3).
 */
export function extractExamplesFromWordData(meanings) {
  const examples = [];

  for (const meaning of meanings) {
    meaning.definitions.forEach((definition) => {
      if (definition.example) {
        examples.push(definition.example);
      }
    });
  }
  return examples.slice(0, 3);
}

/**
 * Renders the word information page including image, pronunciation, definition, and examples.
 * @param {Object} wordData - The word data object returned from the dictionary API.
 * @param {string} wordImage - The image URL related to the word (from Unsplash).
 * @param {boolean} isSearchPage - Flag indicating whether this is a search result page.
 */
export function initWordPage(wordData, wordImage, isSearchPage) {
  const main = document.getElementById(MAIN_CONTENT_ID);

  const wordTranscription = wordData.phonetics.find((p) => p.text).text;
  const wordAudio = wordData.phonetics.find((p) => p.audio).audio;

  const mainWordMeaning = wordData.meanings[0];

  const wordExamples = extractExamplesFromWordData(wordData.meanings);

  const examplesListHtml = wordExamples
    .map((example) => `<li>${example}</li>`)
    .join("");

  main.innerHTML = String.raw`
  <h2>${isSearchPage ? "Search result" : "Random word"}</h2>
  <div class="word-container">
    <img src="${wordImage}" class="word-img" loading="lazy"/>

    <div class="right-wrapper">
      <h3>${wordData.word}</h3>

      <div class="pronunciation-wrapper">
          <p>${wordTranscription}</p>

          ${
            wordAudio
              ? `
            <audio id="audio-player" class="hidden-audio" src="${wordAudio}" controls="true"></audio>
            <button class="speaker-icon" onclick="document.getElementById('audio-player').play()">
            <img src="/public/images/speaker.svg" alt="play pronunciation" />
            </button>
            `
              : ""
          }        
      </div>

      <div>
        <div class="word-meaning-container">${wordData.word} (${mainWordMeaning.partOfSpeech}) - ${mainWordMeaning.definitions[0].definition}</div>

      <div>
        <ol class="examples-list">Examples
          ${examplesListHtml}
      </ol>
      </div>
      
    </div>
    <div class="${CLASS_NEXT_WORD_WRAPPER}">
  <button id="next-word-btn">${isSearchPage ? "Random word" : "Next word"}</button>
</div>
  </div>

      
  </div>
  `;

  const nextWordBtn = document.getElementById("next-word-btn");
  if (nextWordBtn) {
    nextWordBtn.addEventListener("click", () => {
      initRandomWordPage();
    });
  }
}

import { getRandomWordInformation } from "../services/wordsService.js";
import { initWordPage } from "../views/randomWordView.js";
import { fetchWordImage } from "../services/imageService.js";
import { MAIN_CONTENT_ID } from "../constants.js";

export async function initRandomWordPage() {
  document.body.className = "";
  const main = document.getElementById(MAIN_CONTENT_ID);
  main.innerHTML = "";
  initLoader();

  try {
    const word = await getRandomWordInformation();
    const imageUrl = await fetchWordImage(word.word);
    initWordPage(word, imageUrl, false);
  } catch (error) {
    console.error(error);
  } finally {
    removeLoader();
  }
}

export function initLoader() {
  const userInterface = document.getElementById("user-interface");
  const oldLoader = userInterface.querySelector(".loader-container");
  if (oldLoader) return;

  const loaderDiv = document.createElement("div");
  loaderDiv.classList.add("loader-container");

  const loaderImg = document.createElement("img");
  loaderImg.src = "/public/images/loader.png";
  loaderImg.alt = "Loading...";

  loaderDiv.appendChild(loaderImg);
  userInterface.appendChild(loaderDiv);
}

export function removeLoader() {
  const userInterface = document.getElementById("user-interface");
  const loader = userInterface.querySelector(".loader-container");
  if (!loader) return;

  setTimeout(() => {
    loader.remove();
  }, 500);
}

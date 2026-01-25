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

  // Create the loader element
  const loader = document.createElement("div");
  loader.classList.add("loader");

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 80 80");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Loading...");

  // Create rectangle element
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "8");
  rect.setAttribute("y", "8");
  rect.setAttribute("width", "64");
  rect.setAttribute("height", "64");

  svg.appendChild(rect);
  loader.appendChild(svg);
  loaderDiv.appendChild(loader);
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

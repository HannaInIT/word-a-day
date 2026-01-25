import { MAIN_CONTENT_ID, START_LEARNING_BUTTON_ID } from "../constants.js";
import { createHomeElement } from "../views/homeView.js";
import { initRandomWordPage } from "./randomWordPage.js";

export const initHomePage = () => {
  document.body.className = "";
  const mainContent = document.getElementById(MAIN_CONTENT_ID);
  mainContent.innerHTML = "";
  const homeElement = createHomeElement();
  mainContent.appendChild(homeElement);
  document
    .getElementById(START_LEARNING_BUTTON_ID)
    .addEventListener("click", startLearning);
};

export const startLearning = () => {
  document.body.className = "";
  initRandomWordPage();
};

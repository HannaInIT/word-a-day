import { MAIN_CONTENT_ID, START_LEARNING_BUTTON_ID } from "../constants.js";
import { createAboutElement } from "../views/aboutView.js";
import { startLearning } from "./homePage.js";

export const initAboutPage = () => {
  document.body.className = "about-background";
  const mainContent = document.getElementById(MAIN_CONTENT_ID);
  mainContent.innerHTML = "";
  const aboutElement = createAboutElement();
  mainContent.appendChild(aboutElement);
  document
    .getElementById(START_LEARNING_BUTTON_ID)
    .addEventListener("click", startLearning);
};

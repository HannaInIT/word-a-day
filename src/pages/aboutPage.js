import { MAIN_CONTENT_ID, START_LEARNING_BUTTON_ID } from "../constants.js";
import { createAboutElement } from "../views/aboutView.js";
import { startLearning } from "./homePage.js";

export const initAboutPage = () => {
  document.body.className = "";
  const mainContent = document.getElementById(MAIN_CONTENT_ID);
  mainContent.innerHTML = "";
  const aboutElement = createAboutElement();
  mainContent.appendChild(aboutElement);

  const startLearningButton = document.getElementById(START_LEARNING_BUTTON_ID);
  if (startLearningButton) {
    startLearningButton.addEventListener(
      "click",
      () => {
        startLearning();
      },
      { once: true },
    ); // 'once' option removes listener after first use
  }
};

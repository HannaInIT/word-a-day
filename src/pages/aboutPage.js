import { MAIN_CONTENT_ID, START_LEARNING_BUTTON_ID } from "../constants.js";
import { createAboutElement } from "../views/aboutView.js";
import { startLearning } from "./homePage.js";

export const initAboutPage = () => {
  const mainContent = document.getElementById(MAIN_CONTENT_ID);
  mainContent.innerHTML = "";
  const aboutElement = createAboutElement();
  mainContent.appendChild(aboutElement);

  // Use event delegation - attach to persistent parent element
  mainContent.addEventListener(
    "click",
    (e) => {
      if (e.target.id === START_LEARNING_BUTTON_ID) {
        startLearning();
      }
    },
    { once: true },
  ); // 'once' option removes listener after first use
};

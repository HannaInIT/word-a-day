import { CLASS_ABOUT_BOX, START_LEARNING_BUTTON_ID } from "../constants.js";

/**
 * Creates the About view container element.
 * @returns {HTMLDivElement} The root element for the About view.
 */

export function createAboutElement() {
  const aboutContainer = document.createElement("div");
  aboutContainer.classList.add(CLASS_ABOUT_BOX);

  aboutContainer.innerHTML = String.raw`
  <div class="about-image-container">
<img src="./public/images/about_img.png" alt="about image" class="about-image"/>
  </div>

<div class="about-content-container">
<div class="about-text"> 
    <h1 class="about-title">WORD A DAY</h1>
    <span>consistency matters more than speed</span>

    <div class="about-description">
    <p class="about-description-item">Trying to learn English fast?</p>
    <p class="about-description-item">We often overestimate what we can do in a day and underestimate what we can achieve over time.</p>
    <p class="about-description-item">Learning one word a day is a small step — but over time, it leads to big results. Here, you're free to go at your own pace.</p>
    <p class="about-description-item">Learn one word a day — or as many as you like. Ready to start?</p>
    </div>

    </div>
    
    <button id="${START_LEARNING_BUTTON_ID}" class="start-learning-button">START</button>
     </div>
  `;

  return aboutContainer;
}

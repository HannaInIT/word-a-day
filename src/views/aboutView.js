import {
  START_LEARNING_BUTTON_ID,
  CLASS_ABOUT_BOX,
  CLASS_ABOUT_IMAGE_CONTAINER,
  CLASS_ABOUT_IMAGE,
  CLASS_ABOUT_CONTENT_CONTAINER,
  CLASS_ABOUT_TEXT,
  CLASS_ABOUT_TITLE,
  CLASS_ABOUT_DESCRIPTION,
  CLASS_ABOUT_DESCRIPTION_ITEM,
  CLASS_START_LEARNING_BUTTON,
} from "../constants.js";

export function createAboutElement() {
  const aboutContainer = document.createElement("div");
  aboutContainer.classList.add(CLASS_ABOUT_BOX);

  aboutContainer.innerHTML = String.raw`
  <div class="${CLASS_ABOUT_IMAGE_CONTAINER}">
    <img src="./public/images/about_img.png" alt="about image" class="${CLASS_ABOUT_IMAGE}"/>
  </div>

  <div class="${CLASS_ABOUT_CONTENT_CONTAINER}">
    <div class="${CLASS_ABOUT_TEXT}"> 
      <h1 class="${CLASS_ABOUT_TITLE}">WORD A DAY</h1>
      <span>consistency matters more than speed</span>

      <div class="${CLASS_ABOUT_DESCRIPTION}">
        <p class="${CLASS_ABOUT_DESCRIPTION_ITEM}">Trying to learn English fast?</p>
        <p class="${CLASS_ABOUT_DESCRIPTION_ITEM}">We often overestimate what we can do in a day and underestimate what we can achieve over time.</p>
        <p class="${CLASS_ABOUT_DESCRIPTION_ITEM}">Learning one word a day is a small step — but over time, it leads to big results. Here, you're free to go at your own pace.</p>
        <p class="${CLASS_ABOUT_DESCRIPTION_ITEM}">Learn one word a day — or as many as you like. Ready to start?</p>
      </div>
    </div>
    
    <button id="${START_LEARNING_BUTTON_ID}" class="${CLASS_START_LEARNING_BUTTON}">START</button>
  </div>
  `;

  return aboutContainer;
}

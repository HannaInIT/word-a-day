import {
  START_LEARNING_BUTTON_ID,
  CLASS_HOME_BOX,
  CLASS_PARAGRAPH_WRAPPER,
} from "../constants.js";

/**
 * Create the home screen
 * @returns {Element}
 */

export const createHomeElement = () => {
  const element = document.createElement("div");
  element.classList.add(CLASS_HOME_BOX);
  element.innerHTML = String.raw`
  <h1>Word a Day</h1>
    <h2>Consistency matters more than speed</h2>
    <div class="${CLASS_PARAGRAPH_WRAPPER}">
      <p>Trying to learn English fast?</p>
      <p>We often overestimate what we can do in a day and underestimate what we can achieve over time.</p>
      <p>Learning one word a day is a small step — but over time, it leads to big results. Here, you're free to go at your own pace.</p>
      <p>Learn one word a day — or as many as you like.</p>
      <p>Ready to start?</p>
      </div>
      <button id="${START_LEARNING_BUTTON_ID}">Start learning</button>
  `;
  return element;
};

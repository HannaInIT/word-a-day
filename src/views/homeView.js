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
  <div class="home-image-container">
    <img src="./public/images/home_img.png" alt="home image" class="home-image"/>
  </div>

  <div class="home-content-container">
   <div class="home-text"> 
    <h1>EXPLORE THE WORLD OF</h1>  
    <h2>ENGLISH</h2>
    <span>through daily word discovery</span>
   </div>
   
    <button id="${START_LEARNING_BUTTON_ID}">Start</button>
    </div>
 

   
  `;
  return element;
};

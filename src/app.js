import { initHomePage } from "./pages/homePage.js";
import { initMainLayout } from "./views/mainLayout.js";

const loadApp = () => {
  initMainLayout();
  initHomePage();
};
window.addEventListener("load", loadApp);

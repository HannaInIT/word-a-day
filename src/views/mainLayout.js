import {
  USER_INTERFACE_ID,
  MAIN_CONTENT_ID,
  CLASS_LOGO,
} from "../constants.js";
import { fetchWordInformation } from "../services/wordsService.js";
import { initHomePage } from "../pages/homePage.js";
import { initAboutPage } from "../pages/aboutPage.js";
import { initWordPage } from "../views/randomWordView.js";
import { initRandomWordPage } from "../pages/randomWordPage.js";
import { fetchWordImage } from "../services/imageService.js";

export function initMainLayout() {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  const header = createHeader();
  userInterface.appendChild(header);
  const main = document.createElement("main");
  main.classList.add(MAIN_CONTENT_ID);
  main.id = MAIN_CONTENT_ID;
  userInterface.appendChild(main);
}

export function createHeader(currentPage = "Home") {
  const header = document.createElement("header");
  header.classList.add("header");

  const logo = document.createElement("img");
  logo.src = "/public/images/logo.svg";
  logo.alt = "Logo";
  logo.classList.add(CLASS_LOGO);
  logo.addEventListener("click", () => {
    // update active menu state: remove from all links and set Home as active
    document.querySelectorAll(".menu-link").forEach((link) => {
      link.classList.remove("active");
      if (link.textContent === "Home") {
        link.classList.add("active");
      }
    });
    initHomePage();
  });

  header.appendChild(logo);

  const searchInput = document.createElement("input");
  header.appendChild(searchInput);
  searchInput.placeholder = "Search...";
  searchInput.classList.add("search-input");
  searchInput.name = "search";
  searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const wordInfo = await fetchWordInformation(searchInput.value);

      const imageUrl = await fetchWordImage(wordInfo.word);
      searchInput.value = "";

      initWordPage(wordInfo, imageUrl, true);
    }
  });

  const menuConfig = {
    Home: initHomePage,
    About: initAboutPage,
    "Random word": initRandomWordPage,
  };

  const menu = document.createElement("nav");
  const menuList = document.createElement("ul");
  menuList.classList.add("menu-list");

  Object.entries(menuConfig).forEach(([title, handler]) => {
    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.href = "#";
    link.textContent = title;
    link.classList.add("menu-link");

    // Add active class if this is the current page
    if (title === currentPage) {
      link.classList.add("active");
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      document
        .querySelectorAll(".menu-link")
        .forEach((l) => l.classList.remove("active"));
      // Add active class to clicked link
      link.classList.add("active");
      handler();
    });

    listItem.appendChild(link);
    menuList.appendChild(listItem);
  });

  menu.appendChild(menuList);
  header.appendChild(menu);
  return header;
}

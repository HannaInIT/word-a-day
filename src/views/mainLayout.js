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

export function initMainLayout(currentPage = "Home") {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  const header = createHeader(currentPage);
  userInterface.appendChild(header);
  const main = document.createElement("main");
  main.classList.add(MAIN_CONTENT_ID);
  main.id = MAIN_CONTENT_ID;
  userInterface.appendChild(main);
}

export function createHeader(currentPage) {
  const header = document.createElement("header");
  header.classList.add("header");

  // helper function to clear search input
  const clearSearchInput = () => {
    const searchInput = document.querySelector(".search-input");
    const clearButton = document.querySelector(".search-clear");
    if (searchInput) {
      searchInput.value = "";
    }
    if (clearButton) {
      clearButton.style.display = "none";
    }
  };

  const logo = document.createElement("img");
  logo.src = "/public/images/logo.svg";
  logo.alt = "logo";
  logo.classList.add(CLASS_LOGO);
  logo.addEventListener("click", () => {
    // clear search input
    clearSearchInput();

    // update active menu state: remove from all links and set Home as active
    document.querySelectorAll(".menu-link").forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.page === "Home") {
        link.classList.add("active");
      }
    });

    // clear main content before calling handler
    const main = document.getElementById(MAIN_CONTENT_ID);
    if (main) {
      main.innerHTML = "";
    }
    initHomePage();
  });

  header.appendChild(logo);

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search...";
  searchInput.classList.add("search-input");
  searchInput.name = "search";

  const clearButton = document.createElement("button");
  clearButton.classList.add("search-clear");
  clearButton.setAttribute("type", "button");
  clearButton.setAttribute("aria-label", "Clear search");
  clearButton.style.display = "none";

  clearButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"/></svg>`;

  // event listener
  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      clearButton.style.display = "flex";
    } else {
      clearButton.style.display = "none";
    }
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    clearButton.style.display = "none";
    searchInput.focus();
  });

  // update the search event listener to hide clear button after search
  searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const searchTerm = searchInput.value.trim();

      if (!searchTerm) {
        return; // for empty strings
      }

      try {
        const wordInfo = await fetchWordInformation(searchTerm);

        // here
        if (!wordInfo) {
          showSearchError(
            `Word "${searchTerm}" not found. Please try a different word.`,
          );
          searchInput.focus();
          searchInput.select();
          return;
        }

        const imageUrl = await fetchWordImage(wordInfo.word);
        searchInput.value = "";
        clearButton.style.display = "none";
        initWordPage(wordInfo, imageUrl, true);
      } catch (error) {
        showSearchError(
          "Service temporarily unavailable. Please try again later.",
        );
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  // helper function to show search error notification
  const showSearchError = (message) => {
    // remove existing error if any
    const existingError = header.querySelector(".search-error");
    if (existingError) {
      existingError.remove();
    }

    // create error message element
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("search-error");
    errorDiv.textContent = message;

    // insert after search container
    searchContainer.parentNode.insertBefore(
      errorDiv,
      searchContainer.nextSibling,
    );

    // auto-hide after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  };

  // create search container and append both input and button
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(clearButton);
  header.appendChild(searchContainer);

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
    link.dataset.page = title;

    // add active class if this is the current page
    if (title === currentPage) {
      link.classList.add("active");
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();

      // clear search input
      clearSearchInput();

      // remove active class from all links
      document
        .querySelectorAll(".menu-link")
        .forEach((l) => l.classList.remove("active"));
      // add active class to clicked link
      link.classList.add("active");
      // clear main content and call handler
      const main = document.getElementById(MAIN_CONTENT_ID);
      main.innerHTML = "";
      handler();
    });

    listItem.appendChild(link);
    menuList.appendChild(listItem);
  });

  menu.appendChild(menuList);
  header.appendChild(menu);
  return header;
}

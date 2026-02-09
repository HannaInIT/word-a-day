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

  // logo
  const logo = document.createElement("img");
  logo.src = "/public/images/logo.svg";
  logo.alt = "logo";
  logo.classList.add(CLASS_LOGO);

  // search input
  const searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.name = "search";
  searchInput.placeholder = "Search...";

  // clear button
  const clearButton = document.createElement("button");
  clearButton.classList.add("search-clear");
  clearButton.setAttribute("type", "button");
  clearButton.setAttribute("aria-label", "Clear search");
  clearButton.style.display = "none";

  clearButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"/></svg>`;

  // search button
  const searchButton = document.createElement("button");
  searchButton.classList.add("start-search");
  searchButton.setAttribute("type", "button");
  searchButton.setAttribute("aria-label", "Start search");
  searchButton.style.display = "none";

  searchButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37"/></svg>`;

  // helper function to clear search input
  const clearSearchInput = () => {
    searchInput.value = "";
    clearButton.style.display = "none";
    searchButton.style.display = "none";
  };

  // run search function
  const runSearch = async () => {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
      return; // for empty strings
    }

    try {
      const wordInfo = await fetchWordInformation(searchTerm);

      if (!wordInfo) {
        showSearchError(
          `Word "${searchTerm}" not found. Please try a different word.`,
        );
        searchInput.focus();
        searchInput.select();
        return;
      }

      const imageUrl = await fetchWordImage(wordInfo.word);

      clearSearchInput();
      initWordPage(wordInfo, imageUrl, true);
    } catch (error) {
      showSearchError(
        "Service temporarily unavailable. Please try again later.",
      );
      searchInput.focus();
      searchInput.select();
    }
  };

  // create search container and append both input and button
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(clearButton);
  searchContainer.appendChild(searchButton);

  // append logo and search to header
  header.appendChild(logo);
  header.appendChild(searchContainer);

  // search input events
  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      clearButton.style.display = "flex";
      searchButton.style.display = "flex";
    } else {
      clearButton.style.display = "none";
      searchButton.style.display = "none";
    }
  });

  // search on Enter key
  searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      await runSearch();
    }
  });

  // search button click
  searchButton.addEventListener("click", async () => {
    await runSearch();
  });

  // clear button click
  clearButton.addEventListener("click", () => {
    clearSearchInput();
    searchInput.focus();
  });

  // search error helper to show search error notification
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

  // logo click
  logo.addEventListener("click", () => {
    clearSearchInput();

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

  // menu
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

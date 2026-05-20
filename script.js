const TOTAL_WORKS = 32;
const PAGE_SIZE = 8;
const VOLUMES = ["上册", "下册"];

const works = Array.from({ length: TOTAL_WORKS }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    title: `作品 ${number}`,
    volume: index < TOTAL_WORKS / 2 ? VOLUMES[0] : VOLUMES[1],
    src: `assets/work-${number}.jpg`,
  };
});

const state = {
  page: 0,
  pageSize: PAGE_SIZE,
};

const track = document.querySelector("[data-gallery-track]");
const status = document.querySelector("[data-gallery-status]");
const prevButton = document.querySelector("[data-gallery-prev]");
const nextButton = document.querySelector("[data-gallery-next]");
const volumeTabs = [...document.querySelectorAll("[data-volume]")];
const profileImage = document.querySelector(".portrait-frame img");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function maxPage() {
  return Math.ceil(works.length / state.pageSize) - 1;
}

function createWorkCard(work, index) {
  const card = document.createElement("article");
  card.className = "work-card";

  const media = document.createElement("div");
  media.className = "work-media";

  const image = document.createElement("img");
  image.src = work.src;
  image.alt = `${work.title} 作品图片`;
  image.loading = "lazy";
  image.decoding = "async";

  const placeholder = document.createElement("div");
  placeholder.className = "work-placeholder";

  const placeholderInner = document.createElement("div");
  const placeholderNumber = document.createElement("strong");
  const placeholderPath = document.createElement("span");
  placeholderNumber.textContent = String(index + 1).padStart(2, "0");
  placeholderPath.textContent = work.src;
  placeholderInner.append(placeholderNumber, placeholderPath);
  placeholder.append(placeholderInner);

  const caption = document.createElement("footer");
  caption.className = "work-caption";

  const volume = document.createElement("span");
  const title = document.createElement("span");
  volume.textContent = work.volume;
  title.textContent = work.title;
  caption.append(volume, title);

  image.addEventListener("error", () => {
    image.remove();
    media.append(placeholder);
  });

  image.addEventListener("load", () => {
    placeholder.remove();
  });

  media.append(image);
  card.append(media, caption);
  return card;
}

function renderGallery() {
  const start = state.page * state.pageSize;
  const visibleWorks = works.slice(start, start + state.pageSize);
  track.replaceChildren(...visibleWorks.map((work, offset) => createWorkCard(work, start + offset)));
  status.textContent = `${state.page + 1} / ${maxPage() + 1}`;
  status.setAttribute("aria-label", `第 ${state.page + 1} 组，共 ${maxPage() + 1} 组`);

  volumeTabs.forEach((tab) => {
    const targetVolume = Number(tab.dataset.volume);
    const activeVolume = Math.floor(state.page / 2);
    tab.classList.toggle("active", targetVolume === activeVolume);
    tab.setAttribute("aria-pressed", String(targetVolume === activeVolume));
  });
}

function moveGallery(direction) {
  const nextPage = state.page + direction;
  if (nextPage < 0) {
    state.page = maxPage();
  } else if (nextPage > maxPage()) {
    state.page = 0;
  } else {
    state.page = nextPage;
  }
  renderGallery();
}

profileImage?.addEventListener("error", () => {
  profileImage.classList.add("is-missing");
});

function updateActiveNav() {
  if (!sections.length) {
    return;
  }

  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 120) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initGallery() {
  prevButton.addEventListener("click", () => moveGallery(-1));
  nextButton.addEventListener("click", () => moveGallery(1));

  volumeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPage = Number(tab.dataset.volume) * 2;
      state.page = Math.min(targetPage, maxPage());
      renderGallery();
    });
  });

  renderGallery();
}

if (track && status && prevButton && nextButton) {
  initGallery();
}

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });

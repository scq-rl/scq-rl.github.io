const project = {
  authors: [
    {
      name: "Xiefeng Wu",
      affiliation: "School of Computer Science, Wuhan University",
      email: "wuxiefeng@whu.edu.cn",
    },
    {
      name: "Shu Zhang",
      affiliation: "School of Electronic Information, Wuhan University",
      email: "00033521@whu.edu.cn",
    },
    {
      name: "Zhaojie Chu",
      affiliation: "School of Internet, Anhui University",
      email: "zjchu_china@163.com",
    },
    {
      name: "Mingyu Hu",
      affiliation: "School of Electronic Information, Wuhan University",
      email: "mingyuhu@whu.edu.cn",
    },
  ],
  publicationNote: "Research project · 2026",
  paperUrl: "",
  appendixUrl: "",
  codeUrl: "https://github.com/scq-rl",
};

const authorsElement = document.querySelector("#authors");
authorsElement.innerHTML = project.authors
  .map(
    ({ name, affiliation, email }) =>
      `<span><strong>${name}</strong><small>${affiliation}</small><a href="mailto:${email}">${email}</a></span>`,
  )
  .join("");

document.querySelector("#publication-note").textContent = project.publicationNote;
document.querySelector("#year").textContent = new Date().getFullYear();

function configureResource(linkSelector, cardSelector, url) {
  if (!url) return;

  const card = document.querySelector(cardSelector);
  if (linkSelector) {
    document.querySelector(linkSelector).href = url;
  }
  card.href = url;
  card.removeAttribute("aria-disabled");
  card.classList.remove("resource-card-disabled");
  card.querySelector(".resource-status").textContent = "OPEN ↗";
}

document.querySelector("#code-link").href = project.codeUrl;
document.querySelector("#code-card").href = project.codeUrl;
configureResource("#paper-link", "#paper-card", project.paperUrl);
configureResource(null, "#appendix-card", project.appendixUrl);

document.querySelector("#copy-citation").addEventListener("click", async (event) => {
  const citation = document.querySelector("#citation-text").textContent;
  await navigator.clipboard.writeText(citation);
  event.currentTarget.textContent = "Copied";
  window.setTimeout(() => {
    event.currentTarget.textContent = "Copy BibTeX";
  }, 1600);
});

const interactiveVideos = document.querySelectorAll(".hero-clip video, .clip-grid video");

interactiveVideos.forEach((video) => {
  const sourcePath = video.querySelector("source").getAttribute("src");
  video.poster = sourcePath
    .replace("assets/videos/", "assets/posters/")
    .replace(/\.mp4$/, ".jpg");

  const shell = document.createElement("div");
  shell.className = "video-shell";
  video.parentNode.insertBefore(shell, video);
  shell.append(video);
});

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        entry.target.pause();
      }
    });
  },
  { threshold: 0.2 },
);

interactiveVideos.forEach((video) => videoObserver.observe(video));

document.querySelectorAll(".clip-grid").forEach((clipGrid) => {
  let startClientX = 0;
  let startScrollLeft = 0;
  let isDragging = false;

  clipGrid.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target !== clipGrid) return;

    startClientX = event.clientX;
    startScrollLeft = clipGrid.scrollLeft;
    isDragging = false;
    clipGrid.setPointerCapture(event.pointerId);
    clipGrid.classList.add("is-dragging");
  });

  clipGrid.addEventListener("pointermove", (event) => {
    if (!clipGrid.hasPointerCapture(event.pointerId)) return;

    const distance = event.clientX - startClientX;
    if (Math.abs(distance) > 4) {
      isDragging = true;
      clipGrid.scrollLeft = startScrollLeft - distance;
      event.preventDefault();
    }
  });

  function finishDrag(event) {
    if (!clipGrid.hasPointerCapture(event.pointerId)) return;

    clipGrid.releasePointerCapture(event.pointerId);
    clipGrid.classList.remove("is-dragging");
    if (isDragging) {
      clipGrid.dataset.suppressVideoClick = "true";
      window.setTimeout(() => delete clipGrid.dataset.suppressVideoClick, 0);
    }
  }

  clipGrid.addEventListener("pointerup", finishDrag);
  clipGrid.addEventListener("pointercancel", finishDrag);

  clipGrid.addEventListener(
    "click",
    (event) => {
      if (clipGrid.dataset.suppressVideoClick) {
        event.preventDefault();
        event.stopPropagation();
        delete clipGrid.dataset.suppressVideoClick;
      }
    },
    true,
  );
});

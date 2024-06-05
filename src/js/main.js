const nav = document.querySelector("nav");
const navBtn = document.querySelector("#nav_btn");
const themeBtn = document.querySelector("#theme_btn");
const navLinks = document.querySelectorAll("#nav_links li");
const navLinkContainer = document.querySelector("#nav_links");
const idleBgFX = document.querySelectorAll("#idle_bg_FX div");
const allDFX = document.querySelectorAll(".drag-fx");
const allIDFX = document.querySelectorAll(".drag-inv-fx");
const hero = document.querySelector("#hero");
const aboutMe = `A web/mobile developer with ${new Date().getFullYear() - 2021
  }+ years experience who's driven by an insatiable hunger for experience and knowledge. My ultimate ambition is to evolve into a proficient full-stack developer.`;
const aboutMeP = document.querySelector("#about_me_text");
const tiltingFXWrapper = document.querySelectorAll(".tilting-wrapper");
const tilt_strength = 0.07;
const allClickCopy = document.querySelectorAll(".click-copy");
const allSections = document.querySelectorAll("section");
const allAos = document.querySelectorAll("[data-aos]");
const intro = document.querySelector("#intro");
const introLogo = document.querySelector("#intro img");

let localTheme = localStorage.getItem("theme");

if (localTheme) {
  themeBtn.dataset.theme = localTheme;
  document.body.dataset.theme = localTheme;
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  localTheme = "dark";
  themeBtn.dataset.theme = localTheme;
  document.body.dataset.theme = localTheme;
  localStorage.setItem("theme", localTheme);
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
  const newTheme = event.matches ? "dark" : "light";
  themeBtn.dataset.theme = newTheme;
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
});

let onScreenSection = 0;

/**
 * lenis library
 */
const lenis = new Lenis();

lenis.on("scroll", e => {
  const { animatedScroll } = e;
  const scaleValue = Math.max(0.9, 1 - animatedScroll * 0.0001);
  hero.style.transform = `scale3d(${scaleValue},${scaleValue},${scaleValue})`;
  hero.style.filter = `blur(${Math.min(10, animatedScroll * 0.01)}px)`;
  hero.style.opacity = Math.max(0.6, 1 - animatedScroll * 0.001);

  aboutMeP.querySelectorAll("span").forEach(s => {
    let { top, left } = s.getBoundingClientRect();
    top = top - window.innerHeight * 0.75;
    let opacityVal = top * 0.01 + left * 0.001 < 0 ? 1 : 0.2;
    let blurVal = top * 0.01 + left * 0.001 < 0 ? 0 : 2;
    s.style.opacity = opacityVal;
    s.style.filter = `blur(${blurVal}px)`;
  });
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
/**
 *
 */

idleBgFX.forEach(d => (d.style.animationDelay = `-${Math.round(Math.random() * 10)}s`));

navBtn.addEventListener("click", openNav);

function openNav() {
  if (nav.dataset.open === "false") {
    nav.dataset.open = "true";
    navLinks.forEach((l, i) => (l.style.transitionDelay = `${i * 0.09 + 0.1}s`));
    navLinks[navLinks.length - 1].addEventListener(
      "transitionend",
      () => {
        if (nav.dataset.open === "true") navLinkContainer.style.setProperty("--ele-opacity", 1);
      },
      { once: true }
    );
  } else {
    nav.dataset.open = "false";
    navLinks.forEach((l, i) => (l.style.transitionDelay = `${i * 0.09}s`));
    navLinkContainer.style.setProperty("--ele-opacity", 0);
  }
}

themeBtn.addEventListener("click", function () {
  const theme = this.dataset.theme === "light" ? "dark" : "light";
  this.dataset.theme = theme;
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
});

function setNavLinksHoverFX(x, y, width, height) {
  navLinkContainer.style.setProperty("--ele-pos-x", `${x}px`);
  navLinkContainer.style.setProperty("--ele-pos-y", `${y}px`);
  navLinkContainer.style.setProperty("--ele-width", `${width}px`);
  navLinkContainer.style.setProperty("--ele-height", `${height}px`);
}

setNavLinksHoverFX(navLinks[onScreenSection].offsetLeft, navLinks[onScreenSection].offsetTop, navLinks[onScreenSection].scrollWidth, navLinks[onScreenSection].scrollHeight);

navLinks.forEach((l, i) => {
  l.addEventListener("click", function (e) {
    lenis.scrollTo(`#${this.dataset.section}`, { offset: -100 });
    onScreenSection = i;
    openNav();
  });
});

window.addEventListener("scroll", function (e) {
  allSections.forEach((as, i) => {
    const { y, height } = as.getBoundingClientRect();
    const middleScreen = document.documentElement.clientHeight / 2;
    if (middleScreen > y && middleScreen < y + height) {
      onScreenSection = i;
      setNavLinksHoverFX(navLinks[onScreenSection].offsetLeft, navLinks[onScreenSection].offsetTop, navLinks[onScreenSection].scrollWidth, navLinks[onScreenSection].scrollHeight);
    }
  });

  allAos.forEach(aos => {
    const { y } = aos.getBoundingClientRect();
    const showPoint = document.documentElement.clientHeight - 150;
    if (showPoint > y && !aos.classList.toString().includes("aos")) {
      switch (aos.dataset.aos) {
        case "fade-in":
          aos.classList.add("aos-fade-in");
          break;
        case "slide-in-left":
          aos.classList.add("aos-slide-in-left");
          break;
      }
    }
  });
});

document.addEventListener("mousemove", function (e) {
  const move_x = window.innerWidth / 2 - e.clientX;
  const move_y = window.innerHeight / 2 - e.clientY;
  allDFX.forEach(a => {
    a.style.transform = `translate3d(${-(move_x * 0.02)}px, ${-(move_y * 0.05)}px, 0)`;
  });
  allIDFX.forEach(a => {
    a.style.transform = `translate3d(${move_x * 0.02}px, ${move_y * 0.05}px, 0)`;
  });
});

aboutMeP.innerHTML = aboutMe
  .split(" ")
  .map(w => `<span style="opacity: 0.2">${w}</span>`)
  .join(" ");

if (!window.matchMedia("(any-hover: none)").matches) {
  tiltingFXWrapper.forEach(t => {
    t.addEventListener("mousemove", function (e) {
      const selfProps = this.getBoundingClientRect();
      const mouseX = e.clientX - selfProps.x;
      const mouseY = e.clientY - selfProps.y;
      const halfX = this.scrollWidth / 2;
      const halfY = this.scrollHeight / 2;

      const tiltBody = this.querySelector(".tilting-body");
      tiltBody.style.transform = `perspective(800px) rotateY(${(halfX - mouseX) * -tilt_strength}deg) rotateX(${(halfY - mouseY) * tilt_strength}deg)`;
      tiltBody.style.transitionDuration = "0.1s";

      const topLayer = this.querySelector(".top-layer");
      topLayer.style.transform = `translate3d(${(mouseX / this.scrollWidth - 0.5) * 4}%, 0, 0) translate3d(0, ${(mouseY / this.scrollHeight - 0.5) * 4}%, 0)`;
      topLayer.style.transitionDuration = "0.1s";
    });

    t.addEventListener("mouseleave", function (e) {
      this.querySelector(".tilting-body").removeAttribute("style");
      this.querySelector(".top-layer").removeAttribute("style");
    });
  });
}

allClickCopy.forEach(acc => {
  acc.addEventListener("click", function (e) {
    const contents = this.querySelector("span");
    navigator.clipboard.writeText(contents.textContent);
    this.querySelector("button").innerHTML = "Copied!";

    setTimeout(() => {
      this.querySelector("button").innerHTML = "Copy";
    }, 3000);
  });
});

function runIntro() {
  introLogo.style.animation = "ani-slide-up 1.5s var(--ease-out-quart, ease) 0.5s forwards";
  const bgDiv = intro.querySelector("div:first-child");
  bgDiv.style.animation = "ani-slide-down 1.2s var(--ease-out-quart, ease) 2s forwards";

  setTimeout(() => {
    intro.style.display = "none";
  }, 3200);
}

if (introLogo.complete || introLogo.naturalWidth) {
  runIntro()
} else {
  introLogo.addEventListener("load", runIntro)
}
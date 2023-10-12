const nav = document.querySelector("nav");
const navBtn = document.querySelector("#nav_btn");
const themeBtn = document.querySelector("#theme_btn");
const navLinks = document.querySelectorAll("#nav_links li");
const navLinkContainer = document.querySelector("#nav_links");
const idleBgFX = document.querySelectorAll("#idle_bg_FX div");

idleBgFX.forEach(d => d.style.animationDelay = `-${Math.round(Math.random() * 10)}s`);

navBtn.addEventListener("click", function () {
    if (nav.dataset.open === "false") {
        nav.dataset.open = "true";
        navLinks.forEach((l, i) => l.style.transitionDelay = `${i * 0.09 + 0.1}s`)
    } else {
        nav.dataset.open = "false";
        navLinks.forEach((l, i) => l.style.transitionDelay = `${i * 0.09}s`)
    }
})

themeBtn.addEventListener("click", function () {
    this.dataset.theme = this.dataset.theme === "light" ? "dark" : "light"
})

function setNavLinksHoverFX(x, y, width, height) {
    navLinkContainer.style.setProperty("--ele-pos-x", `${x}px`);
    navLinkContainer.style.setProperty("--ele-pos-y", `${y}px`);
    navLinkContainer.style.setProperty("--ele-width", `${width}px`);
    navLinkContainer.style.setProperty("--ele-height", `${height}px`);
}

setNavLinksHoverFX(navLinks[0].offsetLeft, navLinks[0].offsetTop, navLinks[0].scrollWidth, navLinks[0].scrollHeight);

navLinks.forEach(l => {
    l.addEventListener("pointerenter", function () {
        setNavLinksHoverFX(this.offsetLeft, this.offsetTop, this.scrollWidth, this.scrollHeight);
        navLinkContainer.style.setProperty("--ele-opacity", 1);
    })

    l.addEventListener("pointerleave", function () {
        navLinkContainer.style.setProperty("--ele-opacity", 0);
    })
})


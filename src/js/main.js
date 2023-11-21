const nav = document.querySelector("nav");
const navBtn = document.querySelector("#nav_btn");
const themeBtn = document.querySelector("#theme_btn");
const navLinks = document.querySelectorAll("#nav_links li");
const navLinkContainer = document.querySelector("#nav_links");
const idleBgFX = document.querySelectorAll("#idle_bg_FX div");
const allDFX = document.querySelectorAll(".drag-fx");
const allIDFX = document.querySelectorAll(".drag-inv-fx");
const hero = document.querySelector("#hero");
const aboutMe = `A web/mobile developer with ${new Date().getFullYear() - 2021}+ years experience who's driven by an insatiable hunger for experience and knowledge. My ultimate ambition is to evolve into a proficient full-stack developer.`;
const aboutMeP = document.querySelector("#about_me_text");
const tiltingFXWrapper = document.querySelectorAll(".tilting-wrapper");
const tilt_strength = 0.05;
const allClickCopy = document.querySelectorAll(".click-copy");
const allSections = document.querySelectorAll("section");

let onScreenSection = 0;

/**
 * lenis library
 */
const lenis = new Lenis();

lenis.on('scroll', (e) => {
    const { animatedScroll } = e;
    hero.style.transform = `scale(${Math.max(0.9, 1 - (animatedScroll * 0.0001))})`;
    hero.style.filter = `blur(${Math.min(10, animatedScroll * 0.01)}px)`;
    hero.style.opacity = Math.max(0.6, 1 - (animatedScroll * 0.001));

    aboutMeP.querySelectorAll("span").forEach(s => {
        let { top, left } = s.getBoundingClientRect();
        top = top - (window.innerHeight * 0.75);
        let opacityVal = (top * 0.01) + (left * 0.001) < 0 ? 1 : 0.2;
        s.style.opacity = opacityVal;
    })
})

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
/**
 * 
 */

idleBgFX.forEach(d => d.style.animationDelay = `-${Math.round(Math.random() * 10)}s`);

navBtn.addEventListener("click", function () {
    if (nav.dataset.open === "false") {
        nav.dataset.open = "true";
        navLinks.forEach((l, i) => l.style.transitionDelay = `${i * 0.09 + 0.1}s`);
        navLinks[navLinks.length - 1].addEventListener("transitionend", () => navLinkContainer.style.setProperty("--ele-opacity", 1), { once: true });
    } else {
        nav.dataset.open = "false";
        navLinks.forEach((l, i) => l.style.transitionDelay = `${i * 0.09}s`);
        navLinkContainer.style.setProperty("--ele-opacity", 0)
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

navLinks.forEach((l, i) => {
    l.addEventListener("click", function (e) {
        lenis.scrollTo(`#${this.dataset.section}`, { offset: -100 });
        onScreenSection = i;
    })
});

window.addEventListener("scroll", function (e) {
    allSections.forEach((as, i) => {
        const middleScreen = this.scrollY + document.documentElement.clientHeight / 2;
        if (middleScreen > as.offsetTop && middleScreen < as.offsetTop + as.scrollHeight) {
            onScreenSection = i;
            setNavLinksHoverFX(
                navLinks[onScreenSection].offsetLeft,
                navLinks[onScreenSection].offsetTop,
                navLinks[onScreenSection].scrollWidth,
                navLinks[onScreenSection].scrollHeight
            );
        }
    })
})

document.addEventListener("mousemove", function (e) {
    const move_x = window.innerWidth / 2 - e.clientX;
    const move_y = window.innerHeight / 2 - e.clientY;
    allDFX.forEach(a => {
        a.style.transform = `translate(${-(move_x * 0.02)}px, ${-(move_y * 0.05)}px)`;
    })
    allIDFX.forEach(a => {
        a.style.transform = `translate(${move_x * 0.02}px, ${move_y * 0.05}px)`;
    })
});

aboutMeP.innerHTML = aboutMe.split(" ").map(w => `<span style="opacity: 0.2">${w}</span>`).join(" ");

tiltingFXWrapper.forEach(t => {
    t.addEventListener("mousemove", function (e) {
        const selfProps = this.getBoundingClientRect();
        const mouseX = e.clientX - selfProps.x;
        const mouseY = e.clientY - selfProps.y;
        const halfX = this.scrollWidth / 2;
        const halfY = this.scrollHeight / 2;

        const tiltBody = this.querySelector(".tilting-body");
        tiltBody.style.transform = ` perspective(800px) rotateY(${(halfX - mouseX) * -tilt_strength}deg) rotateX(${(halfY - mouseY) * tilt_strength}deg)`;
        tiltBody.style.transitionDuration = "0.1s";

        const topLayer = this.querySelector(".top-layer");
        topLayer.style.transform = `translateX(${((mouseX / this.scrollWidth) - 0.5) * 4}%) translateY(${((mouseY / this.scrollHeight) - 0.5) * 4}%)`;
        topLayer.style.transitionDuration = "0.1s";
    });

    t.addEventListener("mouseleave", function (e) {
        this.querySelector(".tilting-body").removeAttribute("style");
        this.querySelector(".top-layer").removeAttribute("style");
    })
})

allClickCopy.forEach(acc => {
    acc.addEventListener("click", function (e) {
        const contents = this.querySelector("span");
        navigator.clipboard.writeText(contents.textContent);
        this.querySelector("button").innerHTML = "Copied!";

        setTimeout(() => {
            this.querySelector("button").innerHTML = "Copy";
        }, 3000)
    })
})
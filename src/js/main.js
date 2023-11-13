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
});

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
        console.log(e);
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

/**
 * lenis library
 */
const lenis = new Lenis()

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
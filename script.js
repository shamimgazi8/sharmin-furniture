//selecting Documents---
const btn_explore = document.querySelector(".explore");
const nav = document.querySelector(".nav");
const header = document.querySelector(".background");
const section1 = document.querySelector(".section-1");
const nav_link = document.querySelector(".nav_links");
const allSection = document.querySelectorAll(".section");
const navheight = nav.getBoundingClientRect().height;
const allButtons = document.querySelectorAll(".button");
const containerbtn = document.querySelector(".buttons");
const tabInfo = document.querySelectorAll(".tab");
const slider = document.querySelectorAll(".slide");
const sliders = document.querySelector(".slides");
const btn_left = document.querySelector(".slider__btn--left");
const btn_right = document.querySelector(".slider__btn--right");

//sticky navigation bar --
//using intersection API--
const callback = function (entries, observe) {
  const [entry] = entries;
  if (entry.isIntersecting == true) {
    nav.classList.remove("sticky");
  } else {
    nav.classList.add("sticky");
  }
};
const obeserver = new IntersectionObserver(callback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});
obeserver.observe(header);

//implementing nav link to body--

nav.addEventListener("click", function (e) {
  const attribute = e.target.getAttribute("href");
  const elemet = document.querySelector(`.${attribute}`);
  elemet.scrollIntoView({ behavior: "smooth" });
});

//button Explore more implementing--

btn_explore.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

//revaling items--For smooth transaction!

allSection.forEach((section) => {
  section.classList.add("section_hide");
});

const rev_observe = function (entries, observe) {
  const [entry] = entries;
  if (entry.isIntersecting == true) {
    entry.target.classList.remove("section_hide");
  } else {
    return;
  }
  observe.unobserve(entry.target);
};
const rev_observer = new IntersectionObserver(rev_observe, {
  root: null,
  threshold: 0.2,
});
allSection.forEach((section) => {
  rev_observer.observe(section);
});

//oparetion TAB ---- Changing details by clicking!
let active;
containerbtn.addEventListener("click", function (e) {
  if (e.target.classList.contains("button")) {
    tabInfo.forEach((tb) => {
      tb.classList.remove("tab-active");
    });
    allButtons.forEach((bt) => {
      bt.classList.remove("button_active");
    });
    if (!e.target.classList.contains("button_active"))
      e.target.classList.add("button_active");
    active = e.target.getAttribute("data-serial");
    document.querySelector(`#${active}`).classList.add("tab-active");
  }
});

//IMG slider implementing ----
//--------------right btn------------------
slider.forEach((slide, i) => {
  slide.style.transform = `translateX(${i * 100}%)`;
});
let counter = 0;
btn_right.addEventListener("click", function () {
  counter++;
  if (counter >= slider.length) {
    counter = 0;
  }
  slider.forEach((slid, i) => {
    slid.style.transform = `translateX(${(i - counter) * 100}%)`;
    slid.style.transition = `${1}s`;
  });
});
//------------left btn---------------
btn_left.addEventListener("click", function () {
  counter--;
  if (counter < 0) {
    counter = slider.length - 1;
  }
  slider.forEach((slid, i) => {
    slid.style.transform = `translateX(${(i - counter) * 100}%)`;
    slid.style.transition = `${1}s`;
  });
});

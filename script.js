const modal = document.querySelector(".modal-box");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const nav = document.querySelector(".nav");

// Open modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("overlay");
  console.log(openModal);
};

// Close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Initaiate btn press to open
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// Close modal
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Close modal by clicking surrounding area
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// slider function
// Want to put this into a function so dont pollute global namespace
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length; // length of nodelist^^ read just like an array

  // Functions
  // create dots - order in dif functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      // want to loop over because want to edit each one
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  // const slider = document.querySelector(".slider");
  // 1st slide 0%, 2nd will start at 100%, 200%, 300%
  // can create a function where we pass in slide and refactor code - number of slide where want to go to - change curclisde to index'd slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  // goToSlide(0); // call function at begin slide set to 0 - once app starts will immedaitely go to slide 0, i - 0 = i;

  // btn next slide - just change percentage of transform position
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      // make 0 based with -1
      // this is how loop back to 0% starting slide
      curSlide = 0;
    } else {
      curSlide++; // increase by 1
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--; // curslide will be decreased going previous slide
    }
    goToSlide(curSlide); // moving to a slide is the same so can reuse function
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0); // Initalise btn colour
  };
  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide(); // works same way due to shortcurcuiting
  });

  // event delegation attach to parent element
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      // go to slide selected
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider(); // create big function better practise

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target; // creating a variable which contains el working with
    const siblings = link.closest(".nav").querySelectorAll(".nav__link"); // need to select other el can go to parent and select
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
// Passing an 'argument' into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation - use scroll event
// const obsCallback = function (entries, observer) {
// entries.forEach((entry) => {
// console.log(entries);
// });
// };
//
// const obsOptions = {
// root: null,
// threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(about);

// Sticky Nav
const header = document.querySelector(".intro");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // same as entires[0]

  if (!entry.isIntersecting) nav.classList.add("sticky", "txt-change");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(intro);

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// selected section nav link

function activateNav(el) {
  const selected = document.getElementsByTagName("a");
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove("active");
  }
  el.classList.add("active");
}

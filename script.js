const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnsCloseModal = document.querySelector(".btn--close-modal");

// Open modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("overlay");
};

// Close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Initaiate btn press to open
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// Close modal
btnsCloseModal.addEventListener("click", closeModal);
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
    console.log(e);
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

// dont want 1st slide 0%, 2nd will start at 100%, 200%, 300%
// want first slide to be -100%, then 0%, 100%, 200% - how? Take current index and subtract the current slide
// curSlide = 1: first iteration will be 0 - so 0 - 100  * 100 = -100
// then next iteration 1 - 1 = 0%
// need to tell JS to stop - need to define no. of slides and then make it stop once reached last one
//////////////////////////////////////////////////////
// const slider = function () {
// const slides = document.querySelectorAll(".slide");
// const btnLeft = document.querySelector(".slider__btn--left");
// const btnRight = document.querySelector(".slider__btn--right");
// const dotContainer = document.querySelector(".dots");
//
// let curSlide = 0;
// const maxSlide = slides.length;
//
// Functions;
// const createDots = function () {
// slides.forEach(function (_, i) {
// dotContainer.insertAdjacentHTML(
// "beforeend",
// `<button class="dots__dot" data-slide="${i}"></button>`
// );
// });
// };
//
// const activateDot = function (slide) {
// document
// .querySelectorAll(".dots__dot")
// .forEach((dot) => dot.classList.remove("dots__dot--active"));
//
// document
// .querySelector(`.dots__dot[data-slide="${slide}"]`)
// .classList.add("dots__dot--active");
// };
//
// const goToSlide = function (slide) {
// slides.forEach(
// (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
// );
// };
//
// Next slide
// const nextSlide = function () {
// if (curSlide === maxSlide - 1) {
// curSlide = 0;
// } else {
// curSlide++;
// }
//
// goToSlide(curSlide);
// activateDot(curSlide);
// };
//
// const prevSlide = function () {
// if (curSlide === 0) {
// curSlide = maxSlide - 1;
// } else {
// curSlide--;
// }
// goToSlide(curSlide);
// activateDot(curSlide);
// };
//
// const init = function () {
// goToSlide(0);
// createDots();
//
// activateDot(0);
// };
// init();
//
//Event handlers
// btnRight.addEventListener("click", nextSlide);
// btnLeft.addEventListener("click", prevSlide);
//
// document.addEventListener("keydown", function (e) {
// if (e.key === "ArrowLeft") prevSlide();
// e.key === "ArrowRight" && nextSlide();
// });
//
// dotContainer.addEventListener("click", function (e) {
// if (e.target.classList.contains("dots__dot")) {
// const { slide } = e.target.dataset;
// goToSlide(slide);
// activateDot(slide);
// }
// });
// };
// slider();
//
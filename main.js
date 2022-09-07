let c = console.log.bind(document);

let header = document.querySelector("header");
let openControls = document.querySelector(".open-controls");
let upBtn = document.querySelector("#up-btn");
let colors = document.querySelectorAll(".more-controls .colors > span");
let controlsContainer = document.querySelector(".controls-container");
let closeBtn = document.querySelector(".controls-container .close-btn");
let speedInput = document.querySelector(".controls-container input[name=speed]");
let hamburgerIcon = document.querySelector("header nav .hamburger-icon");
let navs = document.querySelectorAll("header .navs > li > a");

hamburgerIcon.addEventListener("click", () => {
  header.classList.toggle("active");
})

navs.forEach(nav => {
  nav.addEventListener("click", () => {
    header.classList.toggle("active");
  })
})

openControls.addEventListener("click", () => {
  openCont();
})
closeBtn.addEventListener("click", () => {
  openCont();
})

function openCont() {
  controlsContainer.classList.toggle("active");
}
speedInput.addEventListener("input", (e) => {
  if (speedInput.value > 10) {
    speedInput.value = 10
  } else if (speedInput.value <= 0.2) {
    speedInput.value = 0.2;
  }
  document.querySelector(".controls-container.active .open-controls > svg").style.cssText = `animation-duration: ${speedInput.value}s`;
})

// Buttons
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    openCont();
  }
})


// change theme color
colors.forEach((el) => {
  if (localStorage.activeElement) {
    if (el.dataset.hex === localStorage.activeElement) {
      el.classList.add("active");
    }
  }
  el.style.backgroundColor = el.dataset.hex;
  el.addEventListener("click", () => {
    colors.forEach((e) => {
      e.classList.remove("active");
    })
    el.classList.add("active");
    document.body.style.cssText = `--mainClr: ${el.dataset.hex};--secClr: ${el.dataset.sec}`;
    localStorage.setItem("mainClr", el.dataset.hex);
    localStorage.setItem("secClr", el.dataset.sec);
    localStorage.setItem("activeElement", el.dataset.hex);
  });
})

if (localStorage.mainClr && localStorage.secClr) {
  document.body.style.cssText = `--mainClr: ${localStorage.mainClr};--secClr: ${localStorage.secClr};`;
}

// go up button
function upFunc() {
  if (scrollY > 250) {
    upBtn.style.cssText = `opacity: 1;z-index: 5`;
  } else {
    upBtn.style.cssText = `opacity: 0;`;
    setTimeout(() => {
      upBtn.style.cssText = `z-index: -1`;
    }, 1000);
  }
}
upFunc();

window.addEventListener("scroll", () => {
  upFunc();
})

upBtn.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
})

// show / hide social icons
function social() {
  let social = document.getElementById("social-btn");
  let socialSection = document.querySelector(".social-icons");
  if (social.checked) {
    socialSection.style.display = `none`;
  } else {
    socialSection.style.display = `flex`;
  }
}

// type writer effect 
// let j = 0;
function typeWriter() {
  let txt = "Hello World, this is type writer effect (Using Vanilla JS), All Done By Me    ";
  let type = document.querySelector(".type-writer");
  let i = 0;
  let int = setInterval(() => {
    type.textContent += txt[i];
    i++;
    if (type.textContent.length > txt.length - 1) {
      clearInterval(int);
      let interval = setInterval(() => {
        type.textContent = txt.slice(0, --i);
        if (type.textContent.length < 22) {
          clearInterval(interval);
          // If U want to add more
          let j = 0;
          let txt2 = " Cool, isn't it?";
          let interval3 = setInterval(() => {
            type.textContent += txt2[j];
            j++;
            if (type.textContent.length === 37) {
              clearInterval(interval3);
            }
          }, 100);
        }
      }, 100);
    }
  }, 100);
}
typeWriter();


// End Type Writer

// Start Nums
let progressNumbersSection = document.querySelector("main #portfolio .nums");
let progressNumbers = document.querySelectorAll("main #portfolio .nums > section > h3");
let started = false;

window.addEventListener("scroll", () => {
  if (progressNumbersSection.getBoundingClientRect().top < screen.height - 300) {
    if (!started) {
      progressNumbers.forEach((num) => startCount(num));
    }
    started = true;
  }
  // Cards
  let cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.dataset.widthReached = false; // works
    if (matchMedia("(min-width: 1024px)").matches) {
      if (card.getBoundingClientRect().top < screen.height + 550) {
        card.style.cssText = `transform: translate(0, 0) !important;`;
      }
    }
    if (card.getBoundingClientRect().top < screen.height - 300) {
      card.style.cssText = `transform: translate(0, 0) !important;`;
    }
  })
})

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent === goal) {
      clearInterval(count);
    }
  }, 10 / goal);
}

// End Nums

// Start Count Down
let countDownDate = new Date("Dec 31, 2022 23:59:59").getTime(); // end of the year
let counter = setInterval(() => {
  let dateNow = new Date().getTime();
  let dateDiff = countDownDate - dateNow;
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / (1000));

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML = seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff <= 0) {
    clearInterval(counter)
    document.querySelector(".days").innerHTML = `00`;
    document.querySelector(".hours").innerHTML = `00`;
    document.querySelector(".minutes").innerHTML = `00`;
    document.querySelector(".seconds").innerHTML = `00`;
  }
}, 1000);


// Full Screen Mode API
let body = document.documentElement;
let fullScreenButton = document.querySelector("#full-screen-btn");
fullScreenButton.addEventListener("click", fullScreen);
let fullScreenEnabled = false;
function fullScreen() {
  if (!fullScreenEnabled) {
    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.webkitRequestFullscreen) {
      body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) {
      body.msRequestFullscreen();
    }
    fullScreenEnabled = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    fullScreenEnabled = false;
  }
}

// Carousel
// img & container width in pixel
slideWidth = document.querySelector("main #carousel .carousel-container img").offsetWidth; // index

// Indicators Container
let indicatorsContainer = document.querySelector("main #carousel .indicators");

// Slides Container
let container = document.querySelector("main #carousel .carousel-container");

// Slides
let slides = document.querySelectorAll("main #carousel .carousel-container > *");
slides = Array.from(slides);

// Add Buttons
let i = 0;
slides.forEach(el => {
  let btn = document.createElement("button");
  btn.setAttribute("data-slide", i);
  // btn.id = `btn${i}`;
  indicatorsContainer.appendChild(btn);
  i++;
})

// Buttons
let buttons = document.querySelectorAll("main #carousel .indicators > *");
buttons = Array.from(buttons);

// Arrows
let slideRightArrow = document.querySelector("main #carousel .arrows .right");
let slideLeftArrow = document.querySelector("main #carousel .arrows .left");

buttons.forEach((el) => {
  el.addEventListener("click", (e) => {
    // move slide
    container.style.marginLeft = parseInt(e.target.dataset.slide) * -slideWidth + "px";
    // Remove And Add active class
    removeAndAddActive();
  })
})

removeAndAddActive();
function removeAndAddActive() {
  buttons.forEach((bu) => {
    bu.classList.remove("active");
  })
  buttons.forEach(bu => {
    if (container.style.marginLeft === parseInt(bu.dataset.slide) * -slideWidth + "px") {
      bu.classList.add("active");
    } else if (container.style.marginLeft === "") {
      buttons.at(0).classList.add("active");
    }
  })
}

slideRightArrow.addEventListener("click", () => {
  if (container.style.marginLeft === parseInt(buttons.at(-1).dataset.slide) * -slideWidth + "px") {
    container.style.marginLeft = "0px";
  } else {
    if (container.style.marginLeft === "") {
      container.style.marginLeft = -slideWidth + "px";
    } else {
      container.style.marginLeft = (parseInt(container.style.marginLeft.slice(0, -2)) - slideWidth) + "px";
    }
  }
  removeAndAddActive();
})

// Loop
let slideRight = "";
function autoSlide() {
  if (document.querySelector("#auto-slide").checked) {
    slideRight = setInterval(() => {
      slideRightArrow.click();
    }, 3500);
  } else {
    clearInterval(slideRight);
  }
}
document.querySelector("#auto-slide").addEventListener("change", autoSlide);


slideLeftArrow.addEventListener("click", () => {
  if (container.style.marginLeft === "" || container.style.marginLeft === "0px") {
    container.style.marginLeft = parseInt(buttons.at(-1).dataset.slide) * -slideWidth + "px";
  } else {
    container.style.marginLeft = (parseInt(container.style.marginLeft.slice(0, -2)) + slideWidth) + "px"
  }
  removeAndAddActive();
})

// End Carousel

// Skills
let skills = document.querySelectorAll("main #skills .cards .skill span");
skills.forEach(skill => {
  let skillWidth = skill.style.width.slice(0, -1);
  let color = "#000";
  if (skillWidth >= 95) {
    color = "rgb(6, 230, 43)";
  } else if (skillWidth >= 90) {
    color = "rgb(14, 64, 231)";
  } else if (skillWidth >= 80) {
    color = "rgb(67, 22, 189)";
  } else if (skillWidth >= 60) {
    color = "rgb(22, 221, 221)";
  } else if (skillWidth >= 40) {
    color = "rgb(223, 17, 130)";
  } else if (skillWidth >= 20) {
    color = "rgb(233, 13, 42)";
  } else {
    color = "rgb(233, 5, 12)";
  }
  skill.style.backgroundColor = color;
});

// Form Validation
document.forms["contact"].addEventListener("input", validate);
validate();
function validate(e) {
  document.querySelectorAll("main form output").forEach(el => {
    if (el.classList.contains("error")) {
      setTimeout(() => {
        el.style.display = "none";
      }, 300);
    } else {
      el.style.display = "block";
    }
  })


  let result = true; // Validition statue
  let form = document.forms["contact"]; // name of the form

  // Username
  let usernameValue = form["username"].value;
  // form["username"].value = usernameValue;
  let usernameParent = form["username"].parentElement;
  usernameValue = escapeHtml(usernameValue);
  form["username"].value = usernameValue;
  usernameValue = form["username"].value.trim();

  if (usernameValue.length < 4 || !/[a-zA-z]{3,}/ig.test(usernameValue)) {
    if (usernameParent.querySelector(".error")) {
      usernameParent.querySelector(".error").classList.remove("error");
    }
    result = false;
  } else {
    usernameParent.querySelector("output").classList.add("error");
  }

  // Email
  let emailValue = form["email"].value.trim();
  form["email"].value = emailValue;
  let emailParent = form["email"].parentElement;
  
  let mailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (emailValue.length < 5 || !mailRe.test(emailValue)) {
    if (emailParent.querySelector(".error")) {
      emailParent.querySelector(".error").classList.remove("error");
    }
    result = false;
  } else {
    emailParent.querySelector("output").classList.add("error");
  }

  // Password
  let password = form["password"].value;
  let passwordParent = form["password"].parentElement;
  if (password.length < 8) {
    if (passwordParent.querySelector(".error")) {
      passwordParent.querySelector(".error").classList.remove("error");
    }
    result = false;
  } else {
    passwordParent.querySelector("output").classList.add("error");
  }

  // Message
  let message = form["msg"].value;
  let messageParent = form["msg"].parentElement;
  message = escapeHtml(message);
  form["msg"].value = message;
  message = form["msg"].value.trim();
  // if (message.length < 10 || !/[a-zA-z]{4,}/ig.test(message)) {
  if (message.length < 10) {
    if (messageParent.querySelector(".error")) {
      messageParent.querySelector(".error").classList.remove("error");
    }
    result = false;
  } else {
    messageParent.querySelector("output").classList.add("error");
  }
  return result;
}

function escapeHtml(text) {
  let map = {
    "&": "",
    "<": "",
    ">": "",
    '"': "",
    "'": "",
  }
  return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}


// Swiper js

var swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    705: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// End Swiper

// // Toggle Projects
// let cards = document.querySelectorAll("#portfolio .cards > *");
// let btns = document.querySelectorAll("#portfolio .toggle-projects > *");
// btns.forEach(el => {
//   el.addEventListener("click", e => {
//     // c(el.getAttribute("id"));
//     cards.forEach(card => {
//       if (!card.classList.contains(el.getAttribute("id"))) {
//         card.style.cssText = "transform: scale(0)";
//         setTimeout(() => {
//           card.style.display = "none";
//         }, 3000);
//       } else {
//         card.style.display = "flex";
//       }
//     })
//   })
// })

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(registration => {
  }).catch(error => {
    console.log("SW Registration Failed");
    console.log(error);
  })
}
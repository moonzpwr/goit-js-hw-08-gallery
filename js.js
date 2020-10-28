// - Создание и рендер разметки по массиву данных и
// предоставленному шаблону.
//   -Реализация делегирования на галерее ul.js -
// gallery и получение url большого изображения.
// - Открытие модального окна по клику на элементе галереи.
// - Подмена значения атрибута src элемента img.lightbox__image.
// - Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// - Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии
// модального окна, пока грузится изображение, мы не видели предыдущее.

// - Закрытие модального окна по клику на div.lightbox__overlay.
// - Закрытие модального окна по нажатию клавиши ESC.
// - Пролистывание изображений галереи в открытом модальном
// окне клавишами "влево" и "вправо".

import pictures from "./gallery-items.js";

const galleeyContainerEL = document.querySelector(".js-gallery");
const modalContainerEl = document.querySelector(".js-lightbox");
const bigImageEl = document.querySelector(".lightbox__image");
const backButtonEl = document.querySelector("#js-back");
const forwardButtonEl = document.querySelector("#js-forward")

// console.log(backButtonEl, forwardButtonEl);

// ADD HTML

function addElementInGallery(images) {
  let result = [];
  images.map(function ({ preview, original, description }, index) {
    result.push(
      `<li class="gallery__item">
  <a
    class="gallery__link"
    href='${original}'
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
    />
  </a>
</li>`
    );
  });
  return galleeyContainerEL.insertAdjacentHTML("afterbegin", result.join(" "));
}

addElementInGallery(pictures);

// OPEN MODAL
galleeyContainerEL.addEventListener("click", onClickGalleryImg); // add listener to open modal

function onClickGalleryImg(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault(); // don't go to link

  const { source, index } = event.target.dataset;
  // console.log(event.target);

  modalContainerEl.classList.add("is-open"); // open modal
  bigImageEl.src = source; // change URL to display IMG
  bigImageEl.dataset.index = index; // change index
  bigImageEl.alt = event.target.alt; // change alt
  window.addEventListener("keydown", closeModalByEsc); //add listener to close modal with ECS
  window.addEventListener("keydown", keyboardPress); //add listener to scroll images wish keyboard
  window.addEventListener("click", scrollByButtons); //add listener to scroll images wish buttons
}

// CLOSE MODAL
modalContainerEl.addEventListener("click", closeModalByMouse); //add listener to close modal with mouse(close button or click on backdrop)

function closeModalByMouse(event) {
  if (event.target.nodeName !== "DIV" && event.target.dataset.action !== "close-lightbox") {
    return;
  }
  
  modalContainerEl.classList.remove("is-open"); //close modal
  bigImageEl.src = ""; //clear URL
  window.removeEventListener("keydown", closeModalByEsc); //remove excess listener when modal close
  window.removeEventListener("keydown", keyboardPress); //remove listener to scroll images wish keyboard
  window.removeEventListener("click", scrollByButtons); //remove listener to scroll images wish buttons
}
function closeModalByEsc(event) {
  if (event.code != "Escape") {
    return;
  }
  modalContainerEl.classList.remove("is-open"); //close modal
  bigImageEl.src = ""; //clear URL
  window.removeEventListener("keydown", closeModalByEsc); //remove excess listener when modal close
  window.removeEventListener("keydown", keyboardPress); //remove listener to scroll images wish keyboard
  window.removeEventListener("click", scrollByButtons); //remove listener to scroll images wish buttons
}

// SCROLLING PICTURES BY KEYBOARD with cycle

const UrlsArr = pictures.map((el) => el.original);

function keyboardPress(event) {
  if (event.code === "ArrowRight") {
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (bigImageEl.src === UrlsArr[8]) {
        bigImageEl.src = `${UrlsArr[0]}`;
        return;
      } else if (bigImageEl.src === UrlsArr[i]) {
        bigImageEl.src = `${UrlsArr[i + 1]}`;
        return;
      }
    }
  } else if (event.code === "ArrowLeft") {
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (bigImageEl.src === UrlsArr[0]) {
        bigImageEl.src = `${UrlsArr[8]}`;
        return;
      } else if (bigImageEl.src === UrlsArr[i]) {
        bigImageEl.src = `${UrlsArr[i - 1]}`;
        return;
      }
    }
  }
}

// SCROLLING PICTURES BY KEYBOARD without cycle

// const UrlsArr = pictures.map(({ original, description }, i) => ({
//   href: original,
//   alt: description,
//   index: i,
// }));

// function keyboardPress(event) {
//   if (event.code === "ArrowRight") {
//     bigImageEl.src = UrlsArr[Number(bigImageEl.dataset.index) + 1].href;
//     bigImageEl.dataset.index = Number(bigImageEl.dataset.index) + 1;
//     bigImageEl.alt = UrlsArr[Number(bigImageEl.dataset.index) + 1].alt;
//     // console.log(UrlsArr[Number(bigImageEl.dataset.index) + 1].href);
//   } else if (event.code === "ArrowLeft") {
//     bigImageEl.src = UrlsArr[Number(bigImageEl.dataset.index) - 1].href;
//     bigImageEl.dataset.index = Number(bigImageEl.dataset.index) - 1;
//     bigImageEl.alt = UrlsArr[Number(bigImageEl.dataset.index) - 1].alt;
//   }
// }

// SCROLLING PICTURES BY BUTTON on website
function scrollByButtons(event) { 
  if (event.target.dataset.action !== "back" && event.target.dataset.action !== "forward") {
    return;
  }
  if (event.target.dataset.action === "forward") {
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (bigImageEl.src === UrlsArr[8]) {
        bigImageEl.src = `${UrlsArr[0]}`;
        return;
      } else if (bigImageEl.src === UrlsArr[i]) {
        bigImageEl.src = `${UrlsArr[i + 1]}`;
        return;
      }
    }
  } else if (event.target.dataset.action === "back") {
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (bigImageEl.src === UrlsArr[0]) {
        bigImageEl.src = `${UrlsArr[8]}`;
        return;
      } else if (bigImageEl.src === UrlsArr[i]) {
        bigImageEl.src = `${UrlsArr[i - 1]}`;
        return;
      }
    }
  }
}
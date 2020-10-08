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

// ADD HTML

function addElementInGallery(images) {
  let result = [];
  images.map(function ({ preview, original, description }) {
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
  if (event.target.nodeName != "IMG") {
    return;
  }
  event.preventDefault(); // don't go to link
  modalContainerEl.classList.add("is-open"); // open modal
  bigImageEl.src = event.target.dataset.source; // change URL to display IMG
  window.addEventListener("keydown", closeModalByEsc); //add listener to close modal with ECS
  window.addEventListener("keydown", keyboarnPress); //add listener to scroll images wish keyboard
}

// CLOSE MODAL
modalContainerEl.addEventListener("click", closeModalByMouse); //add listener to close modal with mouse(close button or click on backdrop)

function closeModalByMouse(event) {
  if (event.target.nodeName != "DIV" && event.target.nodeName != "BUTTON") {
    return;
  }
  modalContainerEl.classList.remove("is-open"); //close modal
  bigImageEl.src = ""; //clear URL
  window.removeEventListener("keydown", closeModalByEsc); //remove excess listener when modal close
}
function closeModalByEsc(event) {
  if (event.code != "Escape") {
    return;
  }
  modalContainerEl.classList.remove("is-open"); //close modal
  bigImageEl.src = ""; //clear URL
  window.removeEventListener("keydown", closeModalByEsc); //remove excess listener when modal close
  window.removeEventListener("keydown", keyboarnPress); //add listener to scroll images wish keyboard
}

// SCROLLING PICTURES BY KEYBOARD

const UrlsArr = pictures.map((el) => el.original);

function keyboarnPress(event) {
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

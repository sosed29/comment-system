import { comments } from './comments.js';
import { initComments, paintComment } from './ui.js';

document.querySelector(".dropdown-button")?.addEventListener("click", function (this: HTMLElement) {
  const dropdownContent = this.nextElementSibling as HTMLElement;
  dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

document.querySelector(".dropdown-content")?.addEventListener("click", function (this: HTMLElement, event: Event) {
  const target = event.target as HTMLElement;
  if (target.tagName === "BUTTON") {
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      const htmlItem = item as HTMLElement;
      htmlItem.classList.remove("selected");
    });
    target.classList.add("selected");
    const dropdownButton = document.querySelector(".dropdown-button") as HTMLButtonElement;
    dropdownButton.textContent = target.textContent;
    localStorage.setItem('selectedDropdown', target.textContent || '');
    this.style.display = "none";
  }
});

const triangleImg = document.querySelector(".triangle img") as HTMLImageElement | null;
const dropdownContent = document.querySelector(".dropdown-content") as HTMLElement | null;
const triangle = document.querySelector(".triangle") as HTMLElement | null;

if (triangleImg && dropdownContent && triangle) {
  triangleImg.addEventListener("click", function () {
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    triangle.classList.toggle("active");
  });
}

const textarea = document.querySelector("#about") as HTMLTextAreaElement;
const counter = document.querySelector(".Maks-text") as HTMLElement;
const sendButton = document.querySelector("#comment-send") as HTMLButtonElement;

textarea.addEventListener("input", function () {
  let textLength = textarea.value.length;
  counter.textContent = textLength + "/1000";
  if (textLength > 1000) {
    counter.style.color = "red";
    counter.textContent = textLength + "/1000 Слишком длинное сообщение";
    sendButton.disabled = true;
    sendButton.classList.remove("green-button");
  } else {
    counter.style.color = "#918d8d";
    sendButton.disabled = false;

    if (textLength > 0) {
      sendButton.classList.add("green-button");
    } else {
      sendButton.classList.remove("green-button");
    }
  }
});

initComments();

document.querySelector<HTMLElement>("#comment-send")?.addEventListener("click", function () {
  if (!sendButton.disabled) {
    const text = (document.querySelector("#about") as HTMLTextAreaElement).value;
    const newComment = {
      name: "Алексей_1994b",
      data: "15.01 13:55",
      text: text,
      counterValue: 0,
      favoriteButtonClass: "",
    };

    paintComment(comments.length, newComment, true);
  }
});


window.addEventListener('load', () => {
  const savedDropdownValue = localStorage.getItem('selectedDropdown');
  if (savedDropdownValue) {
    const dropdownButton = document.querySelector(".dropdown-button") as HTMLButtonElement;
    dropdownButton.textContent = savedDropdownValue;
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      const htmlItem = item as HTMLElement;
      if (htmlItem.textContent === savedDropdownValue) {
        htmlItem.classList.add("selected");
      } else {
        htmlItem.classList.remove("selected");
      }
    });
  }
});

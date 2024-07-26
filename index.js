var _a, _b, _c;
import { comments } from './comments.js';
import { initComments, paintComment } from './ui.js';
(_a = document.querySelector(".dropdown-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    const dropdownContent = this.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});
(_b = document.querySelector(".dropdown-content")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
        document.querySelectorAll(".dropdown-item").forEach((item) => {
            const htmlItem = item;
            htmlItem.classList.remove("selected");
        });
        target.classList.add("selected");
        const dropdownButton = document.querySelector(".dropdown-button");
        dropdownButton.textContent = target.textContent;
        localStorage.setItem('selectedDropdown', target.textContent || '');
        this.style.display = "none";
    }
});
const triangleImg = document.querySelector(".triangle img");
const dropdownContent = document.querySelector(".dropdown-content");
const triangle = document.querySelector(".triangle");
if (triangleImg && dropdownContent && triangle) {
    triangleImg.addEventListener("click", function () {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        triangle.classList.toggle("active");
    });
}
const textarea = document.querySelector("#about");
const counter = document.querySelector(".Maks-text");
const sendButton = document.querySelector("#comment-send");
textarea.addEventListener("input", function () {
    let textLength = textarea.value.length;
    counter.textContent = textLength + "/1000";
    if (textLength > 1000) {
        counter.style.color = "red";
        counter.textContent = textLength + "/1000 Слишком длинное сообщение";
        sendButton.disabled = true;
        sendButton.classList.remove("green-button");
    }
    else {
        counter.style.color = "#918d8d";
        sendButton.disabled = false;
        if (textLength > 0) {
            sendButton.classList.add("green-button");
        }
        else {
            sendButton.classList.remove("green-button");
        }
    }
});
initComments();
(_c = document.querySelector("#comment-send")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    if (!sendButton.disabled) {
        const text = document.querySelector("#about").value;
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
        const dropdownButton = document.querySelector(".dropdown-button");
        dropdownButton.textContent = savedDropdownValue;
        document.querySelectorAll(".dropdown-item").forEach((item) => {
            const htmlItem = item;
            if (htmlItem.textContent === savedDropdownValue) {
                htmlItem.classList.add("selected");
            }
            else {
                htmlItem.classList.remove("selected");
            }
        });
    }
});

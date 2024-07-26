var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getNewUser, updateCounter, updateAnswers, saveCommentsToLocalStorage, updateAnswerCounter, editAnswerFavorite } from './comments.js';
import { editCommentsToLocalStorage as editComments } from './comments.js';
export function createFavoriteButton(index, favoriteButtonClass, isAnswer = false, answerIndex = -1) {
    const favoriteButton = document.createElement("button");
    favoriteButton.className = "favorite-button";
    favoriteButton.setAttribute("data-index", index.toString());
    if (isAnswer) {
        favoriteButton.setAttribute("data-answer-index", answerIndex.toString());
    }
    favoriteButton.innerHTML = `
    <img src="../svg/heard.svg" class="heart-icon ${favoriteButtonClass}"> Избранное
  `;
    favoriteButton.addEventListener("click", () => {
        const heartIcon = favoriteButton.querySelector(".heart-icon");
        heartIcon.classList.toggle("gray-heart");
        const currentIndex = parseInt(favoriteButton.getAttribute("data-index"));
        const currentAnswerIndex = isAnswer ? parseInt(favoriteButton.getAttribute("data-answer-index")) : -1;
        const counterValue = parseInt(favoriteButton.parentElement.querySelector(".counter").textContent);
        if (isAnswer) {
            editAnswerFavorite(currentIndex, currentAnswerIndex, heartIcon.classList.contains("gray-heart") ? "gray-heart" : "", counterValue);
        }
        else {
            editComments(currentIndex, heartIcon.classList.contains("gray-heart") ? "gray-heart" : "", counterValue);
        }
    });
    return favoriteButton;
}
export function createCounterContainer(index, counterValue, isAnswer = false, answerIndex = -1) {
    const counterContainer = document.createElement("div");
    counterContainer.className = "counter-container";
    const counter = document.createElement("div");
    counter.className = "counter";
    counter.innerText = counterValue.toString();
    counter.style.color = counterValue >= 0 ? "green" : "red";
    counter.setAttribute("data-index", index.toString());
    if (isAnswer) {
        counter.setAttribute("data-answer-index", answerIndex.toString());
    }
    const minusButton = document.createElement("button");
    minusButton.className = "counter-button";
    minusButton.innerText = "-";
    minusButton.style.color = "red";
    minusButton.setAttribute("data-index", index.toString());
    if (isAnswer) {
        minusButton.setAttribute("data-answer-index", answerIndex.toString());
    }
    minusButton.addEventListener("click", () => {
        let currentValue = parseInt(counter.innerText);
        counter.innerText = (currentValue - 1).toString();
        if (currentValue - 1 < 0) {
            counter.style.color = "red";
        }
        if (isAnswer) {
            updateAnswerCounter(index, answerIndex, Number(counter.innerText));
        }
        else {
            updateCounter(index, Number(counter.innerText));
        }
    });
    const plusButton = document.createElement("button");
    plusButton.className = "counter-button";
    plusButton.innerText = "+";
    plusButton.style.color = "green";
    plusButton.setAttribute("data-index", index.toString());
    if (isAnswer) {
        plusButton.setAttribute("data-answer-index", answerIndex.toString());
    }
    plusButton.addEventListener("click", () => {
        let currentValue = parseInt(counter.innerText);
        counter.innerText = (currentValue + 1).toString();
        if (currentValue + 1 >= 0) {
            counter.style.color = "green";
        }
        if (isAnswer) {
            updateAnswerCounter(index, answerIndex, Number(counter.innerText));
        }
        else {
            updateCounter(index, Number(counter.innerText));
        }
    });
    counterContainer.appendChild(minusButton);
    counterContainer.appendChild(counter);
    counterContainer.appendChild(plusButton);
    return counterContainer;
}
export function createReplyButton() {
    let replyButton = document.createElement("button");
    replyButton.className = "reply-button";
    let img = document.createElement("img");
    img.src = "../svg/left.svg";
    img.className = "reply-icon";
    let buttonText = document.createTextNode("Ответить");
    replyButton.appendChild(img);
    replyButton.appendChild(buttonText);
    return replyButton;
}
export function paintComment(index, { name, data, text }, save = false) {
    if (document.querySelector(`.comment[data-id="${index}"]`)) {
        return;
    }
    let commentBox = document.createElement("div");
    commentBox.className = "comment";
    commentBox.setAttribute('data-id', index.toString());
    commentBox.innerHTML = `
   <div class="comment-parent">
      <div class="comment-parent_image"></div>
      <div class="comment-parent_info">
        <div class="comment-parent__info-header">
          <span class="comment-parent__info-name">${name}</span>
          <span class="comment-parent__info-time">${data}</span>
        </div>
        <div class="comment-parent__info-comment">${text}</div>
        <div class="comment-parent__info-events"></div>
      </div>
    </div>
    <div class="comment-answers"></div>
  `;
    let newComment = {
        name: name,
        data: data,
        text: text,
        favoriteButtonClass: "",
        counterValue: 0,
        answers: [],
    };
    if (save) {
        saveCommentsToLocalStorage(newComment);
    }
    let replyButton = createReplyButton();
    let favoriteButton = createFavoriteButton(index, newComment.favoriteButtonClass);
    let counterContainer = createCounterContainer(index, newComment.counterValue);
    let buttonContainer = commentBox.querySelector(".comment-parent__info-events");
    if (buttonContainer) {
        buttonContainer.appendChild(replyButton);
        buttonContainer.appendChild(favoriteButton);
        buttonContainer.appendChild(counterContainer);
    }
    const resultCommentElement = document.querySelector("#result-comment");
    if (resultCommentElement) {
        resultCommentElement.appendChild(commentBox);
    }
    const aboutElement = document.querySelector("#about");
    if (aboutElement) {
        aboutElement.value = "";
    }
    replyButton.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield getNewUser();
            newUser.originalName = name;
            const currentCommentAnswers = document.querySelector(`.comment[data-id="${index}"] .comment-answers`);
            const answerIndex = currentCommentAnswers ? currentCommentAnswers.children.length : 0;
            paintAnswers(index, newUser, answerIndex);
        });
    });
}
export function paintAnswers(index, { name, data, text, avatar, originalName, currentCommentClass }, answerIndex) {
    const newCommentBox = document.createElement("div");
    newCommentBox.className = currentCommentClass;
    newCommentBox.innerHTML = `
  <img src="${avatar}" class="comment-answers_image" alt="User Avatar">
    <div class="comment-answers_info">
      <div class="comment-answers__info-header">
        <span class="comment-answers__info-name">${name}</span>
        <div class ="mobile">
        <img src="../svg/left.svg" class="reply-icon">
        <span class="original-commenter">${originalName}</span>
         </div>
        <span class="comment-answers__info-time">${data}</span>
      </div>
      <div class="comment-answers__info-comment">
                <textarea class="reply-text">${text}</textarea>
      </div>
      <div class="comment-answers__info-events">
        <div class="button-answer" data-id="${index}">Ответить</div>
        <div class="button-container"></div>
      </div>
    </div>
  `;
    const newFavoriteButton = createFavoriteButton(index, "", true, answerIndex);
    const newCounterContainer = createCounterContainer(index, 0, true, answerIndex);
    const newButtonContainer = newCommentBox.querySelector('.button-container');
    if (newButtonContainer) {
        newButtonContainer.appendChild(newFavoriteButton);
        newButtonContainer.appendChild(newCounterContainer);
    }
    const commentAnswersContainer = document.querySelector(`.comment[data-id="${index}"] .comment-answers`);
    if (commentAnswersContainer) {
        commentAnswersContainer.appendChild(newCommentBox);
    }
}
export function initComments() {
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('button-answer')) {
            const idParent = event.target.dataset.id;
            const replyTextElement = document.querySelector(`.comment[data-id="${idParent}"] .reply-text`);
            if (replyTextElement) {
                const text = replyTextElement.value;
                const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                updateAnswers(parseInt(idParent), {
                    name: storedUser.name || '',
                    data: new Date().toLocaleString(),
                    text: text,
                    counterValue: 0,
                    favoriteButtonClass: "",
                    avatar: storedUser.avatar || ''
                });
                replyTextElement.setAttribute("disabled", "true");
            }
        }
    });
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    storedComments.forEach((comment, index) => {
        paintComment(index, comment, false);
        const favoriteButton = document.querySelector(`.favorite-button[data-index="${index}"]`);
        if (favoriteButton && comment.favoriteButtonClass) {
            favoriteButton.classList.add(comment.favoriteButtonClass);
            const heartIcon = favoriteButton.querySelector('.heart-icon');
            if (heartIcon) {
                heartIcon.classList.add(comment.favoriteButtonClass);
            }
        }
        const counter = document.querySelector(`.counter[data-index="${index}"]`);
        if (counter) {
            counter.textContent = comment.counterValue.toString();
            counter.style.color = comment.counterValue >= 0 ? 'green' : 'red';
        }
        comment.answers.forEach((answer, answerIndex) => {
            paintAnswers(index, {
                name: answer.name,
                data: answer.data,
                text: answer.text,
                avatar: answer.avatar,
                originalName: comment.name,
                currentCommentClass: "comment-answers_item"
            }, answerIndex);
            const answerFavoriteButton = document.querySelector(`.favorite-button[data-index="${index}"][data-answer-index="${answerIndex}"]`);
            if (answerFavoriteButton && answer.favoriteButtonClass) {
                answerFavoriteButton.classList.add(answer.favoriteButtonClass);
                const heartIcon = answerFavoriteButton.querySelector('.heart-icon');
                if (heartIcon) {
                    heartIcon.classList.add(answer.favoriteButtonClass);
                }
            }
            const answerCounter = document.querySelector(`.counter[data-index="${index}"][data-answer-index="${answerIndex}"]`);
            if (answerCounter) {
                answerCounter.textContent = answer.counterValue.toString();
                answerCounter.style.color = answer.counterValue >= 0 ? 'green' : 'red';
            }
        });
    });
}

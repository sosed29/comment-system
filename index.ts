
const comments: CommentData[] = JSON.parse(localStorage.getItem("comments") || "[]");


document.querySelector(".dropdown-button")?.addEventListener("click", function (this: HTMLElement) {
    const dropdownContent = this.nextElementSibling as HTMLElement;
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
});


document.querySelector(".dropdown-content")?.addEventListener("click", function (this: HTMLElement, event: Event) {
    const target = event.target as HTMLElement; 
    if (target.tagName === "BUTTON") {
      document.querySelectorAll(".dropdown-item").forEach((item) => {
        const htmlItem = item as HTMLElement;
        htmlItem.classList.remove("selected");
      });
      target.classList.add("selected");
      (
        document.querySelector(".dropdown-button") as HTMLButtonElement
      ).textContent = target.textContent;
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
      sendButton.classList.remove('green-button'); 
    } else {
      counter.style.color = "#918d8d";
      sendButton.disabled = false; 
     
      if (textLength > 0) {
        sendButton.classList.add('green-button'); 
      } else {
        sendButton.classList.remove('green-button'); 
      }
    }
  });


type Answer = {
  name: string;
  data: string;
  counterValue: number;
  favoriteButtonClass?: string;
};


interface CommentData {
  name: string;
  data: string;
  text: string;
  favoriteButtonClass: string;
  counterValue: number;
  answers: Answer[];
}


function saveCommentsToLocalStorage(comment: CommentData): void {
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));
}


function editCommentsToLocalStorage(index: number, classfavorite: string, counterValue: number): void {
  const comments: CommentData[] = JSON.parse(localStorage.getItem("comments") || "[]");
  comments[index].favoriteButtonClass = classfavorite;
  comments[index].counterValue = counterValue;
  localStorage.setItem("comments", JSON.stringify(comments));
}


function saveCounter(index: number, counterValue: number): void {
  comments[index].counterValue = counterValue;
  localStorage.setItem("comments", JSON.stringify(comments));
}


document.querySelector<HTMLElement>("#comment-send")?.addEventListener("click", function () {
   
  if (!sendButton.disabled) {
    let name = "Алексей_1994b";
    let data = "15.01 13:55";
    let text = (document.querySelector("#about") as HTMLInputElement).value;
    
    let commentBox = document.createElement("div");
    commentBox.className = "images-alex";
    commentBox.innerHTML = `
      <div class="comment-details">
        <div class="comment-name">${name}</div>
        <div class="comment-data">${data}</div>
      </div>
      <div class="position">
        <div class="comment-text">${text}</div>
      </div>
    `;


    let newComment: CommentData = {
      name: name,
      data: data,
      text: text,
      favoriteButtonClass: "",
      counterValue: 0,
      answers: [], 
    };

 
    saveCommentsToLocalStorage(newComment);

   
    let replyButton = document.createElement("button");
    replyButton.className = "reply-button";

    let img = document.createElement("img");
    img.src = "../svg/left.svg";
    img.className = "reply-icon";

    
    let buttonText = document.createTextNode("Ответить");
    replyButton.appendChild(img);
    replyButton.appendChild(buttonText);

    let favoriteButton = document.createElement("button");
    favoriteButton.className = "favorite-button";

    favoriteButton.setAttribute("data-index", String(comments.length - 1));
    favoriteButton.innerHTML = `
      <img src="../svg/heard.svg" class="heart-icon"> Избранное
    `;

    favoriteButton.addEventListener("click", function () {
      let heartIcon = this.querySelector(".heart-icon") as HTMLImageElement;
      heartIcon.classList.toggle("gray-heart");
      let index = parseInt((this as HTMLButtonElement).getAttribute("data-index")!);
      let counterValue = parseInt((this.parentElement!.querySelector(".counter") as HTMLDivElement).textContent!);
     
      editCommentsToLocalStorage(index, heartIcon.classList.contains("gray-heart") ? "gray-heart" : "", counterValue);
    });

    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
  
    buttonContainer.appendChild(replyButton);
    buttonContainer.appendChild(favoriteButton);

 
    let counterContainer = document.createElement("div");
    counterContainer.className = "counter-container";

    
    let counter = document.createElement("div");
    counter.className = "counter";
    counter.innerText = "0";
    counter.style.color = "green";

 
    let minusButton = document.createElement("button");
    minusButton.className = "counter-button";
    minusButton.innerText = "-";
    minusButton.style.color = "red";
    minusButton.setAttribute("data-index", (comments.length - 1).toString());

    minusButton.addEventListener("click", function () {
      let currentValue = parseInt(counter.innerText);
      counter.innerText = (currentValue - 1).toString();
      if (currentValue - 1 < 0) {
        counter.style.color = "red";
      }
      let index = parseInt((this as HTMLButtonElement).getAttribute("data-index")!);
      saveCounter(index, Number(counter.innerText));
    });

    // Создаем кнопку для увеличения значения счетчика.
    let plusButton = document.createElement("button");
    plusButton.className = "counter-button";
    plusButton.innerText = "+";
    plusButton.style.color = "green";
    plusButton.setAttribute("data-index", (comments.length - 1).toString());
    plusButton.addEventListener("click", function () {
      let currentValue = parseInt(counter.innerText);
      counter.innerText = (currentValue + 1).toString();
      if (currentValue + 1 >= 0) {
        counter.style.color = "green";
      }
      let index = parseInt((this as HTMLButtonElement).getAttribute("data-index")!);
      saveCounter(index, Number(counter.innerText));
    });

    // Добавляем элементы управления счетчиком в контейнер счетчика.
    counterContainer.appendChild(minusButton);
    counterContainer.appendChild(counter);
    counterContainer.appendChild(plusButton);

    // Добавляем контейнер счетчика в контейнер кнопок.
    buttonContainer.appendChild(counterContainer);

    // Добавляем контейнер кнопок в блок комментария.
    commentBox.appendChild(buttonContainer);
    // Находим элемент для вывода результата и добавляем в него блок комментария.
    const resultCommentElement = document.querySelector("#result-comment");
    if (resultCommentElement) {
      resultCommentElement.appendChild(commentBox);
    }
    // Очищаем текстовое поле после отправки комментария.
    const aboutElement = document.querySelector("#about");
    if (aboutElement instanceof HTMLInputElement) {aboutElement.value = "";}

    // Устанавливаем флаг для отслеживания, какой комментарий был открыт.
    let currentCommentClass = "images-DJ";

    // Добавляем обработчик события для кнопки "Ответить".
    replyButton.addEventListener("click", function () {
      if (currentCommentClass === "images-DJ") {
        // Создаем новые переменные для имени пользователя, даты и текста ответа.
        let newName = "Джунбокс3000";
        const newData = "15.01 15:18";
        const newText = (document.querySelector("#about") as HTMLTextAreaElement).value;
        const originalName = "Алексей_1994b";

        // Создаем новый блок для ответа на комментарий.
        const newCommentBox = document.createElement("div");
        newCommentBox.className = "images-DJ";
        newCommentBox.innerHTML = `
          <div class="neWcomment-details">
            <div class="neWcomment-name">${newName}<img src="../svg/left.svg" class="reply-icon"><span style="color: gray;">${originalName}</span></div>
            <div class="neWcomment-data">${newData}</div>
          </div>
          <div class="position">
            <textarea class="reply-text"></textarea>
          </div>
        `;


      const index = comments.length - 1;
      comments[index].answers.push({name: newName, data: newData, counterValue: 0, favoriteButtonClass: "",});
      
      localStorage.setItem("comments", JSON.stringify(comments));

      const newReplyButton = document.createElement("button");
      newReplyButton.className = "reply-button";

      const newImg = document.createElement("img");
      newImg.src = "../svg/left.svg";
      newImg.className = "reply-icon";

      const newButtonText = document.createTextNode("Ответить");
      newReplyButton.appendChild(newImg);
      newReplyButton.appendChild(newButtonText);

      const newFavoriteButton = document.createElement("button");
      newFavoriteButton.className = "favorite-button";
      newFavoriteButton.setAttribute(
        "data-index",
        (comments.length - 1).toString()
      );
      newFavoriteButton.innerHTML = `
      <img src="../svg/heard.svg" class="heart-icon ${comments[index].answers[0].favoriteButtonClass}"> Избранное
    `;

      newFavoriteButton.addEventListener("click", () =>  {
        const heartIcon = newFavoriteButton.querySelector(".heart-icon") as HTMLImageElement;
        heartIcon.classList.toggle("gray-heart");
        const index = parseInt(newFavoriteButton.getAttribute("data-index") as string);
        comments[index].answers[0].favoriteButtonClass =
          heartIcon.classList.contains("gray-heart") ? "gray-heart" : "";
        localStorage.setItem("comments", JSON.stringify(comments));
      });

      const newButtonContainer = document.createElement("div");
      newButtonContainer.className = "button-container";

      const newCounterContainer = document.createElement("div");
      newCounterContainer.className = "counter-container";

      const newCounter = document.createElement("div");
      newCounter.className = "counter";
      newCounter.innerText = "0";
      newCounter.style.color = "green";

      const newMinusButton = document.createElement("button");
      newMinusButton.className = "counter-button";
      newMinusButton.innerText = "-";
      newMinusButton.style.color = "red";
      newMinusButton.addEventListener("click", () => {
        let currentValue = parseInt(newCounter.innerText);
        newCounter.innerText = (currentValue - 1).toString();
        if (currentValue - 1 < 0) {
          newCounter.style.color = "red";
        }
        const index = comments.length - 1;
        comments[index].answers[0].counterValue = parseInt(
          newCounter.innerText
        );
        localStorage.setItem("comments", JSON.stringify(comments));
      });

      const newPlusButton = document.createElement("button");
      newPlusButton.className = "counter-button";
      newPlusButton.innerText = "+";
      newPlusButton.style.color = "green";
      newPlusButton.addEventListener("click", () => {
        let currentValue = parseInt(newCounter.innerText);
        newCounter.innerText = (currentValue + 1).toString();
        if (currentValue + 1 >= 0) {
          newCounter.style.color = "green";
        }
        const index = comments.length - 1;
        comments[index].answers[0].counterValue = parseInt(
          newCounter.innerText
        );
        localStorage.setItem("comments", JSON.stringify(comments));
      });

      newCounterContainer.appendChild(newMinusButton);
      newCounterContainer.appendChild(newCounter);
      newCounterContainer.appendChild(newPlusButton);

      const newFlexContainer = document.createElement("div");
      newFlexContainer.className = "flex-container";

      newFlexContainer.appendChild(newFavoriteButton);
      newFlexContainer.appendChild(newCounterContainer);

      newButtonContainer.appendChild(newFlexContainer);

      newCommentBox.appendChild(newButtonContainer);
      ( document.querySelector("#result-comment") as HTMLElement).appendChild(newCommentBox);
      (document.querySelector("#about") as HTMLTextAreaElement).value = "";

      currentCommentClass = "images-Dyhnila";
    } else if (currentCommentClass === "images-Dyhnila") {
        let newName = "Мистер Душнила";
        let newData = "11.02 15:02";
        let newText = (document.querySelector("#about") as HTMLInputElement).value;
        let originalName = "Алексей_1994b";
    
        let newCommentBox = document.createElement("div");
        newCommentBox.className = "images-Dyhnila";
        newCommentBox.innerHTML = `
          <div class="neWcomment-details">
            <div class="neWcomment-name">${newName}<img src="../svg/left.svg" class="reply-icon"><span style="color: gray;">${originalName}</span></div>
            <div class="neWcomment-data">${newData}</div>
          </div>
          <div class="position">
            <div class="neWcomment-text">${newText}</div>
            <textarea class="reply-text"></textarea>
          </div>
        `;
    
        let index = comments.length - 1;
        comments[index].answers.push({ name: newName, data: newData, counterValue: 0, favoriteButtonClass: "" });
        localStorage.setItem("comments", JSON.stringify(comments));
    
        let newReplyButton = document.createElement("button");
        newReplyButton.className = "reply-button";
    
        let newImg = document.createElement("img");
        newImg.src = "../svg/left.svg";
        newImg.className = "reply-icon";
    
        let newButtonText = document.createTextNode("Ответить");
        newReplyButton.appendChild(newImg);
        newReplyButton.appendChild(newButtonText);
    
        let newFavoriteButton = document.createElement("button");
        newFavoriteButton.className = "favorite-button";
        newFavoriteButton.setAttribute("data-index", (comments.length - 1).toString());
        newFavoriteButton.innerHTML = `
          <img src="../svg/heard.svg" class="heart-icon ${comments[index].answers[comments[index].answers.length - 1].favoriteButtonClass}"> Избранное
        `;
    
        newFavoriteButton.addEventListener("click", () => {
          const heartIcon = newFavoriteButton.querySelector(".heart-icon") as HTMLImageElement;
          heartIcon.classList.toggle("gray-heart");
          const index = parseInt(newFavoriteButton.getAttribute("data-index") as string);
          comments[index].answers[comments[index].answers.length - 1].favoriteButtonClass = heartIcon.classList.contains("gray-heart") ? "gray-heart" : "";
          localStorage.setItem("comments", JSON.stringify(comments));
        });
    
        let newButtonContainer = document.createElement("div");
        newButtonContainer.className = "button-container";
    
        let newCounterContainer = document.createElement("div");
        newCounterContainer.className = "counter-container";
    
        let newCounter = document.createElement("div");
        newCounter.className = "counter";
        newCounter.innerText = "0";
        newCounter.style.color = "green";
    
        let newMinusButton = document.createElement("button");
        newMinusButton.className = "counter-button";
        newMinusButton.innerText = "-";
        newMinusButton.style.color = "red";
        newMinusButton.addEventListener("click", function () {
          let currentValue = parseInt(newCounter.innerText);
          newCounter.innerText = (currentValue - 1).toString();
          if (currentValue - 1 < 0) {
            newCounter.style.color = "red";
          }
          const index = comments.length - 1;
          comments[index].answers[comments[index].answers.length - 1].counterValue = parseInt(newCounter.innerText);
          localStorage.setItem("comments", JSON.stringify(comments));
        });
    
        let newPlusButton = document.createElement("button");
        newPlusButton.className = "counter-button";
        newPlusButton.innerText = "+";
        newPlusButton.style.color = "green";
        newPlusButton.addEventListener("click", function () {
          let currentValue = parseInt(newCounter.innerText);
          newCounter.innerText = (currentValue + 1).toString();
          if (currentValue + 1 >= 0) {
            newCounter.style.color = "green";
          }
          const index = comments.length - 1;
          comments[index].answers[comments[index].answers.length - 1].counterValue = parseInt(newCounter.innerText);
          localStorage.setItem("comments", JSON.stringify(comments));
        });
    
        newCounterContainer.appendChild(newMinusButton);
        newCounterContainer.appendChild(newCounter);
        newCounterContainer.appendChild(newPlusButton);
    
        let newFlexContainer = document.createElement("div");
        newFlexContainer.className = "flex-container";
    
        newFlexContainer.appendChild(newFavoriteButton);
        newFlexContainer.appendChild(newCounterContainer);
    
        newButtonContainer.appendChild(newFlexContainer);
    
        newCommentBox.appendChild(newButtonContainer);
        (document.querySelector("#result-comment") as HTMLElement).appendChild(newCommentBox);
        (document.querySelector("#about") as HTMLTextAreaElement).value = "";
    
        currentCommentClass = "images-DJ";
    }
  });
}
});
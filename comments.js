var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getNewUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://randomuser.me/api/');
            const data = yield response.json();
            const user = data.results[0];
            const userData = {
                name: `${user.name.first} ${user.name.last}`,
                data: new Date().toLocaleString(),
                text: "",
                avatar: user.picture.thumbnail,
                originalName: "",
                currentCommentClass: "comment-answers_item"
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return userData;
        }
        catch (error) {
            console.error('Ошибка при выборе нового пользователя', error);
            const userData = {
                name: "Unknown User",
                data: new Date().toLocaleString(),
                text: "",
                avatar: "default-avatar-url",
                originalName: "",
                currentCommentClass: "comment-answers_item"
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return userData;
        }
    });
}
// Получение комментариев из локального хранилища
export const comments = JSON.parse(localStorage.getItem("comments") || "[]");
// Функция для сохранения комментариев в локальное хранилище
export function saveCommentsToLocalStorage(comment) {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}
// Функция для редактирования комментариев в локальном хранилище
export function editCommentsToLocalStorage(index, classfavorite, counterValue) {
    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    if (index < comments.length) {
        comments[index].favoriteButtonClass = classfavorite;
        comments[index].counterValue = counterValue;
        localStorage.setItem("comments", JSON.stringify(comments));
    }
}
// Функция для обновления счётчика комментариев
export function updateCounter(index, counterValue) {
    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    if (index < comments.length) {
        comments[index].counterValue = counterValue;
        localStorage.setItem("comments", JSON.stringify(comments));
    }
}
// Функция для обновления счётчика ответов
export function updateAnswerCounter(index, answerIndex, counterValue) {
    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    if (index < comments.length && answerIndex < comments[index].answers.length && comments[index].answers[answerIndex]) {
        comments[index].answers[answerIndex].counterValue = counterValue;
        localStorage.setItem("comments", JSON.stringify(comments));
    }
}
// Функция для редактирования избранного ответа
export function editAnswerFavorite(index, answerIndex, classfavorite, counterValue) {
    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    if (index < comments.length && answerIndex < comments[index].answers.length && comments[index].answers[answerIndex]) {
        comments[index].answers[answerIndex].favoriteButtonClass = classfavorite;
        comments[index].answers[answerIndex].counterValue = counterValue;
        localStorage.setItem("comments", JSON.stringify(comments));
    }
}
// Функция для обновления ответов
export function updateAnswers(index, answer) {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments[index].answers.push(answer);
    localStorage.setItem('comments', JSON.stringify(comments));
}

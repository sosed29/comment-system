export type Answer = {
  name: string;
  data: string;
  text: string;
  avatar: string;
  counterValue: number;
  favoriteButtonClass?: string;
};

export interface CommentData {
  name: string;
  data: string;
  text: string;
  favoriteButtonClass: string;
  counterValue: number;
  answers: Answer[];
}

export interface UserData {
  name: string;
  data: string;
  text: string;
  avatar: string;
  originalName: string;
  currentCommentClass: string;
}

export async function getNewUser(): Promise<UserData> {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    const userData: UserData = {
      name: `${user.name.first} ${user.name.last}`,
      data: new Date().toLocaleString(),
      text: "",
      avatar: user.picture.thumbnail,
      originalName: "", 
      currentCommentClass: "comment-answers_item"
    };
    localStorage.setItem('currentUser', JSON.stringify(userData)); 
    return userData;
  } catch (error) {
    console.error('Ошибка при выборе нового пользователя', error);
    const userData: UserData = {
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
}

// Получение комментариев из локального хранилища
export const comments: CommentData[] = JSON.parse(
  localStorage.getItem("comments") || "[]"
);

// Функция для сохранения комментариев в локальное хранилище
export function saveCommentsToLocalStorage(comment: CommentData): void {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Функция для редактирования комментариев в локальном хранилище
export function editCommentsToLocalStorage(index: number, classfavorite: string, counterValue: number): void {
  const comments: CommentData[] = JSON.parse(
    localStorage.getItem("comments") || "[]"
  );
  if (index < comments.length) {
    comments[index].favoriteButtonClass = classfavorite;
    comments[index].counterValue = counterValue;
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}

// Функция для обновления счётчика комментариев
export function updateCounter(index: number, counterValue: number): void {
  const comments: CommentData[] = JSON.parse(
    localStorage.getItem("comments") || "[]"
  );
  if (index < comments.length) {
    comments[index].counterValue = counterValue;
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}

// Функция для обновления счётчика ответов
export function updateAnswerCounter(index: number, answerIndex: number, counterValue: number): void {
  const comments: CommentData[] = JSON.parse(
    localStorage.getItem("comments") || "[]"
  );
  if (index < comments.length && answerIndex < comments[index].answers.length && comments[index].answers[answerIndex]) {
    comments[index].answers[answerIndex].counterValue = counterValue;
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}

// Функция для редактирования избранного ответа
export function editAnswerFavorite(index: number, answerIndex: number, classfavorite: string, counterValue: number): void {
  const comments: CommentData[] = JSON.parse(
    localStorage.getItem("comments") || "[]"
  );
  if (index < comments.length && answerIndex < comments[index].answers.length && comments[index].answers[answerIndex]) {
    comments[index].answers[answerIndex].favoriteButtonClass = classfavorite;
    comments[index].answers[answerIndex].counterValue = counterValue;
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}

// Функция для обновления ответов
export function updateAnswers(index: number, answer: Answer): void {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  comments[index].answers.push(answer);
  localStorage.setItem('comments', JSON.stringify(comments));
}
/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

//1
const reclama = document.querySelectorAll('.promo__adv img');

for (let i = 0; i < reclama.length; i++) {
	reclama[i].remove();
}

//2
document.querySelector(".promo__genre").textContent = "Драма";

//3
document.querySelector(".promo__bg").style.cssText = 'background-image: url("./img/bg.jpg")';

//4
const  arr = movieDB.movies.sort();
const myList = document.querySelectorAll('.promo__interactive-list .promo__interactive-item');
for (let i = 0; i < myList.length; i++) {
	myList[i].textContent = `${i + 1}. ${arr[i]}`;

}

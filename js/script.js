/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	const adv = document.querySelectorAll('.promo__adv img'),
		poster = document.querySelector('.promo__bg'),
		genre = poster.querySelector('.promo__genre'),
		movieList = document.querySelector('.promo__interactive-list'),
		addForm = document.querySelector('form.add'),
		addInput = addForm.querySelector('.adding__input'),
		checkbox = addForm.querySelector('[type="checkbox"]');


	addForm.addEventListener('submit', (event) => {
		event.preventDefault();							//отмена перегрузки страницы

		const newFilm = addInput.value;
		const favorite = checkbox.checked;

		if(newFilm){

			if (newFilm.lenght > 21) {
				newFilm = `${newFilm.substring(0, 22)}...`;		// обрезаем названия фильма > 21 симфола
			}

			if (favorite) {
				console.log("Добавляем любимый фильм");
			}


			movieDB.movies.push(newFilm);
			sortArr(movieDB.movies);
	
			createMovieList(movieDB.movies, movieList);	
		}

		event.target.reset();							//чистим форму

	});

	const deleteAdv = (arr) => {
		arr.forEach((item) => {
			item.remove();
		});
	};

	deleteAdv(adv);

	const makeChanges = () => {

		genre.textContent = "Драма";
		poster.style.backgroundImage = 'url("img/bg.jpg")';
	};

	makeChanges();

	function sortArr(arr) {
		arr.sort();
	}

	sortArr(movieDB.movies);

	function createMovieList(films, parent) {

		parent.innerHTML = '';

		sortArr(films);

		films.forEach((film, i) => {
			parent.innerHTML += `
				<li class="promo__interactive-item">${i + 1} ${film}
					<div class="delete"></div>
				</li>
			`;
		});
		
		document.querySelectorAll('.delete').forEach((btn, i) => {
				btn.addEventListener('click', () => {
					btn.parentElement.remove();				//удаление со страницы
					movieDB.movies.splice(i, 1);				//удаление из объекта

					createMovieList(films, parent);			//пересчет списка
				});
		});

	}

	createMovieList(movieDB.movies, movieList);

});
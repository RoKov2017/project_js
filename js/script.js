window.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
			tabsContant = document.querySelectorAll('.tabcontent'),
			tabsParent = document.querySelector('.tabheader__items');

	
	function hideTabContent() {
		tabsContant.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContant[i].classList.add('show', 'fade');
		tabsContant[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')){
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}

	});


	//Timer

	const deadline = '2023-05-11';

	function getTimeRemaining(endtime) {
			const t = Date.parse(endtime) - Date.parse(new Date()); // разница между текущей датой и конечно в милисекундах 
					days = Math.floor(t / (1000 * 60 * 60 * 24)),
					hours = Math.floor((t / (1000 * 60 * 60)) % 24),
					minutes = Math.floor((t / 1000 / 60) % 60),
					seconds = Math.floor((t / 1000) % 60);



			return {
					'total': t,
					'days':	days,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
			};
	}

	function getZero(num) {
		if (num >= 0 && num < 10){
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				timeInterval = setInterval(updateClock, 1000);

		updateClock();		// вызываем функцию, чтобы сразу загрузились изменения

		function updateClock() {
			const t = getTimeRemaining(endTime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <=0) {
				clearInterval(timeInterval);
			}
			  
		}
	}

	setClock('.timer', deadline);

	//Modal

	 const modalTrigger = document.querySelectorAll('[data-modal]'),
	 			modalCloseBtn =  document.querySelector('[data-close]'),
				modal = document.querySelector('.modal');

	function openModal () {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';		 // чтобы не было скролла под модальным окном
		clearTimeout(modalTimerId);	
	}

	modalTrigger.forEach( btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';			// возвращаем скролл
	}

	modalCloseBtn.addEventListener('click', closeModal);


	//Закрытие модального окна при клике в не окна

	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});


	//Закрытие модального окна при нажатии кномки Esc 

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

		//Открытие модального окна через заданный промежуток

		const modalTimerId = setTimeout(openModal, 5000);


		//Открывать модальное окно когда пользователь проскроллил до конца страницы
	
		function showModalByScroll() {
			if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
				openModal();
				window.removeEventListener('scroll', showModalByScroll);		//удаляем событие, чтобы оно выполнилось только один раз
			}
		}
	
		window.addEventListener('scroll', showModalByScroll);

});

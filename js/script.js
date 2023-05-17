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

	const deadline = '2023-06-11';

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

	


	//Закрытие модального окна при клике в не окна

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
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

		const modalTimerId = setTimeout(openModal, 50000);


		//Открывать модальное окно когда пользователь проскроллил до конца страницы
	
		function showModalByScroll() {
			if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
				openModal();
				window.removeEventListener('scroll', showModalByScroll);		//удаляем событие, чтобы оно выполнилось только один раз
			}
		}
	
		//window.addEventListener('scroll', showModalByScroll);


		//Используем классы для карточек

		class MenuCard {
			constructor (src, alt, title, descr, price, parentSelector, ...classes) {
				this.src = src;
				this.alt = alt;
				this.title = title;
				this.descr = descr;
				this.price = price;
				this.classes = classes; 
				this.transfer = 27;
				this.changeToUAH();
				this.parent = document.querySelector(parentSelector);
			}

			changeToUAH() {
				this.price = this.price * this.transfer;
			}
	
			render () {
				const element = document.createElement('div');

				if (this.classes.length === 0) {
					this.element = 'menu__item';
					element.classList.add(this.element);
				} else {
					this.classes.forEach(className => element.classList.add(className));
				}
				
				element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
				`;
				this.parent.append(element);

			}
		}

		new MenuCard(
			"img/tabs/vegy.jpg",
			"vegy",
			'Меню "Фитнес"',
			'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
			'9',
			'.menu .container',

		).render();

		new MenuCard(
			"img/tabs/elite.jpg",
			"elite",
			'Меню “Премиум”',
			'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
			'14',
			'.menu .container',
			'menu__item'
		).render();

		new MenuCard(
			"img/tabs/post.jpg",
			"post",
			'Меню "Постное"',
			'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
			'21',
			'.menu .container',
			'menu__item'
		).render();

		
		//Forms

		const forms = document.querySelectorAll('form');

		const message = {
			loading: 'img/form/spinner.svg',
			success: 'Спасибо, скоро с Вами свяжемся',
			failure: 'Что-то пошло не так...'
		};

		forms.forEach(item => {
			postData(item);
		});

		function postData(form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				const statusMassege = document.createElement('img');
				statusMassege.src = message.loading;
				statusMassege.style.cssText = `
					display: block;
					margin: 0 auto;
				`;
				form.insertAdjacentElement('afterend', statusMassege)

				// const request = new XMLHttpRequest();
				// request.open('POST', 'server.php');

				// request.setRequestHeader('Content-type', 'application/json');
				const formData = new FormData(form);

				// const object = {};
				// formData.forEach(function(value, key) {
				// 	object[key] = value;
				// });

				// const json = JSON.stringify(object);



				fetch('server.php', {
					method: "POST",
					// headers: {
					// 	'Content-type': 'application/json'
					// },
					body: formData
				}).then(data => data.text())
				.then(data => {
						console.log(data);
						showThanksModal(message.success);
						statusMassege.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();			//чистим форму
				});
				 			
			});
		}

		function showThanksModal(message) {
			const prevModalDialog = document.querySelector('.modal__dialog');

			prevModalDialog.classList.add('hide');
			openModal();

			const thanksModal = document.createElement('div');
			thanksModal.classList.add('modal__dialog');
			thanksModal.innerHTML = `
				<div class="modal__content">
					<div class="modal__close">×</div>
					<div class="modal__title">${message}</div>
				</div>
			`;

			document.querySelector('.modal').append(thanksModal);
			setTimeout(() => {
				thanksModal.remove();
				prevModalDialog.classList.add('show');
				prevModalDialog.classList.remove('hide');
				closeModal();
			}, 4000);
		}

});

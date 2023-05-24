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

		const getResource = async (url) => {
			const res = await fetch(url);

			// вывод ошибки http у fetch
			if (!res.ok) {
				throw new Error (`Could not fetch ${url}, status: ${res.status}`);
			}

			return await res.json(); 
		};

		// getResource ('http://localhost:3000/menu')
		// 	.then( data => {
				// data.forEach( ({img, atlimg, title, descr, price}) => {
				// 	new MenuCard(img, atlimg, title, descr, price, '.menu .container').render();
				// });
		// 	});

		axios.get('http://localhost:3000/menu')
			.then(data => {
				data.data.forEach( ({img, atlimg, title, descr, price}) => {
					new MenuCard(img, atlimg, title, descr, price, '.menu .container').render();
				});
			});
		
		//Forms

		const forms = document.querySelectorAll('form');

		const message = {
			loading: 'img/form/spinner.svg',
			success: 'Спасибо, скоро с Вами свяжемся',
			failure: 'Что-то пошло не так...'
		};

		forms.forEach(item => {
			bindPostData(item);
		});

		const postData = async (url, data) => {
			const res = await fetch(url, {
				method: "POST",
				headers: {
					 'Content-type': 'application/json'
				},
				body: data
			});

			return await res.json(); 
		};

		function bindPostData(form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				const statusMassege = document.createElement('img');
				statusMassege.src = message.loading;
				statusMassege.style.cssText = `
					display: block;
					margin: 0 auto;
				`;
				form.insertAdjacentElement('afterend', statusMassege)

				const formData = new FormData(form);

				const json = JSON.stringify(Object.fromEntries(formData.entries()));

				postData('http://localhost:3000/requests', json)
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


		// Sliders

		const slides = document.querySelectorAll('.offer__slide'),
				prev = document.querySelector('.offer__slider-prev'),
				next = document.querySelector('.offer__slider-next'),
				total = document.querySelector('#total'),
				current = document.querySelector('#current'),
				slidesWrapper = document.querySelector('.offer__slider-wrapper'),
				slidesField = document.querySelector('.offer__slider-inner'),
				width = window.getComputedStyle(slidesWrapper).width;

		let slideIndex = 1,
				offset = 0;

		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
		

		slidesField.style.width = 100 * slides.length + '%';
		slidesField.style.display = 'flex';
		slidesField.style.transition = '0.5s all';

		slidesWrapper.style.overflow = 'hidden';


		slides.forEach(slide => {
			slide.style.width = width;
		});

		next.addEventListener('click', () => {
			if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
				offset = 0;
			} else {
				offset += +width.slice(0, width.length - 2);
			}

			slidesField.style.transform = `translateX(-${offset}px)`;

			if(slideIndex == slides.length) {
				slideIndex = 1;
			} else {
				slideIndex++;
			}

			if(slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex++;
			}

		});

		prev.addEventListener('click', () => {
			if (offset == 0 ) {
				offset = +width.slice(0, width.length - 2) * (slides.length - 1)
			} else {
				offset -= +width.slice(0, width.length - 2);
			}

			slidesField.style.transform = `translateX(-${offset}px)`;

			if(slideIndex == 1) {
				slideIndex = slides.length;
			} else {
				slideIndex--;
			}

			if(slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}
		});

		// showSliders(slideIndex);

		// if (slides.length < 10) {
		// 	total.textContent = `0${slides.length}`;
		// } else {
		// 	total.textContent = slides.length;
		// }

		// function showSliders(n) {
		// 	if (n > slides.length) {
		// 		slideIndex = 1;
		// 	}

		// 	if (n < 1) {
		// 		slideIndex = slides.length;
		// 	}

		// 	slides.forEach(item => item.style.display = 'none');

		// 	slides[slideIndex - 1].style.display = 'block';

		// 	if (slides.length < 10) {
		// 		current.textContent = `0${slideIndex}`;
		// 	} else {
		// 		current.textContent = slideIndex;
		// 	}
	
		// }

		// function plusSlides(n) {
		// 	showSliders(slideIndex += n);
		// }

		// prev.addEventListener('click', () => {
		// 	plusSlides(-1);
		// });

		// next.addEventListener('click', () => {
		// 	plusSlides(1);
		// });

});

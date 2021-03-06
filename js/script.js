'use strict';
/* jslint node: true */
/* jshint browser: true */
/*jshint esversion: 6 */

window.addEventListener('DOMContentLoaded', () => {

  //Tabs

const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items'); 
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
   
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
//===============================================================================

//TIMER

const deadline = '2020-11-30'; // Переменная, определяющая дедлайн

//Функция, определяющая разницу между дедлайном и текущим временем:
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)), // Операция Math.floor округляет 
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);
          
          return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
  
    }         

    // Функция, устанавливающая таймер на страницу:

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();      
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }    
    setClock('.timer', deadline);
//============================================================================================
    // МОДАЛЬНОЕ ОКНО УРОК 43

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          //modalCloseBtn = document.querySelector('[data-close]');
          
    function openModal() {
         modal.classList.add('show');
        modal.classList.remove('hide');
        //modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeId);
     }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
   
    
    function closeModal() {
         modal.classList.add('hide');
        modal.classList.remove('show');
        //modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    //modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {  
           closeModal();
       }
   });

   document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
   });

   // Всплытие модального окна через опрделенное время

   const modalTimeId = setTimeout(openModal, 50000);

   function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
   }
   
   window.addEventListener('scroll', showModalByScroll);


   // ИСПОЛЬЗУЕМ КЛАССЫ ДЛЯ КАРТОЧЕК

   class MenuCard {
       constructor(src, alt, title, descr, prise, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);
            this.prise = prise;
            this.classes = classes;
            this.transfer = 27; 
            this.changeToUAH();
       }

       changeToUAH() {
            this.prise = this.prise * this.transfer;
       }

       render() {
           const element = document.createElement('div');
           if (this.classes.length === 0) {
               this.element = 'menu__item';
               element.classList.add(this.element);
           }else {
            this.classes.forEach((className) => {
                element.classList.add(className);
            }); 
           }
           
           element.innerHTML = `
            
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.prise}</span> грн/день</div>
                </div>
            
           `;
           this.parent.append(element);
       }
   }
    
    const div = new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
         9,
         '.menu .container',
        //  'menu__item',
        //  'big'
    );

   

    div.render(); // Можно также сделать и без переменной, когда нужно это использовать только один раз. Просто: new MenuCard().render()

     new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
         14,
         '.menu .container',
         'menu__item'
        
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
         21,
         '.menu .container',
         'menu__item'
    ).render(); 

    //===============================================================================

    // FORMS

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        filure: 'Что-то пошло не так...'
    };
    
    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            //statusMessage.classList.add('.load');
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            statusMessage.src = message.loading;
            
            
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest(); Это устаревший метод. Вместо него лучше использовать fetch
            // request.open('POST', 'server.php');

            

            //request.setRequestHeader('Content-type', 'multipart/form-data'); // Когда связка  XMLHttpRequest + form-data, не нужно никаких заголовков
            const formData = new FormData(form);

           // Манипуляции для метода json
           const object = {};
           formData.forEach(function(value, key) {
                object[key] = value;
           });
           
          
            
         
            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showTnanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showTnanksModal(message.filure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    // Красивое уведомление пользователя об отправке письма

    function showTnanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
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

    // fetch============================================================
        // Этот код не нужен, он просто для примера:

//    fetch('https://jsonplaceholder.typicode.com/posts', { 
//        method: 'POST',
//        body: JSON.stringify({name: 'Alex'}),
//        headers: {
//         'Content-type': 'application/json'
//        }
            
//    })
//     .then(response => response.json())
//     .then(json => console.log(json));
 

}); // конец домконтент
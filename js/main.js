window.addEventListener('load', function () {
    let toogleButton = document.querySelector('.menu__toggle')
    let menuStatus = false
    updateMenu()

    toogleButton.addEventListener('click', function(e) {
        e.preventDefault()
        toggleStatus()
        updateMenu()
        addClass()
    })

    function toggleStatus() {
        menuStatus = !menuStatus
    }

    function updateMenu() {
        let menu = document.querySelector('.menu__search')

        if(!menuStatus) {
            menu.classList.remove('menu__search--active')
        } else {
            menu.classList.add('menu__search--active')
        }
    }

    let popup = document.querySelector('.modal')
    let feedback = document.querySelector('.header__feedback')
    let close = document.querySelector('.modal__close')

    feedback.addEventListener('click', function (e) {
        e.preventDefault();
        popup.classList.add('modal--show')
    })

    close.addEventListener('click', function (e) {
        e.preventDefault();
        popup.classList.remove('modal--show')
    })

    const email = document.querySelector('.modal__email')
    const phone = document.querySelector('.modal__phone')
    let errorEmail = true
    let errorPhone = true

    document.querySelector('.modal__form').addEventListener('submit', function (e) {
        e.preventDefault()
        const requestURL = './send.php'
        const form = document.querySelector('.modal__form')
        const body = new FormData(form)

        checkForm()

        if (errorEmail || errorPhone) {
            console.log('Form is invalid!')
        } else {
            sendRequest('POST', requestURL, body)
        }
    })

    function checkForm() {
        let emailValue = email.value.trim()
        let phoneValue = phone.value.trim()

        if (emailValue === '') {
            email.classList.add('email-error')
            setError(email, 'Поле не должно быть пустым')
        } else if (!isEmail(emailValue)) {
            email.classList.add('email-error')
            setError(email, 'Данные введены не корректно')
        } else {
            email.classList.remove('email-error')
            setSuccess(email)
            errorEmail = false
        }

        if (phoneValue === '') {
            phone.classList.add('phone-error')
            setError(phone, 'Поле не должно быть пустым')
        } else {
            phone.classList.remove('phone-error')
            setSuccess(phone)
            errorPhone = false
        }
    }

    function sendRequest(method, url, body = null) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.responseType = 'json'
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                document.querySelector('.modal').classList.remove('modal--show')
                // document.querySelector('.modal__form').reset()
                window.location.reload()
                alert("Сообщение отправлено успешно");

                // информирует, если не удалось связаться с php файлом
            } else {
                alert("Ошибка сервера. Номер: " + xhr.status)
            }
        }
        xhr.send(body)
    }

    function setError(input, message) {
        let parentElement = input.closest('.modal__passage')
        let errorElement = parentElement.querySelector('.error-status')

        errorElement.innerText = message
    }

    function setSuccess(input) {
        let parentElement = input.closest('.modal__passage')
        let errorElement = parentElement.querySelector('.error-status')

        errorElement.innerText = ''
    }

    function isEmail(email) {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(String(email).toLowerCase());
    }



$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
        0: {
            items: 1
        }
    }
})

document.addEventListener(
    "DOMContentLoaded", () => {
        new Mmenu("#my-menu", {
            // options
            navbar: {
                title: "Основное меню сайта"
            }
        }, {
            // configuration
            offCanvas: {
                page: {
                    selector: "#my-page"
                }
            }
        });
    }
);

document.addEventListener(
    "DOMContentLoaded", () => {
        new Mmenu( "#my-menu", {
           "setSelected": {
              "hover": true
           }
        });
    }
);
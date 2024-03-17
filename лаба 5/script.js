var FormA = [
    { label: 'Имя:', elemtype: 'text', name: 'username' },
    { label: 'Email:', elemtype: 'email', name: 'email' },
    { label: 'Пароль:', elemtype: 'password', name: 'password' },
    { label: 'Пол:', elemtype: 'select', name: 'gender', options: ['Мужской', 'Женский'] },
    { label: 'Дата рождения:', elemtype: 'date', name: 'birthdate' },
    { label: 'Я принимаю условия соглашения:', elemtype: 'checkbox', name: 'agreement' },
    { label: 'Отправить форму:', elemtype: 'button', value: 'Send' }
];

function createForm(formArray, formName) {
    var form = document.createElement('form');
    form.setAttribute('name', formName);

    formArray.forEach(function (item) {
        var label = document.createElement('label');
        label.textContent = item.label;

        var input;
        if (item.elemtype === 'checkbox') {
            input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
        } else if (item.elemtype === 'button') {
            input = document.createElement('input');
            input.setAttribute('type', 'submit');
            input.setAttribute('value', item.value);
        } 
        else if (item.elemtype === 'select') {
            input = document.createElement('select');
            item.options.forEach(function (optionText) {
                var option = document.createElement('option');
                option.textContent = optionText;
                input.appendChild(option);
            });
        } else {
            input = document.createElement('input');
            input.setAttribute('type', item.elemtype);
            input.setAttribute('name', item.name);
            input.addEventListener('input', function () {
                validateField(input);
            });
        }

        form.appendChild(label);
        form.appendChild(input);
    });

    document.getElementById('formContainer').appendChild(form);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var errors = validateForm(form);

        if (errors.length > 0) {
            displayErrors(errors);
        } else {
            alert('Форма заполнена корректно!');
            form.reset();
        }
    });
}

createForm(FormA, 'registrationForm');

function validateField(input) {
    var errorContainer = input.nextElementSibling;
    if (!errorContainer || errorContainer.className !== 'error') {
        errorContainer = document.createElement('div');
        errorContainer.className = 'error';
        input.parentNode.insertBefore(errorContainer, input.nextSibling);
    }

    var errorMessage = '';
    var inputValue = input.value.trim();

    switch (input.type) {
        case 'text':
            if (inputValue.length === 0) {
                errorMessage = 'Поле не должно быть пустым';
            }
            break;
        case 'email':
            if (!validateEmail(inputValue)) {
                errorMessage = 'Введите корректный email';
            }
            break;
        case 'password':
            if (inputValue.length < 8) {
                errorMessage = 'Пароль должен содержать минимум 8 символов';
            }
            break;
        case 'date':
            var currentDate = new Date();
            var selectedDate = new Date(inputValue);
            if (selectedDate >= currentDate) {
                errorMessage = 'Дата рождения должна быть в прошлом';
            }
            break;
        case 'checkbox':
            if (!input.checked) {
                errorMessage = 'Вы должны согласиться с условиями соглашения';
            }
            break;
    }

    errorContainer.textContent = errorMessage;
    input.setCustomValidity(errorMessage);
}

function validateForm(form) {
    var errors = [];
    var inputs = form.querySelectorAll('input:not([type="submit"]), select');

    inputs.forEach(function (input) {
        validateField(input);
        if (input.validity.valid === false) {
            errors.push(input.nextElementSibling.textContent);
        }
    });

    return errors;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function displayErrors(errors) {
    var errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';

    errors.forEach(function (error) {
        var errorMessage = document.createElement('p');
        errorMessage.textContent = error;
        errorMessage.classList.add('error');
        errorContainer.appendChild(errorMessage);
    });
}
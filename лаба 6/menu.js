const menuA = [
    { name: "О нас", url: "about.html" },
    { name: "Новости", submenu: [
    { name: "2024 год", url : "https://ru.wikipedia.org/wiki/2024_%D0%B3%D0%BE%D0%B4", 
    submenu : 
    [{name: "Зима",  url : "https://ru.wikipedia.org/wiki/2023_%D0%B3%D0%BE%D0%B4#%D0%AF%D0%BD%D0%B2%D0%B0%D1%80%D1%8C"},
    {name: "Весна", url : "https://ru.wikipedia.org/wiki/2023_%D0%B3%D0%BE%D0%B4#%D0%9C%D0%B0%D1%80%D1%82"}]
    },
    { name: "2023 год", submenu : [
        {name: "Зима",  url : "https://ru.wikipedia.org/wiki/2023_%D0%B3%D0%BE%D0%B4#%D0%AF%D0%BD%D0%B2%D0%B0%D1%80%D1%8C"},
        {name: "Весна", url : "https://ru.wikipedia.org/wiki/2023_%D0%B3%D0%BE%D0%B4#%D0%9C%D0%B0%D1%80%D1%82"},
        {name: "Лето", url : "https://ru.wikipedia.org/wiki/2023_%D0%B3%D0%BE%D0%B4#%D0%98%D1%8E%D0%BD%D1%8C" },
        {name: "Осень", url : "https://ru.wikipedia.org/wiki/2023_%D0%B3%D0%BE%D0%B4#%D0%9E%D0%BA%D1%82%D1%8F%D0%B1%D1%80%D1%8C"}
    ]}
  ]},
  { name: "Услуги", submenu: [
    { name: "Международные перевозки" },
    { name: "Перевозки по Беларуси" },
    { name: "Другое" }
  ]},
  { name: "Мы в мире", submenu: [
    { name: "Беларусь" , submenu : [
        {name: "Минск" },
        {name: "Гомель" },
        {name: "Брест" },
        {name: "Витебск" },
        {name: "Могилев" }]},
    { name: "Россия" },
    { name: "Польша" },
    { name: "Литва" }
  ]}
];
const menu = document.getElementById('menu');

function createHeaders(menuArray) {
    menuArray.forEach(menuItem => {
        const header = document.createElement('div');
        header.classList.add('header');

        const link = document.createElement('a');
        link.setAttribute('href', menuItem.url || '#');
        link.classList.add('link');
        link.textContent = menuItem.name;
        header.appendChild(link);
        menu.appendChild(header);

        if (menuItem.submenu) {
            const submenuContainer = document.createElement('div');
            submenuContainer.classList.add('submenu-container');

            header.addEventListener('click', (event) => {
                event.preventDefault(); 
                const isSubMenuVisible = submenuContainer.style.display === 'block';
                hideAllSubmenus();
                submenuContainer.style.display = isSubMenuVisible ? 'none' : 'block';
            });

            header.appendChild(submenuContainer);
            showMenu(menuItem.submenu, submenuContainer);
        }
    });
}


function showMenu(submenuArray, parent) {
    submenuArray.forEach(item => {
        const submenuItem = document.createElement('div');
        submenuItem.classList.add('submenu-item');

        const link = document.createElement('a');
        link.setAttribute('href', item.url || '#');
        link.textContent = item.name;

        submenuItem.appendChild(link);
        parent.appendChild(submenuItem);

        if (item.submenu) {
            const submenuContainer = document.createElement('div');
            submenuContainer.classList.add('submenu-container');

            submenuItem.appendChild(submenuContainer);

            submenuItem.addEventListener('click', (event) => {
                event.stopPropagation(); 
                submenuContainer.style.display = submenuContainer.style.display === 'block' ? 'none' : 'block';
                if (submenuContainer.style.display === 'block') {
                    submenuContainer.style.left = submenuItem.offsetWidth + 'px';
                    submenuContainer.style.top = submenuItem.offsetTop + 'px';
                }
            });

            showMenu(item.submenu, submenuContainer);
        }
    });
}

function hideAllSubmenus() {
    const allSubmenuContainers = document.querySelectorAll('.submenu-container');
    allSubmenuContainers.forEach(container => {
        container.style.display = 'none';
    });
}


createHeaders(menuA);

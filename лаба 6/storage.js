class TLocalStorage {
    constructor() {}

    getValue(key) {
        return localStorage.getItem(key);
    }

    setValue(key, value) {
        localStorage.setItem(key, value);
    }

    deleteValue(key) {
        localStorage.removeItem(key);
    }

    getKeys() {
        return Object.keys(localStorage);
    }

    reset() {
        localStorage.clear();
    }
}

const myLocalStorage = new TLocalStorage();

function AddTransport() {
    let key = prompt("Введите название транспортного средства:");
    let value = prompt("Введите описание транспортного средства:");
    if (value === null || key === null) {
        return;
    }
    myLocalStorage.setValue(key, value);
}

function DeleteTransport() {
    let key = prompt("Введите название транспортного средства для удаления:");
    myLocalStorage.deleteValue(key);
}

function GetTransportInfo() {
    let key = prompt("Введите название транспортного средства:");
    if (!key) {
        return; 
    }
    console.log(myLocalStorage.getValue(key) || "Нет информации");
}

function ListAllTransports() {
    let keys = myLocalStorage.getKeys();
    if (keys.length === 0) {
        console.log("В базе нет объектов");
        return;
    }
    console.log(keys);
}

class THashStorage {
    constructor() {
        this.storage = {};
    }

    Reset() {
        this.storage = {};
    }

    AddValue(key, value) {
        if (!key || !value) {
            alert("Ошибка: название и описание должны быть заполнены!");
            return;
        }
        this.storage[key] = value;
    }

    GetValue(key) {
        return this.storage[key];
    }

    DeleteValue(key) {
        if (!key) {
            key = prompt("Введите название транспортного средства:");
            if (!key) return; 
        }
        if (this.storage.hasOwnProperty(key)) {
            delete this.storage[key];
        } else {
            alert("Объект с таким названием не найден.");
        }
    }

    GetKeys() {
        return Object.keys(this.storage);
    }
}

const storage = new THashStorage();

function AddTransport() {
    let key = prompt("Введите название транспортного средства:");
    let value = prompt("Введите описание транспортного средства:");
    if (value === null || key === null) {
        return;
    }
    storage.AddValue(key, value);
}

function DeleteTransport() {
    let key = prompt("Введите название транспортного средства для удаления:");
    storage.DeleteValue(key);
}

function GetTransportInfo() {
    let key = prompt("Введите название транспортного средства:");
    if (!key) {
        return; 
    }
    console.log(storage.GetValue(key) || "Нет информации");
}

function ListAllTransports() {
    let keys = storage.GetKeys();
    if (keys.length === 0) {
        console.log("В базе нет объектов");
        return;
    }
    console.log(keys);
}

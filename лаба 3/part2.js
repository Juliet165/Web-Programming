
let transportHash = {};

function AddValue(key, value) {
    transportHash[key] = value;
}

function DeleteValue(key) {
    if (transportHash.hasOwnProperty(key)) {
        delete transportHash[key];
    }
}

function GetValueInfo(key) {
    if (transportHash.hasOwnProperty(key)) {
        return transportHash[key];
    } else {
        return "нет информации";
    }
}

function ListValues() {
    let result = "";
    for (let key in transportHash) {
        result += `${key}: ${transportHash[key]}\n`;
    }
    return result;
}

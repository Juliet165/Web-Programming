const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Указываем Express, что файлы в текущей директории статические
app.use(express.static(path.join(__dirname)));

// Устанавливаем маршрут для отдачи файла index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Устанавливаем маршрут для скачивания файла cafe.json
app.get('/cafe.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'cafe.json'));
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

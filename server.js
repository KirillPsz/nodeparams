const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');

// Middleware для парсинга тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', (req, res) => {
  // Заголовки запроса
  const headers = req.headers;
  
  // Параметры запроса
  const queryParams = req.query;
  
  // Тело запроса
  const body = req.body;

  console.log('Заголовки:', headers);
  console.log('Параметры:', queryParams);
  console.log('Тело:', body);

  // Отправка данных на страницу
  res.render('request', {
    headers,
    queryParams,
    body
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

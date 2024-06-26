const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

const token = '';
const bot = new TelegramBot(token, { polling: true });


// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');

// Middleware для парсинга тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', async (req, res) => {
  // Заголовки запроса
  const headers = req.headers;
  
  // Параметры запроса
  const queryParams = req.query;
  
  // Тело запроса
  const body = req.body;

  // Отправка данных на страницу
  res.render('request', {
    headers,
    queryParams,
    body
  });
});

// Определяем обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Привет! Я бот, который подключен к Express!', {
    reply_markup: {     
      inline_keyboard: [          
        [{ text: 'Play', web_app: { url: 'https://nodeparams.onrender.com' } }],
        [{ text: 'Play Again', web_app: { url: 'https://nodeparams.onrender.com' } }]
      ]
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

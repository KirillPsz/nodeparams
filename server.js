const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

const token = '7310214755:AAF3dYvtpI48qArQS-poWIaPEi1_NH5etAA';
const bot = new TelegramBot(token, { polling: true });

// Установка вебхука для бота
const webhookUrl = 'https://https://nodeparams.onrender.com/webhook/' + token;
bot.setWebHook(webhookUrl);

// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');

// Middleware для парсинга тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/webhook/${token}`, (req, res) => {
  const { message } = req.body;
  
  if (message && message.text === '/start') {
    // Генерация и сохранение перманентного токена для пользователя
    // const permanentToken = generatePermanentToken();
    // savePermanentToken(message.chat.id, permanentToken); // Примерная функция для сохранения токена
    // Отправка ответа пользователю
    // sendResponseToUser(message.chat.id, `Ваш перманентный токен: ${permanentToken}`);
  }

  bot.processUpdate(req.body);

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

app.all('*', async (req, res) => {
  res.sendMessage('Telegram only!');
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

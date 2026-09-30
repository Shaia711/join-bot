const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.BOT_TOKEN;
const app = express();
const PORT = process.env.PORT || 10000;

// هذا السيرفر الوهمي عشان Render يرضى
app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const bot = new TelegramBot(TOKEN, { 
  polling: true,
  onlyFirstMatch: true
});

console.log('Bot started successfully');

bot.on('chat_join_request', async (req) => {
  try {
    await bot.approveChatJoinRequest(req.chat.id, req.from.id);
    console.log(`Approved: ${req.from.id}`);
  } catch (e) {
    console.log(e.message);
  }
});

// منع تعليق البوت
bot.on('polling_error', (error) => {
  console.log(`Polling error: ${error.message}`);
});
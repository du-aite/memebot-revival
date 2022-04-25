const Discord = require("discord.js");
const client = new Discord.Client();
const token = require('./token.json');
const token = "NDM1MjAxODk1MzQzMzI1MTk0.WtPPWQ.J9Jm3IsiASEBC0bI1eFBuMHqP4E";
const { prefix } = require('./config.json');
var tocadorDeAudios = require('./tocarAudios.js');
var carregadorListaComandosAudio = require('./carregadorListaComandosAudio.js');
const { Console } = require("console");
const { strict } = require("assert");
const { stringify } = require("querystring");
const message = new Discord.Message();
const botNickname = "MEE6";
client.commands = new Discord.Collection();

//client Connected
client.on('ready', () => {

  console.log('Rodando!');

});

//recebimento de mensagem
client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  var command = msg.content.slice(prefix.length).toLowerCase();
  var canal = msg.channel;

  if (command === 'ping') {
    canal.send('Pong.');
  }

  if (command == 'memebot comandos-audio') {
    canal.send(carregadorListaComandosAudio.getMensagemTextoTodosComandos());
  }

  //audio
  tocadorDeAudios.tocarAudiosFuncao(msg, command);
});


client.on('voiceStateUpdate', (oldMember, newMember) => {

  var newUserChannel = newMember.channelID;
  var oldUserChannel = oldMember.channelID;

  if (newUserChannel == undefined || newUserChannel != oldUserChannel) {
    var Guild = client.guilds.cache.get("74550791179874304");
    var bot = Guild.members.cache.get("435201895343325194");
    var canalVozBot = bot.voice.channel;

    if (canalVozBot != null || canalVozBot != undefined) {
      var arrayCanalVoz = canalVozBot.members.array();

      if (canalVozBot.members.size <= 1 && arrayCanalVoz[0].nickname == botNickname) {
        bot.voice.channel.leave();
      }
    }
  }
});


//AUTH 
client.login(token.BOT_TOKEN);
require('http').createServer().listen(); 
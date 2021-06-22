const MusicBot = require('./server.js');

const musicBot = new MusicBot({
  discordToken: 'NjE3MDA5MDAzNDk4ODMxOTAy.XWk4aQ.XIFArjcLknWh2SWBNlUQ5F-YM9M'
  ,
  googleKey: 'AIzaSyCxWoXHGavTO6FfGVuhGo-ls_0pZexKrDQ'
});

musicBot.start();

//Do not update this to Discord.JS v0.12.1 or your bot will crash
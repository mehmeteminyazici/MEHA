const discord=require('discord.js')
const client=require('./../index').client
const userparser=require('./../index').userparser
const config=require('./../config')
const p=require('./çal').player
const distube=require('./çal').distube
let queue=""

module.exports = {
	name:  'liste',
	description: 'Listeyi gösterir',
	cooldown: 5,
    args:true,
    usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
    
   
	async execute(ctx,url){
  try{
  if(distube.isPlaying(ctx)){
     queue = distube.getQueue(ctx);
        message.channel.send('Şuan çalan şarkı:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).join("\n"));
  }
  if(p.isPlaying(ctx)){
    console.log("Etkin")
    queue = p.getQueue(ctx);
    console.log(queue)
        if(queue)
         
             ctx.channel.send('Liste:\n'+(queue.songs.map((song, i) => {
                return `${i === 0 ? 'Şuan çalan şarkı' : `#${i+1}`} - ${song.name} | ${song.author}`
            }).join('\n')));

  }
   
  }catch(error){
    queue = distube.getQueue(ctx);
        ctx.channel.send('Liste:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).join("\n"));
     queue = p.getQueue(ctx);
        if(queue)
         
             ctx.channel.send('Liste:\n'+(queue.songs.map((song, i) => {
                return `${i === 0 ? 'Şuan çalıyor' : `#${i+1}`} - ${song.name} | ${song.author}`
            }).join('\n')));   
  }



  }

}

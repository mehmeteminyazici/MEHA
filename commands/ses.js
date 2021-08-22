const discord=require('discord.js')
const client=require('./../index').client
const userparser=require('./../index').userparser
const config=require('./../config')
const p=require('./çal').player
const distube=require('./çal').distube
module.exports={
  name:`ses`,
  description:`Botun ses seviyesini ayarlar.`,
  cooldown:5,
  args:true,
  usage:`${client.config.prefix}ses 500(0-500 arası önerilir daha fazlasında seste sorun oluşabilir)`,
  
  async execute(ctx,seviye){ 
    try{
      if(client.user.id!=ctx.author.id&&p.isPlaying(ctx)){
        
      return await p.setVolume(ctx,seviye)
      
      }
      else if(client.user.id!=ctx.author.id&&distube.isPlaying(ctx)){
        return await distube.setVolume(ctx, seviye) 
      }
    }catch(error){
      if(client.user.id!=ctx.author.id){
      await distube.setVolume(ctx, seviye)
      await p.setVolume(ctx,seviye)
      }
      console.log(error)
    }
    
 }
  

    
}
  


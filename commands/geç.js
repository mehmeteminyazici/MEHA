const discord=require('discord.js')
const client=require('./../index').client
const userparser=require('./../index').userparser
const config=require('./../config')
const p=require('./çal').player
const distube=require('./çal').distube

module.exports={
    name:'geç',
    description:'Müzigi geçer',
    cooldown:5,
    args:true,
    usage:`${config.prefix}geç Açıklamanı yaz.`,
	async execute(ctx,acıklama){
	  try{
	   this.usage=`${config.prefix}geç Açıklamanı yaz`
     if(p.isPlaying(ctx)){
       return await p.skip(ctx)
     }
     else if(distube.isPlaying(ctx)){
       return await distube.skip(ctx);
     }

    }catch(error){
      console.log(error)
    }

  }
}

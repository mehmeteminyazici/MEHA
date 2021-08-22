const discord = require('discord.js')
const client = require('./../index').client
const userparser = require('./../index').userparser
const config = require('./../config.json');
const cheerio=require('cheerio')
const rp=require('request-promise')


async function embedyap(message, color,title,url,kisi,acıklama,yanresim, field,resim,footer, channel){
const embed=new discord.MessageEmbed()
.setColor(color)
.setTitle(title)
.setURL(url)
.setAuthor(kisi)
.setDescription(acıklama)
.setThumbnail(yanresim)
.addField(field,'Bilgi',true)
.setImage(resim)
.setTimestamp()
.setFooter(footer,`${message.author.displayAvatarURL()}`)
await channel.send(embed)

}
const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const vgmUrl= 'https://discord.com/';


async function durumuoku(ctx,m){
  try{
    got(vgmUrl).then(response => {
  const dom = new JSDOM(response.body);
  console.log(response.body)
  dom.window.document.querySelectorAll('code').forEach(async link=>{
    console.log(link.href)
  })
}).catch(err => {
  console.log(err);
});
    let kontrol=`${m}`.split(',').join(' ')
    if(`${ctx.mentions.members.first()}`==`undefined`){
      ctx.guild.members.cache.forEach(member=>{
        if(member.id==kontrol||member.displayName==kontrol||member.displayName.toLowerCase()==kontrol){
          m=member
        }
      })
    }else{
      m=ctx.mentions.members.first()

    }
   
   const membre = ctx.guild.member(m);
   if(`${membre.presence.status}`=="offline"){
      return await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bilgi',`${ctx.member.user.displayAvatarURL()}`,'Bilgi',`<@${ctx.author.id}>`,`${ctx.member.user.displayAvatarURL()}`,`Etiketlediğiniz Kullanıcı çevrimdışı bu yüzden durumunu okuyamam.`,`${client.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
   }
   if(`${membre.presence.activities[0]}`=="undefined"){
      return await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bilgi',`${ctx.member.user.displayAvatarURL()}`,'Bilgi',`<@${ctx.author.id}>`,`${ctx.member.user.displayAvatarURL()}`,`Etiketlediğiniz Kullanıcı kendine durum belirlememiş.`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
   }
   
    
   const oyaz=membre.user.presence.activities[0].state
   
   const emoji=membre.user.presence.activities[0].emoji
   if(emoji!=null&&oyaz!=null){
    if (!member.bot){
        return await embedyap(ctx,`${ctx.member.displayHexColor}`,``,`${ctx.member.user.displayAvatarURL()}`,`Bilgi`,`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,`Etiketlediğiniz kullanıcını durumu:${membre.user.presence.activities[0].emoji}${membre.user.presence.activities[0].state}`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
    } 
    
   }     
   if(emoji!=null&&oyaz==null){
     if (!member.bot){
        return await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bilgi',`${ctx.member.user.displayAvatarURL()}`,'Bilgi',`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,`Etiketlediğiniz kullanıcını durumu:${membre.user.presence.activities[0].emoji}`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
    } 
    
   }     
   if(oyaz==undefined||oyaz==null){
     if (!member.bot){
       return await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bilgi',`${ctx.member.user.displayAvatarURL()}`,'Bilgi',`<@${ctx.author.id}>`,`${ctx.member.user.displayAvatarURL()}`,`Etiketlediğiniz kullanıcını durumu:${membre.user.presence.activities[0].name}`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
    } 
     
   }else{
     if (!member.bot){
        return await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bilgi',`${ctx.member.user.displayAvatarURL()}`,'Bilgi',`<@${ctx.author.id}>`,`${ctx.member.user.displayAvatarURL()}`,`Etiketlediğiniz kullanıcını durumu:${membre.user.presence.activities[0].state}`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel).catch(async err=>{
         await ctx.reply("Kişinin durumu yok.")
       })
    } 
      
   }
  
    
    
    
    
  }catch(error){
   console.log(error)
  }
}
module.exports = {
	name:'durum',
	description: 'Etiketlediğin kişinin durumunu gösterir.',
	cooldown: 5,
    args:true,
    usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
	async execute(ctx,member) {
    try{
     this.usage=`${config.prefix}durum Kişiyi etiketle veya adını veya idsini yaz `
     await durumuoku(ctx,member).catch(async error=>{
       await ctx.reply("Kişinin durumu yok.")
     })
    }catch(error){
     
    }
    



  }
  }

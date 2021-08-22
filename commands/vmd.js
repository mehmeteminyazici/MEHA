const discord = require('discord.js')
const client = require('./../index').client
const userparser = require('./../index').userparser
const Database = require("@replit/database")
const config = require('./../config.json');
const db = new Database()  
async function embedyap(message, color,title,url,kisi,acıklama,yanresim, field,resim,footer, channel){
const embed=new discord.MessageEmbed()
.setColor(color)
.setTitle(title)
.setURL(url)
.setAuthor(kisi)
.setDescription(acıklama)
.setThumbnail(yanresim)
.addField(field,kisi,true)
.setImage(resim)
.setTimestamp()
.setFooter(footer,`${message.author.displayAvatarURL()}`)
await channel.send(embed)

}
module.exports = {
	name:  'vmd',
	description: 'Gelince mesaj atacağın kanalı belirler.Vmd(Varsayılan mesajı değiştir.)',
	cooldown: 5,
    args:true,
    usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
	async execute(ctx,mesaj="") {
    try{
     this.usage=`Botun geldiğinde mesaj atacağı kanalı belirler KULLANIM:${config.prefix}vmd Bu kısma mesajınızı yazınız.(Sadece rolünde yönetici izni bulunan kişiler kullanbilir.` 
     if(ctx.member.hasPermission("ADMINISTRATOR")&&!ctx.author.bot){
     const guild=ctx.member.guild
     let yaz=""
     let bilgiler={}
     let b="" 
     if(mesaj.length==0)return
     if(mesaj==""){
      mesaj=["Varsayılan Mesaj Burada."]
     }
     yaz=mesaj.join(" ")
     let kanal=ctx.guild.channels.cache.get(ctx.channel.id) 
     if(kanal){
       await db.set("bilgiler"+guild.id,{
       "kanalid":kanal.id,
       "mesaj":yaz,
     })
     bilgiler[guild.id]=await db.get("bilgiler"+guild.id)
     if(!ctx.author.bot){
      return await embedyap(ctx,`${ctx.member.displayHexColor}`,``,`${ctx.member.user.displayAvatarURL()}`,'Bilgi',`<@${ctx.author.id}> Gelirken ****<#${bilgiler[guild.id].kanalid}>**** ****Kanalına ${bilgiler[guild.id].mesaj}****`,`${client.user.displayAvatarURL()}`,`Mesajını yazacağım.`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
     }
     
     } 
     }         
     

     
     if(!(ctx.member.hasPermission("ADMINISTRATOR"))&&!ctx.author.bot){
        return await embedyap(ctx,`${ctx.member.displayHexColor}`,``,`${ctx.member.user.displayAvatarURL()}`,'UYARI',`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,`Bu komutu kullanabilmeniz için Sunucuyu yönetme yetkinizin olması gerekli sizde yönetici yetkisi bulunmadığı için bu komutu kullanamazsınız.`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
     }
    
     
       
    }catch(error){
     console.log(error)
    }
   

  }
  
}

	  

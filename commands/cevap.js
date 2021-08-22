const discord = require('discord.js')
const Database = require("@replit/database")
const client = require('./../index').client
const config = require('./../config.json');
const userparser = require('./../index').userparser
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
module.exports ={

name: 'cevap',
	description: 'Botun vereceği cevabı siz ayarlarsınız.',
	cooldown: 5,
    args:true,
    usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
	async execute(ctx,mesaj="") {
   try{
     this.usage=`Mesajını yazmadın Örnek kullanım:${config.prefix}cevap Mesajın buraya yazılacak`
    if(ctx.member.hasPermission('ADMINISTRATOR')){  
    const kanalid=ctx.channel.id
    console.log(`${mesaj}`)
    if (mesaj==""){
      return
    }
    const db = new Database()
    var yaz=`${mesaj}`.split(',')
    var str=mesaj.join(" ")
    
    

    await db.set("cevaplar"+`${ctx.guild.id}`,{
      "cevap":`${str}`,
      
    })

    
  
   let cevaplar=await db.get("cevaplar"+`${ctx.guild.id}`)
   ctx.reply("Cevap olarak"+`${cevaplar.cevap}`+"vereceğim")
  }
   if(!ctx.member.hasPermission('ADMINISTRATOR')){
    if(!member.bot){
       return await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bu komutu kullanabilmeniz için yönetici yetkinizin olması gerekli sizde yönetici yetkisi bulunmadığı için bu komutu kullanamazsınız.',`${ctx.member.user.displayAvatarURL()}`,``,`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,``,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
    
    }
    
    
   } 
   
   }catch(error){
     console.log(error)
   }
  }
}

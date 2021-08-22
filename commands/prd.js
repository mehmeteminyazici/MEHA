const discord = require('discord.js')
const Database = require("@replit/database")
const client = require('./../index').client
const config = require('./../config.json');
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
async function resimdeğistir(){

}
module.exports = {
	name:  'prd',
	description: 'Botun resmini değiştirir',
	cooldown: 5,
    args:true,
    usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
	async execute(ctx,mesaj="") {
   try{
       
       if(ctx.member.id==770893793955545088&&!ctx.author.bot){
         await client.user.setAvatar('https://image.freepik.com/free-photo/blue-brushstrokes-background_125540-809.jpg')
       }else{
         if(!ctx.author.bot){
           return await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bu komut sahibine özeldir.',`${ctx.member.user.displayAvatarURL()}`,'UYARI',`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,`Bu komut sadece sahibine aittir.`,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
         }
        
       }
      
   }catch(error){
      console.log(error)
   }


  }
}

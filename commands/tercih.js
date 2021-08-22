const discord = require('discord.js')
const client = require('./../index').client
const userparser = require('./../index').userparser
const Database = require("@replit/database")
const config = require('./../config.json');
const db=new Database()
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

module.exports = {

	name: 'tercih',

	description: 'Botun tercih komutunu değiştirir',

	cooldown: 5,

  args:true,

  usage:`Botun tercih komutunu ayarlarsınız.Örnek:${client.config.prefix
  }(Varsayılan Prefixi değiştirmediyseniz + kullanın onun dışında ayarladığınız prefixi kullanın örnek prefix'i ! yaptık !tercih yazın.`,

	async execute(ctx,tercih=""){
  try{

   
   
   
   if(ctx.member.hasPermission("MANAGE_ROLES")&&!ctx.author.bot){
     client.config.prefix=`${tercih[0]}`
     await db.set("tercihler"+`${ctx.guild.id}`,{
      "tercih":client.config.prefix
   })
   
   
   }
   if(!ctx.member.hasPermission("MANAGE_ROLES")&&!ctx.author.bot){
    await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bu komutu kullanabilmeniz için rolleri yönetme yetkinizin olması gerekli sizde yönetici yetkisi bulunmadığı için bu komutu kullanamazsınız.',`${ctx.member.user.displayAvatarURL()}`,'UYARI',`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,``,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
    return
   }
  
  }catch(error){
    console.log(error)
  }

 
	}
}


const discord = require('discord.js')
const config = require('./../config.json');
const client = require('./../index').client
let role=""
const userparser = require('./../index').userparser
async function ac(ctx,m){
  try{
  if(m.length==0){
      return
      }else{
      if(`${ctx.mentions.members.first()}`=='undefined'){
      ctx.guild.members.cache.forEach(member=>{
      const kontrol=`${m}`.split(',').join(' ')  
       
      
      if(member.id==m||member.displayName==kontrol||member.displayName.toLowerCase()==kontrol){
         m=member
      }
  
     
  
  
     })
     }else{
     m=ctx.mentions.members.first()
    }
    
    
    if(ctx.member.hasPermission("MANAGE_ROLES")){
    role = m.roles.cache.find(role => role.name === "Muted")
    if(m==ctx.member.id){
      return ctx.reply('Kendini açma lan eşoğleşek. ')
    }
   if(m.user.id==client.user.id||m==client.user.id){
    return ctx.reply('Kim susturulmuşki açıyorsun aslanım.')
    
    }
    ctx.guild.channels.cache.forEach(async channel=>{
      channel.permissionOverwrites.get(m.id).delete();
       
     })
   m.roles.cache.forEach(async roles=>{
     if(role){
       await m.roles.remove(`${role.id}`)
     
   }
   })  
   
   if(m.user.bot){
     m.roles.cache.forEach(role=>{
     if(role.id!=ctx.guild.roles.everyone.id){
       role.setPermissions(['ADMINISTRATOR','SEND_MESSAGES', 'ADD_REACTIONS','VIEW_CHANNEL','EMBED_LINKS','MANAGE_ROLES','MANAGE_MESSAGES','CONNECT','SPEAK']).catch(error=>{
         
         if (error.code == 50013) {
		        return ctx.reply('Lütfen susturabilmem için yetkilerimi susturmak istediğiniz kişiden yukarıya alınız.');
	       }
       })
  
     }
    })
    } 
  }
   
  
  if(!ctx.member.hasPermission("MANAGE_ROLES")){
    await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bu komutu kullanabilmeniz için rolleri yönetme yetkinizin olması gerekli sizde yönetici yetkisi bulunmadığı için bu komutu kullanamazsınız.',`${ctx.member.user.displayAvatarURL()}`,``,`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,``,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
    return
}
}
}catch(error){
  console.log(error)
}
}
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

  name: 'aç',
	description: 'Susturulan kişilerin açılmasını sağlar',

  args:true,
  usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
	async execute(ctx,m) {
    
    try{
    
      this.usage=`Susturulması açılacak kullanıcıyı etiketle veya takma adını gir veya ID numarasını gir Örnek:${config.prefix}sustur @Ömer veya  id ile ${config.prefix} 1234567891011121314 veya ${config.prefix} Ömer `
    }catch(error){
      
      console.log(error.message)
    
    }finally{
       
       return ac(ctx,m)
    
       
       
    }
  

  }

  }




















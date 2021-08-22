const discord = require('discord.js')
const config = require('./../config.json');
const client = require('./../index').client
let role=""
const userparser = require('./../index').userparser
async function sustur(ctx,m){
  try{
  if(m.length==0){
      return
      }else{
      if(`${ctx.mentions.members.first()}`=='undefined'){
      ctx.guild.members.cache.forEach(member=>{
       const kontrol=`${m}`.split(',').join(' ') 
      if(member.id==m||member.displayName==kontrol||member. displayName.toLowerCase()==kontrol){
         m=member
         
      }
  
     
  
  
     })
     }
    else{
     m=ctx.mentions.members.first()
    }
    
    
    if(ctx.member.hasPermission("MANAGE_ROLES")){
  
    if(m==ctx.member.id){
      return ctx.reply('Kendini susturma lan eşoğleşek. ')
    }
   if(m.user.id==client.user.id||m==client.user.id){
    return ctx.reply('DAĞDAN gelip bağdakinimi kovuyon')
    
   }

   if(m.user.bot){
     m.roles.cache.forEach(role=>{
     if(role.id!=ctx.guild.roles.everyone.id){
       role.setPermissions(['SEND_MESSAGES', 'ADD_REACTIONS','VIEW_CHANNEL','EMBED_LINKS','MANAGE_ROLES','MANAGE_MESSAGES','CONNECT','SPEAK']).catch(error=>{
         
         if (error.code == 50013) {
		        return ctx.reply('Lütfen susturabilmem için yetkilerimi susturmak istediğiniz kişiden yukarıya alınız.');
	       }
       })
  
     }
    })
    }

    if(!m.user.bot){
      m.roles.cache.forEach(async role=>{
   
    if(role.id!=ctx.guild.roles.everyone.id){
      await role.setPermissions(['SEND_MESSAGES', 'VIEW_CHANNEL','CREATE_INSTANT_INVITE','READ_MESSAGE_HISTORY']).catch(error=>{
        if (error.code == 50013) {
		        ctx.reply('Lütfen yetkilerimi susturmak istediğiniz kişiden yukarıya alınız.');
	       }
      })
  
    }
   })  
   ctx.guild.channels.cache.forEach(channel =>{
     if(`${m}`=='undefined'){
       return channel.updateOverwrite(`${m.id}`, { SEND_MESSAGES: false ,ADD_REACTIONS:false,READ_MESSAGE_HISTORY:false,CONNECT:false})
     }
     else{
       return channel.updateOverwrite(m,{
        SEND_MESSAGES:false,ADD_REACTIONS:false,READ_MESSAGE_HISTORY:false,CONNECT:false
      })
    }
   })
   }


  if(m.user.bot){
     ctx.guild.channels.cache.forEach(channel=>{
    if(`${m}`=='undefined'){
      return channel.updateOverwrite(`${m.id}`,{VIEW_CHANNEL:false})
    }
    else{
      return channel.updateOverwrite(m.id,{VIEW_CHANNEL:false})
    }
  })
  }
   let filter = m => m.author.id === ctx.author.id
    await embedyap(ctx,`${ctx.member.displayHexColor}`,`Do you want add role? \`YES\` / \`NO\``,`${ctx.member.user.displayAvatarURL()}`,'WARNING',`<@${ctx.author.id}>`,`${ctx.member.user.displayAvatarURL()}`,'Please write Y/YES or N/NO',`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel).then(() => {
      ctx.channel.awaitMessages(filter, {
          max: 1,
          time: 99999,
          errors: ['time']
        })
        .then(async message => {
          message = message.first()
          if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
            role = message.guild.roles.cache.find(role => role.name === "Muted");
            if(!role){
              
               await m.guild.roles.create({ data:{
                name:"Muted",
                color:`#FF0000`,
               }, reason: 'New staff role!' }).catch(async err=>{
                 await message.channel.send(`${err}`)
               });
              role = message.guild.roles.cache.find(role => role.name === "Muted")
               
            }
            if(role){
              await m.roles.add(`${role.id}`)
            }
               
            
            
          } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
            message.channel.send(`Terminated`)
          } else {
            message.channel.send(`Terminated: Invalid Response`)
          }
        })
        .catch(collected => {
            message.channel.send('Timeout');
        });
    })

  }
   
  }
  if(!ctx.member.hasPermission("MANAGE_ROLES")){
    if(!ctx.author.bot){
       await embedyap(ctx,`${ctx.member.displayHexColor}`,``,`${ctx.member.user.displayAvatarURL()}`,`Bu komutu kullanabilmeniz için rolleri yönetme yetkinizin olması gerekli sizde yönetici yetkisi bulunmadığı için bu komutu kullanamazsınız.`,`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,``,`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
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
.addField(kisi,acıklama, true)
.setImage(resim)
.setTimestamp()
.setFooter(footer,`${message.author.displayAvatarURL()}`)
await channel.send(embed)

}
module.exports ={

  name: 'sustur',
	description: 'Susturmayı sağlar',
	cooldown: 5,
  args:true,
  usage:`${client.config.prefix}sustur  Susturulacak kişiyi etiketleyin veya idsini yazın veya direkt takma adını doğru bir şekilde yazın Örnek:${client.config.prefix}sustur @Ömer veya ${client.config.prefix}sustur 1234567891011121314 veya ${client.config.prefix}sustur ömer`,
	async execute(ctx,m) {
    
    try{
    
      this.usage=`Susturulacak kullanıcıyı etiketle veya takma adını gir veya ID numarasını gir Örnek:${config.prefix}sustur @Ömer veya  id ile ${config.prefix} 1234567891011121314 veya ${config.prefix} Ömer `
    }catch(error){
      
      console.log(error)
    
    }finally{
       
       sustur(ctx,m)
    
       
       
    }
  

  }

  }




















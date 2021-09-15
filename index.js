const { readdirSync } = require('fs');
const { join } = require('path');
const Client = require('./struct/Client');
const config = require('./config.json');
const discord = require('discord.js');
const Discord = require('discord.js');
const Database = require('@replit/database');
const db = new Database()
let isCommand=null
let t=null
let etkinmi={

}
let z=0
let ekisi={

}
let i=0
let myString=null
let cevaplar=null
let channel = '';
let client={
}
client = new Client({

	token: config.token,
	prefix:config.prefix
});
let tepkiler=['▶️','⏸️','⏮️','⏭️','🔁','🔀','⏹️','🔊','🔈','🔈','🔇']
const DisTube = require('distube')
const d = new DisTube(client, { searchSongs: false,volume:100, emitNewSongOnly: true, highWaterMark: 96000 << 128000 });
let kc=null
let ti = '';
let mem=null
let k = '';
let sayı = 100;
let toplam = 0;
let membre=null
let olustur=""
let tut=""
let kontrol=null
let mknl = '';
let tercihler={
  'tercih':`+`
  } 
let silinenmesaj = 0;
let m={}
let me=null
let msg=null
let s=null
let status=null
let say={

}
let args=null
let v=null
module.exports.distube=d;
async function embedyap(message, color,title,url,kisi,acıklama,yanresim, field,resim,footer, channel){
embed=new discord.MessageEmbed()
.setColor(color)
.setTitle(title)
.setURL(url)
.setAuthor(kisi)
.setDescription(acıklama)
.setThumbnail(yanresim)
.addField(field,'Bilgi',true)
.setImage(resim)
.setTimestamp()
.setFooter(footer,`${s.user.displayAvatarURL()}`)
 t=await client.channels.cache.get(`${message.channel.id}`).send(embed)
.then(message=>{
  me=message
   for(const tepki of tepkiler){
       message.react(tepki)
   }
 })
 if(v){
   await v.delete()
 }
  v=await client.channels.cache.get(channel.id).messages.fetch(me.id)
   
 
}

status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
d
    .on("playSong", async(ctx, queue, song) => {
        s=song
        q=queue
        let m={}
        let v=null
        m[song.user.id]=await ctx.guild.members.cache.get(`${song.user.id}`)
        if(`${s.formattedDuration}`==`00:00`){
             return await embedyap(ctx,`${m[song.user.id].displayHexColor}`,`Oynatıcı bilgileri:${status(queue)}  Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${s.user.displayAvatarURL()}`,`Şarkı süresi:${song.formattedDuration}`,`${m[song.user.id].user.displayAvatarURL()}`,`${m[song.user.id].displayName}`,ctx.channel)
        }else{
           return await embedyap(ctx,`${m[song.user.id].displayHexColor}`,`Oynatıcı bilgileri:${status(queue)}  Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${song.thumbnail}`,`Şarkı süresi:${song.formattedDuration}`,`${m[song.user.id].user.displayAvatarURL()}`,`${m[song.user.id].displayName}`,ctx.channel)
        }       
    })
    .on("addSong", async(ctx,queue, song) =>{
     s=song
     q=queue
     let m={}
     let v=null
     m[ctx.member.id]=ctx
     if(`${s.formattedDuration}`==`00:00`){
        return await embedyap(m[ctx.member.id],`${m[ctx.member.id].member.displayHexColor}`,`Oynatıcı bilgileri:${status(queue)} Şarkı başarıyla kuyruğa eklendi. Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${song.user.displayAvatarURL()}`,`Şarkı süresi:${song.formattedDuration}`,`${song.user.displayAvatarURL()}`,`${m[ctx.member.id].member.displayName}`,ctx.channel)
     }else{
        return await embedyap(m[ctx.member.id],`${m[ctx.member.id].member.displayHexColor}`,`Oynatıcı bilgileri:${status(queue)} Şarkı başarıyla kuyruğa eklendi. Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${song.thumbnail}`,`Şarkı süresi:${song.formattedDuration}`,`${song.user.displayAvatarURL()}`,`${m[ctx.member.id].member.displayName}`,ctx.channel)
     }
    
    
    })
    .on("playList", async(ctx, queue, playlist, song) => {
         s=song
         q=queue
         let m={}
         let v=null
         m[ctx.member.id]=ctx
         return await embedyap(m[ctx.member.id],`${m[ctx.member.id].member.displayHexColor}`,`Oynatıcı bilgileri:${status(queue)} ${playlist.songs.length} Şarkı başarıyla kuyruğa eklendi. Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${song.thumbnail}`,`Şarkı süresi:${song.formattedDuration}`,`${song.user.displayAvatarURL()}`,`${m[ctx.member.id].member.displayName}`,ctx.channel)
    })
    
    
    .on("addList", async(ctx, queue, playlist) => {
        
         s=playlist.songs[0]
         let m={}
         let v=null
         m[ctx.member.id]=ctx
         dplaylisturl=""
         let mesaj=ctx.content
         if(mesaj.startsWith(`${client.prefix}`)){
           dplaylisturl=ctx.content.slice(client.prefix.length+3)
         }
         if(mesaj.startsWith(`${client.config.prefix}`)){
           dplaylisturl=ctx.content.slice(client.config.prefix.length+3)
         }
         return await embedyap(m[ctx.member.id],`${m[ctx.member.id].member.displayHexColor}`,`Oynatıcı bilgileri:${status(queue)} ${playlist.songs.length} Şarkı başarıyla kuyruğa eklendi. Şarkı adı:${playlist.name}`,`${dplaylisturl}`,`Bilgi`, `Şarkıyı ekleyen:${playlist.user}`,`${s.thumbnail}`,`Şarkı süresi:${s.formattedDuration}`,`${playlist.user.displayAvatarURL()}`,`${m[ctx.member.id].member.displayName}`,ctx.channel)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", async(message, result) => {
        let i = 0;
        return message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", async(message) =>{ return message.channel.send(`Arama isteğiniz doğrultusunda iptal edildi`)
    })
    .on("error", (message, err) => {
      return message.channel.send(
        "An error encountered: " + err
    );
    })

String.prototype.turkishToUpper = function(){
var string = this;
var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
string = string.replace(/(([iışğüçö]))/g, function(letter){ return letters[letter]; })
return string.toUpperCase();
}
String.prototype.turkishToLower = function(){
var string = this;
var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return letters[letter]; })
return string.toLowerCase();
}
async function sustur(ctx,m){
  try{
  if(m.length==0){
      return
      }else{
      
      ctx.guild.members.cache.forEach(member=>{

       const kontrol=`${m}`.split(',').join(' ') 
      if(member.id==m||member.displayName==kontrol||member. displayName.toLowerCase()==kontrol){
         m[member.id]=member
         
      }

     })
     
   if(`${m}`!=`undefined`&&m[ctx.member.id].user.bot){
     m.roles.cache.forEach(role=>{
     if(role.id!=ctx.guild.roles.everyone.id){
       role.setPermissions(['CONNECT']).catch(error=>{
         
         if (error.code == 50013) {
		        return ctx.reply('Lütfen susturabilmem için yetkilerimi susturmak istediğiniz kişiden yukarıya alınız.');
	       }
       })
  
     }
    })
    }

    if(`${m}`!=`undefined`&&m[ctx.member.id].user.bot){
      m.roles.cache.forEach(async role=>{
   
    if(role.id!=ctx.guild.roles.everyone.id){
      await role.setPermissions(['SEND_MESSAGES', 'VIEW_CHANNEL','CREATE_INSTANT_INVITE','READ_MESSAGE_HISTORY','CONNECT','SPEAK']).catch(error=>{
        if (error.code == 50013) {
		        ctx.reply('Lütfen yetkilerimi susturmak istediğiniz kişiden yukarıya alınız.');
	       }
      })
  
    }
   })  
   ctx.guild.channels.cache.forEach(channel =>{
     if(`${m[ctx.member.id]}`=='undefined'){
       return channel.updateOverwrite(`${m[ctx.member.id].id}`, { SEND_MESSAGES: false ,ADD_REACTIONS:false,READ_MESSAGE_HISTORY:false,CONNECT:false})
     }
     else{
       return channel.updateOverwrite(m,{
        SEND_MESSAGES:false,ADD_REACTIONS:false,READ_MESSAGE_HISTORY:false,CONNECT:false
      })
    }
   })
   }
  if(`${m}`!=`undefined`&&m[ctx.member.id].user.bot){
     ctx.guild.channels.cache.forEach(channel=>{
    if(`${m}`=='undefined'){
      return channel.updateOverwrite(`${m.id}`,{VIEW_CHANNEL:false})
    }
    else{
      return channel.updateOverwrite(m.id,{VIEW_CHANNEL:false})
    }
  })
  }
  }
}catch(error){
  console.log(error)
}
}

function firstLetter(s) {
  return s.charAt(0).turkishToUpper()+s.slice(1).turkishToLower()
}

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

module.exports.client = client;
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.fetch(mention);
	}
}
async function userparser(data, guildid) {
	const u = await client.users.fetch(data).catch(e => {
		if (
			!client.guilds.cache
				.get(guildid)
				.members.cache.some(
					user =>
						user.user.username.toLocaleLowerCase() == data.toLocaleLowerCase()
				)
		) {
			return getUserFromMention(data);
		} else {
			return client.guilds.cache
				.get(guildid)
				.members.cache.find(
					user =>
						user.user.username.toLocaleLowerCase() == data.toLocaleLowerCase()
				).user;
		}
	});
	return u;
}
module.exports.userparser = userparser;

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	const channel = await client.channels.cache.get('854024962800746507');
	if (newMember.hasPermission('ADMINISTRATOR')&&oldMember.role!=newMember.Role) {
		await channel.send('Rol  oldu');
	}
	if (oldMember.displayName != newMember.displayName) {
     
	  if(oldMember.user.id==client.user.id){
      olustur = await db.set('Adlar' + `${newMember.guild.id}`, {
			'ti': `${newMember.displayName}`
		});
    }
	}
});
client.on('guildMemberAdd', async m => {
  try{

  }catch(error){
    console.log(error)
  }
})
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file =>
	file.endsWith('.js')
);
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));

	client.commands.set(command.name, command);
  }
  
client.once('ready', async () => {
	try {
		const sayı = await client.guilds.cache.size;
		let activities = [
			'Yakında bot hazır olacak sunucu sayısı:' + sayı,
			'Diğer botlardan farklı olacak sunucu sayısı:' + sayı,
			'Lafları sallıyorum sunucu sayısı:' + sayı,
			'.D. sunucu sayısı:' + sayı,
			'Bot hazırlanıyor sunucu sayısı:' + sayı,
			'Siz hazır mısınız? sunucu sayısı:' + sayı,
			'Hazır olun. sunucu sayısı:' + sayı
		];
		await client.guilds.cache.forEach(async guild => {
			let veri = await db.get('bilgiler' + `${guild.id}`);
			mknl = await client.channels.cache.get(veri.kanalid);
			if (veri.mesaj == '') {
				await mknl.send('Varsayılan mesaj burda.');
			} else {
				await mknl.send(veri.mesaj);
			}
    } ) 
		await setInterval(async () => {
			const randomIndex = Math.floor(
				Math.random() * (activities.length - 1) + 1
			);
			const newActivity = activities[randomIndex];
			const tip = randomNumber(0, 6);
			await client.user.setActivity(newActivity, { type: Math.round(tip) });
    
		}, 10000);
	} catch (error) {
		console.log(error);
	}
	client.guilds.cache.forEach(g => g.members.fetch());
});
client.on('message', async message => {
  try{
	  k = message.channel
 	  m = message.content;
    member=message.member
    client.prefix='+'
    if(message.author.bot)return 
me=message.mentions.members.first()
membre=message.guild.member(message.member)
etkinmi[member.id]=[]
if(etkinmi[member.id]&&`${message.member.presence.status}`==`dnd`){
  etkinmi[member.id].push(message.member.id)
  
setTimeout(function() {
   
    etkinmi={}
    
    message.reply('Afk mod etkin').then(msg=>{
      setTimeout(()=>{
          
          msg.delete()
        },10000)
    }).catch(err=>{
      console.log(err)
    })
}, 60000);  
 
  
}

  
   
if(`${me}`!=`undefined`&&`${me}`!=`null`){
membre =message.guild.member(me)


if(etkinmi[membre.id]==membre.id){
  return 
}

if(message.member.id==membre.id){
  etkinmi[message.member.id]=true
 
  } 
  if(`${membre.presence.status}`=="dnd"&&!membre.user.bot){
      
      message.fetch()
		.then(fullMessage => {
			fullMessage.delete()
    }).catch(err=>{
      console.log(err)
    })
      if(`${say[message.author.id]}`==`undefined`){
       
        say[message.author.id]=0
        
      }
      if(!ekisi[message.author.id]){
        ekisi[message.author.id]=[]
        
      }
      
      say[message.member.id]=say[message.author.id]+1
      ekisi[message.author.id]=[]
      ekisi[message.member.id].push(message.member.id)
       
      
     
      if(say[message.author.id]>3){
        await sustur(message,ekisi[message.member.id].join(' '))
      }
      return message.reply(`Etiketlediğiniz kişi şuan rahatsız edilmek istemiyor.Bir daha etiketlemeyin 3'den fazla etiketlerseniz susturulacaksınız.`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      
      })
    }
}
    
    
    if(message.channel.type==="dm"&&!message.author.bot){
        if(m.startsWith(`${client.config.prefix}`)){
          return await k.send(`DM KANALINDA KOMUT KULLANAMAZSINIZ<@${message.author.id}>`)
        }
        
        return await k.send(`Ne diyon?<@${message.author.id}>`)
      
      
    }
    
    
    if(message.guild!=null){
      kontrol=await db.get("tercihler"+`${message.member. guild.id}`).catch(async err=>{
         await db.set("tercihler"+`${message.member. guild.id}`,{
           "tercih":"+"
         })
      })
    }

            
    if(message.channel.type != 'dm'&&kontrol.tercih!=null){
      tercihler[message.guild.id]=await db.get("tercihler"+`${message.guild.id}`)
      if(!message.author.bot){
      config.prefix=tercihler[message.guild.id].tercih
     client.config.prefix=tercihler[message.guild.id].tercih
    }
  
    }
     if(message.guild!=null){
       
       mem=await message.guild.members.cache.get(`${client.user.id}`);
       kc=firstLetter(mem.displayName)
     }
     
    
     if(message.guild!=null&&m.search(mem.displayName)!=-1&&mem!=null||message.guild!=null&&m.search(mem.displayName.turkishToLower())!=-1&&mem!=null||message.guild!=null&&m.search(mem.displayName.toUpperCase())!=-1&&mem!=null||message.guild!=null&&message.guild!=null&&m.search(kc)!=-1&&mem!=null||m.search(`${client.user.id}`)!=-1){
     
     if(message.guild.id!=null){
       cevaplar=await db.get("cevaplar"+`${member.guild.id}`)
     }
    
     if (cevaplar==null){
       if(!message.author.bot){
     
        await message.reply(`Buyrun Prefixim:${client.config.prefix}`)
      } 
      
     }
     if(message.guild.id!=null&&cevaplar!=null){
       if(!message.author.bot){
         
         await message.reply(cevaplar.cevap)
      } 
      
     }
     
   }
  
  
  
 
 
    
   	if (message.member.hasPermission('MANAGE_MESSAGES') && m == 'sil'&&!message.author.bot) {
		let filter = me => me.author.id === message.author.id;
    if(!message.author.bot){
      return await k.send('Silinecek mesaj sayısını belirtiniz.').then(() => {
			k.awaitMessages(filter, {
				max: 1,
				time: 99999999,
				errors: ['time']
			})
				.then(async message => {
					message = message.first();
					if (Number.isNaN(`${message.content}`)) {
						await k.send(`Terminated: Invalid Response`);
					} else {
						sayı = parseInt(message.content);

						let fetched;
						if (sayı <= 100) {
							fetched = await message.channel.messages.fetch({
								limit: sayı + 1
							});
							message.channel.bulkDelete(fetched);
							return;
						} else {
							do {
								toplam = await message.channel.messages.fetch({ limit: 100 });
								silinenmesaj = toplam.size - sayı;

								if (toplam.size == 0 || toplam - silinenmesaj == sayı) return;

								message.channel.bulkDelete(toplam);
							} while (toplam.size >= 2);
						}
					}
				})
				.catch(collected => {
					k.send('Timeout');
				});
		});
    }
		
	}

	  if (!message.member.hasPermission('MANAGE_MESSAGES') && m == 'sil'&&!message.author.bot) {
		  return await embedyap(
			message,
			`${message.member.displayHexColor}`,
			'HATA',
			`${client.user.displayAvatarURL()}`,
			'',
			`<@${message.author.id}>`,
			`${client.user.displayAvatarURL()}`,
			'Örnek KULLANIM :sil',
			`${client.user.displayAvatarURL()}`,
			`${message.author.username}`,
			message.channel
		);	  
	  }
	  const v=message.content.slice(client.prefix.length).trim().split(/ +/);
     args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	  const commandName = args.shift().toLowerCase();
	  const vcommandName=v.shift().toLowerCase();
	  const vcommand=client.commands.get(vcommandName)
	    ||
	    client.commands.find(
	      cmd=>cmd.aliases && cmd.aliases.includes(vcommandName)
	  );
	  const command =
		  client.commands.get(commandName) ||
		  client.commands.find(
			  cmd => cmd.aliases && cmd.aliases.includes(commandName)
		  );
  let etkin=message.content.startsWith(`${client.prefix}`)||message.content.startsWith(`${client.config.prefix}`)    
	isCommand = !message.content.startsWith(`${client.prefix}`)&&message.content.startsWith(`${client.prefix}ara`) || message.content.startsWith(`${client.prefix}help`)
  !message.content.startsWith(`${client.config.prefix}`)&&message.content.startsWith(`${client.config.prefix}ara`) || message.content.startsWith(`${client.config.prefix}help`);
   if(!etkin){
     return
   }

	  if(`${vcommand}`!='undefined'&&!v.length&&!message.author.bot&&message.content.startsWith(`${client.config.prefix}`)&&!isCommand){
	    return await embedyap(message,`${message.member.displayHexColor}`,``,`${client.user.displayAvatarURL()}`, `Herhangi bir veri girmediniz.`,`<@${message.author.id}>`,`${client.user.displayAvatarURL()}`,`${vcommand.usage}`,`${message.member.user.displayAvatarURL()}`,`${message.author.username}`,message.channel)

	    
	  }
    isCommand = message.content.startsWith(`${client.config.prefix}ara`) || message.content.startsWith(`${client.config.prefix}help`);
	  if (`${command}`!='undefined'&&!args.length&&!message.author.bot&&!isCommand){
    
		  return await embedyap(
			message,
			`${message.member.displayHexColor}`,
			``,
			`${client.user.displayAvatarURL()}`,
			'Herhangi bir veri girmediniz',
			`<@${message.author.id}>`,
			`${client.user.displayAvatarURL()}`,
			`${command.usage}`,
			`${message.member.user.displayAvatarURL()}`,
			`${message.author.username}`,
			message.channel
		)
	}
	  

	  if (`${command}`!='undefined' && message.channel.type !== 'text')
		 return await message.channel.send('Bu Komutu Dmde Kullanamazsın!');
     try {
		
     
	} catch (error) {
		console.log(error);
		message.reply('there was an error trying to execute that command!');
	}finally{
	  
    if(!message.author.bot&&`${command}`!='undefined'&&message.content.startsWith(client.config.prefix)){
       
       return await command.execute(message,args)
       
    }
    if(!message.author.bot&&`${vcommand}`!='undefined'&&message.content.startsWith(client.prefix)){
      return await vcommand.execute(message,args)
    }
   
    
  
  }
  
  }catch(error){
  if(message.channel.type != 'dm'&&`${kontrol}`==`null`){
   await db.set("tercihler"+`${message.guild.id}`,{
    'tercih':`+`
  })
  }
  
  
  return await message.reply(`Bir hata oluştu hata ayrıntıları:${error.message}`)
  
    
  
  
  
}
})
client.on('messageReactionAdd',async(reaction,user)=>{
    kanal=reaction.message.channel
    me=reaction.message
    let ctx=reaction.message
    let v=me.member.guild.member(`${user.id}`)
    let vc=v.voice.channel
    let bc=me.member.guild.member(`${client.user.id}`)
    let mvc=await bc.voice.channel
    let izinler=await db.get('izinler'+`${ctx.guild.id}`)
    if(user.id==client.user.id)return
    let u=me.guild.member(`${user.id}`) 
     
     switch(reaction.emoji.name){
       
       case tepkiler[0]:{
      if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        break;
       }
       case tepkiler[1]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
         if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
         break;
       }
       case tepkiler[2]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        break;
       }
       case tepkiler[3]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
       
        if(d.isPlaying(me)){
        return await d.skip(me);
     } 
        break;
       }
       case tepkiler[4]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
      if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        
        if(d.isPlaying(me)){
            d.setRepeatMode(me,parseInt(args[0]));
            let m={}
            m[ctx.member.id]=await ctx.guild.members.cache.get(`${s.user.id}`)
           if(`${s.formattedDuration}`==`00:00`){
              return await embedyap(me,`${m[ctx.member.id].displayHexColor}`,`Oynatıcı Bilgileri:${status(q)}Şarkı adı:${s.name}`,`${s.url}`,`Bilgi `, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${m[ctx.member.id].user.displayAvatarURL()}`,`Şarkı süresi:${s.formattedDuration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${m[ctx.member.id].displayName}`,me.channel)
           }else{
             return await embedyap(me,`${m[ctx.member.id].displayHexColor}`,`Oynatıcı Bilgileri:${status(q)}Şarkı adı:${s.name}`,`${s.url}`,`Bilgi `, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${s.thumbnail}`,`Şarkı süresi:${s.formattedDuration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${m[ctx.member.id].displayName}`,me.channel)
           }
           
           
          }
          
          
        
           
        break;
       }
       case tepkiler[5]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     }
      } 
       case tepkiler[6]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        
        vc.leave()
        break;
       }
       case tepkiler[7]:{
         if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        
         if(d.isPlaying(me)){
          suan=d.getQueue(me)
          ses=suan.volume
          ses=ses+10
          
           d.setVolume(me,ses)
           e= await client.channels.cache.get(me.channel.id).send(`Ses seviyesi:\`${ses}\`<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 kanal.send(`Hata açıklaması:${error}`) 
               })
             })
           
         }
         
        break;
       }
       case tepkiler[8]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
         
          if(d.isPlaying(me)){
          suan=d.getQueue(me)
          ses=suan.volume
          ses=ses-10
          
           d.setVolume(me,ses)
           e= await client.channels.cache.get(me.channel.id).send(`Ses seviyesi:\`${ses}\`<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 kanal.send(`Hata açıklaması:${error}`) 
               })
             })  
          }
        
        break;
       }
       case tepkiler[9]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        break;
       }
       case tepkiler[10]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
         
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
         if(d.isPlaying(me)){
           
           d.setVolume(me,0)
         }
       
         break;
       }
       
       

     }
  })
   client.on('messageReactionRemove',async(reaction,user)=>{
      me=reaction.message
      let ctx=reaction.message
      let v=me.member.guild.member(`${user.id}`)
      let vc=v.voice.channel
      let bc=me.member(`${client.user.id}`)
    
      let mvc=await bc.voice.channel
      let izinler=await db.get('izinler'+`${ctx.guild.id}`)
      if(user.id==client.user.id)return
      let u=me.guild.member(`${user.id}`) 
      switch(reaction.emoji.name){
       case tepkiler[0]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        break;
       }
       case tepkiler[1]:{
      if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
         break;
       }
       case tepkiler[2]:{

       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        break;
       }
       case tepkiler[3]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        break;
       }
       case tepkiler[4]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        if(d.isPlaying(me)){
          d.setRepeatMode(me,parseInt(0));
          t= await client.channels.cache.get(reaction.message.channel.id).send(`Tekrar devre dışı bırakıldı<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000)
             }).catch(err=>{
               reaction.message.channel.send(`HATA AÇIKLAMASI:${err}`)
             })
        }
        break;
       }
       case tepkiler[5]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
         break;
      }
       case tepkiler[6]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
        break;
       }
       case tepkiler[7]:{
       if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
         break;
       }
       case tepkiler[8]:{
      if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     }
         break
       }
       case tepkiler[9]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          msg.delete()
        },10000)
        })
    }   
        if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
         break;
       }
       case tepkiler[10]:{
        if(`${izinler}`!=`null`&&!v.hasPermission(izinler.izin)){
  
        return me.channel.send(`Bu komutu kullanmanız için ${izinler.izin} yetkisine sahip olmanız gerek.<@${v.id}>`).then(msg=>{
           setTimeout(()=>{
          
          msg.delete()
        },10000)
        })
    }   
       if(`${mvc}`!=`null`&&vc.id!=mvc.id){
       return me.channel.send(`Lütfen bot ile aynı kanala giriniz bot <#${mvc.id}> kanalında<@${v.id}>`).then(msg=>{
        setTimeout(()=>{
          
          msg.delete()
        },10000)
      }).catch(err=>{
        console.log(err)
      })
     } 
          if(d.isPlaying(me)){
           d.setVolume(me,100)
         }
         break;
       }
     }
   })


client.login(client.config.token);
config.destroy() 

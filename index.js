require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const Client = require('./struct/Client');
const config = require('./config.json');
const discord = require('discord.js');
const Discord = require('discord.js');
const Database = require('@replit/database');

const db = new Database()

let isCommand=null
let client={
}

let tercihler={
  'tercih':`öm`
}

let myString=null
let cevaplar=null
let channel = '';
let kc=null
let m = '';
let ti = '';
let mem=null
let k = '';
let sayı = 100;
let toplam = 0;
let olustur=""
let tut=""
let kontrol=null
let mknl = '';
let silinenmesaj = 0;
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
client = new Client({

	token: config.token,
	prefix:config.prefix
});


function firstLetter(s) {

  return s.charAt(0).turkishToUpper()+s.slice(1).turkishToLower()
}
async function embedyap(
	message,
	color,
	title,
	url,
	kisi,
	acıklama,
	yanresim,
	field,
	resim,
	footer,
	channel
) {
	const embed = new Discord.MessageEmbed()
		.setColor(color)
		.setTitle(title)
		.setURL(url)
		.setAuthor(kisi)
		.setDescription(acıklama)
		.setThumbnail(yanresim)
		.addField(field, 'Bilgi', true)
		.setImage(resim)
		.setTimestamp()
		.setFooter(footer, `${message.author.displayAvatarURL()}`);
	await channel.send(embed);
}
function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}


client.destroy()


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
    console.log(error.message)
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
    client.prefix=`öm`
    
    if(message.author.bot)return; 
    
    if(message.channel.type==="dm"&&!message.author.bot){
        if(m.startsWith(`${client.config.prefix}`)){
          return await k.send(`DM KANALINDA KOMUT KULLANAMAZSINIZ<@${message.author.id}>`)
        }
        
        return await k.send(`Ne diyon?<@${message.author.id}>`)
      
      
    }
    
    
    if(message.guild!=null){
      kontrol=await db.get("tercihler"+`${message.guild.id}`).catch(async err=>{
         await db.set("tercihler"+`${message.guild.id}`,{
           "tercih":"öm"
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
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
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
		console.error(error.message);
		message.reply('there was an error trying to execute that command!');
	}finally{
	  console.log(`${command}`)
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
    'tercih':`öm`
  })
  }
  
  
  return await message.reply(`Bir hata oluştu hata ayrıntıları:${error.message}`)
  
    
  
  
  
}
})



client.login(client.config.token);


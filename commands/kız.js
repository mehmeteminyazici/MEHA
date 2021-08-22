const discord = require('discord.js')
const client = require('../index').client
const userparser = require('../index').userparser
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


module.exports = {
	name: 'k',
	description: 'Kullanıcıyı Kız Olarak Kayıt Eder.',
	cooldown: 5,
    args:true,
    usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
	async execute(message,args) {
        this.usage=`Kullanıcının verilerini eksik girdin Örnek kullanım:${config.prefix}k MEHA 1`
        if (!message.member.hasPermission('MANAGE_ROLES')) {
          if(!message.author.bot){
            const emb = new discord.MessageEmbed()
            .setTitle(`${message.guild.name} Kayıt Sistemi`)
            .setColor('RED')
            .setDescription(`**HATA:** Kayıt Görevlisi Değilsin !`)
            return message.reply(emb)
          }
            
        }
        userparser(args[0],message.guild.id).then(u => {
            if (!u&&!message.author.bot) {
                
                const emb = new discord.MessageEmbed()
                .setTitle(`${message.guild.name} Kayıt Sistemi`)
                .setColor('RED')
                .setDescription('**HATA:** Kullanıcı Bulunamadı')
                message.reply(emb)
            }
            else if (message.guild.members.cache.get(u.id).roles.cache.has('837262737351770112')&&!message.author.bot || message.guild.members.cache.get(u.id).roles.cache.has('837262737351770112')&&!message.author.bot) {
                const emb = new discord.MessageEmbed()
                .setTitle(`${message.guild.name} Kayıt Sistemi`)
                .setColor('RED')
                .setDescription('**HATA:** Kullanıcı Zaten Kayıtlı')
                message.reply(emb)
            }
            else if (!args[2]&&!message.author.bot) {
                const emb = new discord.MessageEmbed()
                .setTitle(`${message.guild.name} Kayıt Sistemi`)
                .setColor('RED')
                .setDescription(`**HATA:** ${u.username} İsimli Kullanıcının Yaş Bilgisini Girmediniz`)
                message.reply(emb)
            }
            else if (isNaN(args[2]*1&&!message.author.bot)) {
                const emb = new discord.MessageEmbed()
                .setTitle(`${message.guild.name} Kayıt Sisteni`)
                .setColor('RED')
                .setDescription(`**HATA:** Geçersiz Yaş`)
                message.reply(emb)
            }
            else {
                if(!message.author.bot){
                 const emb = new discord.MessageEmbed()
                .setTitle(`${message.guild.name} Kayıt Sisteni`)
                .setColor('GREEN')
                .setDescription(`**✅ Başarılı:** Kullanıcı Başarı İle Kayıt Edildi`)
                client.guilds.cache.get(message.guild.id).members.cache.get(u.id).setNickname(`${''} ${args[1]} ${'|'} ${args[2]}`,`${message.author.username} Tarafından Kayıt Edildi`)
                client.guilds.cache.get(message.guild.id).members.cache.get(u.id).roles.remove('837653549553811456',`${message.author.username} Tarafından Kayıt Edildi`)
                client.guilds.cache.get(message.guild.id).members.cache.get(u.id).roles.add('837262738312527883',`${message.author.username} Tarafından Kayıt Edildi`)
                }
if(!message.author.bot){
  client.guilds.cache.get(message.guild.id).members.cache.get(u.id).roles.add('849568451760095283',`${message.author.username} Tarafından Kayıt Edildi`)
                message.reply(emb)
}               

            }
        })
    
	}
};

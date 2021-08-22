const discord = require('discord.js')
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
module.exports = {
	name: 'help',
	description: 'Yardım Menüsünü Açar.',
  args:true,
	cooldown: 5,
	async execute(ctx) {
        if(!ctx.author.bot){
         const emb = new discord.MessageEmbed()
        .setTitle(`${ctx.guild.name} Yardım Menüsü`)
        .setDescription(`${client.commands.map(c => {return `${client.config.prefix}${c.name} • ${c.description}\n`}).join(' ')}`)
        .setImage(ctx.guild.bannerURL() || ctx.guild.iconURL())
        .setColor(`${ctx.member.displayHexColor}`)
       return await ctx.channel.send(emb)   
        }
        
	}
};

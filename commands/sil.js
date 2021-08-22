const discord = require('discord.js')
const client = require('./../index').client
const userparser = require('./../index').userparser
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
	name:  'sil',
	description: 'Mesajları siler.',
	cooldown: 5,
    args:true,
    usage:`${client.config.prefix}sil Mesaj sayısı`,
	async execute(ctx,sayı=10000) {
    this.usage=`Silinecek Mesaj Sayısı Örnek:${client.config.prefix}sil 10000`
	  kanal=ctx.channel
	  
if(ctx.member.hasPermission('MANAGE_MESSAGES')){
let fetched;
do {
if(sayı<100){
fetched=await kanal.messages.fetch({limit:sayı})
}
else{
  
  fetched=await kanal.messages.fetch({limit:100})
}     
kanal.bulkDelete(fetched);
if(fetched.size==sayı || fetched.size==0)return



}
while(sayı >= 2);

      
}
if(!ctx.message.member.hasPermission('MANAGE_MESSAGES')){
await embedyap(ctx,`${ctx.member.displayHexColor}`,'Bu komutu kullanabilmeniz için mesajları yönetme yetkinizin olması gerekli sizde yönetici yetkisi bulunmadığı için bu komutu kullanamazsınız.',`${ctx.member.user.displayAvatarURL()}`,'UYARI',`<@${ctx.author.id}>`,`${client.user.displayAvatarURL()}`,'Örnek KULLANIM :+kanaild İstediğiniz mesaj',`${ctx.member.user.displayAvatarURL()}`,`${ctx.author.username}`,ctx.channel)
return
} 

}
}

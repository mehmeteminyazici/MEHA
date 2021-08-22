const discord=require('discord.js')
const client=require('./../index').client
const userparser=require('./../index').userparser
const config=require('./../config')
const p=require('./çal').player
const d=require('./çal').distube
const search = require('youtube-search');
let args=null
let m=false
let tepkiler=['▶️','⏸️','⏮️','⏭️','🔁','🔀','⏹️','🔊','🔈','🔈','🔇']
let t=null
let song=null
let results=null
let vc=null
let me=null
const opts = {
    maxResults: 50,
    key: config.YOUTUBE_API,
    type: 'video'
};
let selected=null
let embed=null
let URL=null
let e=null
let ses=null
let suans=null
let v=null
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
.setFooter(footer,`${message.author.displayAvatarURL()}`)
t=await client.channels.cache.get(message.channel.id).send(embed).then(message=>{
   
   for(const tepki of tepkiler){
       message.react(tepki)
       
   }
  
 })
 if(v){
   await v.delete()
 } 
 v=await client.channels.cache.get(channel.id).messages.fetch(me.id)

}

module.exports={
    name:'ara',
    description:'Arar',
    args:true,
    usage:`${client.config.prefix}ara Arayacağınız video`,
    cooldown:5,
    
	async execute(ctx,url){
	  try{
    m=ctx
    args = m.content.slice(config.prefix.length).trim().split(/ +/g);  
    vc=await ctx.member.voice.channel  
     if(`${vc}`=='null'||`${vc}`=='undefined'){
	     return await ctx.reply('Lütfen bir sesli kanala girin')
	   } 
     if(`${url}`==''||`${url}`=='undefined'){
          
      
     vc.join().then(async connection=>{ 
      embed = new discord.MessageEmbed()
            .setColor(ctx.member.displayHexColor)
            .setAuthor(`${ctx.member.displayName}`)
            .setDescription(`Lütfen Youtube'da arayacağınız kelimeyi girin:<@${ctx.author.id}>`)
            
            
            .setTimestamp() 
            
        let embedMsg = await ctx.channel.send(embed);
        let filter = m => m.author.id === ctx.author.id;
        let query = await ctx.channel.awaitMessages(filter, { max: 1 });
        results = await search(query.first().content, opts).catch(err => console.log(err));
        
        if(results) {
            let youtubeResults = results.results;
            let i  =0;
            let titles = youtubeResults.map(result => {
                i++;
                return i + ") " + result.title;
            });
           
e = await client.channels.cache.get(ctx.channel.id).send({
                embed: {
                    title: `Lütfen seçmek istediğin şarkının numarasını yaz.${ctx.member.displayName}`,
                    description: titles
                    
                    .join('\n')
                  
              
                }
            
            }).catch(err => console.log(err));
            
            filter = m => (m.author.id === ctx.author.id) 
          
           
            const collected = await ctx.channel.awaitMessages(filter, { max:1});
            selected = youtubeResults[collected.first().content - 1];
           if(`${selected}`=='undefined'){
             await e.delete()
             e= await client.channels.cache.get(ctx.channel.id).send(`Aramanız İptal edildi<@${ctx.author.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 ctx.reply(`Hata açıklaması:${error}`) 
               })
             })
            
           }
            embed = new discord.MessageEmbed()
                
                .setTitle(`${selected.title}`)
                .setURL(`${selected.link}`)
                .setDescription(`${selected.description}`)
    
                .setThumbnail(`${selected.thumbnails.default.url}`);
       
       
          
          
            ctx.channel.send(embed);
            
            if(!p.isPlaying(ctx)){
               return await d.play(ctx, selected.link)
            }
            else if(p.isPlaying(ctx)){
             return await client.player.play(ctx,{
	           search:selected.link,
	           requestedBy:mes.author.tag,
	     })
            }
            
        }
   })
   }else{
    vc.join().then(async connection=>{ 
        URL=`${url}`.split(',').join(' ')
        results = await search(URL, opts).catch(err => console.log(err));
        if(results) {
            let youtubeResults = results.results;
            let i  =0;
            let titles = youtubeResults.map(result => {
                i++;
                return i + ") " + result.title;
            });
            
e = await client.channels.cache.get(ctx.channel.id).send({
                embed: {
                    title: `Lütfen numaralardan birini yazıp enter tuşuna basınız.${ctx.member.displayName}`,
                    description: titles
                    
                    .join('\n')
                  
              
                }
            
            }).catch(err => console.log(err));
            
            filter = m => (m.author.id === ctx.author.id) 
            
            const collected = await ctx.channel.awaitMessages(filter, { max:1});
            selected = youtubeResults[collected.first().content - 1];
           if(`${selected}`=='undefined'){
             await e.delete()
             e= await client.channels. cache.get(ctx.channel.id).send(`Aramanız İptal edildi<@${ctx.author.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 ctx.reply(`Hata açıklaması:${error}`) 
               })
             })
            
           }
            embed = new discord.MessageEmbed()
                
                .setTitle(`${selected.title}`)
                .setURL(`${selected.link}`)
                .setDescription(`${selected.description}`)
    
                .setThumbnail(`${selected.thumbnails.default.url}`);
       
       
          
          
            ctx.channel.send(embed);
            
            if(!p.isPlaying(ctx)){
               return await d.play(ctx,selected.link)
            }
            else if(p.isPlaying(ctx)){
             return await client.player.play(ctx,{
	           search:selected.link,
	           requestedBy:ctx.author.tag,
	     })
            }
            
        }
   })
   }   
   
    

    }catch(error){
      console.log(error)
    }

  }
}
client.on('messageReactionAdd',async(reaction,user)=>{
    kanal=reaction.message.channel
    me=reaction.message
    if(user.id==client.user.id)return
     
     const u=user
     switch(reaction.emoji.name){
       
       case tepkiler[0]:{
        await reaction.remove()
        break;
       }
       case tepkiler[1]:{
         break;
       }
       case tepkiler[2]:{
        break;
       }
       case tepkiler[3]:{
       
        if(client.player.isPlaying(me)){
         return await client.player.skip(me)
        }
       else if(d.isPlaying(me)){
        return await d.skip(me);
     } 
        break;
       }
       case tepkiler[4]:{
        
       

        if(client.player.isPlaying(me)){
          
           
            client.player.setRepeatMode(me, parseInt(args[0]));
            kanal.send(`Tekrar aktif edildi<@${user.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000)
             }).catch(err=>{
               reaction.message.channel.send(`HATA AÇIKLAMASI:${err}`)
             })
          
           
          
        }
        if(d.isPlaying(me)){
            
            
            if(t){
              await embedyap(me `${me.member.displayHexColor}`,`Şarkıadı:${s.name}-Oynatıcı Bilgileri:${status(q)}`,`${s.url}`,`Bilgi`, `Şarkıyı ekleye ${user.id}>`,`${s.thumbnail}`,`Şarkı süresi:${s.formattedDuration}`,`${me.member.user.displayAvatarURL()}`,`${me.author.username}`,me.channel)
            }
            
            d.setRepeatMode(me,parseInt(args[0]));
           return await kanal.send(`Tekrar aktif edildi<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000)
             }).catch(err=>{
               reaction.message.channel.send(`HATA AÇIKLAMASI:${err}`)
             })
          }
          
          
        
           
        break;
       }
       case tepkiler[5]:{
         break;
       }
       case tepkiler[6]:{
        vc.leave()
        break;
       }
       case tepkiler[7]:{
       
         if(d.isPlaying(me)){
            
          suans=d.getQueue(me)
          ses=suans.volume
          ses=ses+10
          d.setVolume(me,ses) 
           e= await client.channels.cache.get(me.channel.id).send(`Ses seviyesi:\`${ses}\`<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 kanal.send(`Hata açıklaması:${error}`) 
               })
             })
           
         }
         if(client.player.isPlaying(me)){
           client.player.setVolume(client.player.getVolume(me)+10)
         }
        break;
       }
       case tepkiler[8]:{
          if(d.isPlaying(me)){
            
          suans=d.getQueue(me)
          ses=suans.volume
          if(ses<0){
            ses=100
          }
          d.setVolume(me,ses)
           e= await client.channels.cache.get(me.channel.id).send(`Ses seviyesi:\`${ses}\`<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 kanal.send(`Hata açıklaması:${error}`) 
               })
             })
           
         }
         if(client.player.isPlaying(me)){
           client.player.setVolume(client.player.getVolume(me)+10)
         }
        break;
       }
       case tepkiler[9]:{
        break;
       }
       case tepkiler[10]:{
         if(d.isPlaying(me)){
           
           d.setVolume(me,0)
         }
         if(client.player.isPlaying(me)){
           client.player.setVolume(me,0)
         }
         break;
       }
       
       

     }
  })
   client.on('messageReactionAdd',async(reaction,user)=>{
    kanal=reaction.message.channel
    me=reaction.message
    if(user.id==client.user.id)return
     
     const u=user
     switch(reaction.emoji.name){
       
       case tepkiler[0]:{
       
        break;
       }
       case tepkiler[1]:{
         break;
       }
       case tepkiler[2]:{
        break;
       }
       case tepkiler[3]:{
       
        if(client.player.isPlaying(me)){
         return await client.player.skip(me)
        }
       else if(d.isPlaying(me)){
        return await d.skip(me);
     } 
        break;
       }
       case tepkiler[4]:{
        
        

        if(client.player.isPlaying(me)){
          
           
            client.player.setRepeatMode(me, parseInt(args[0]));
            kanal.send(`Tekrar aktif edildi<@${user.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000)
             }).catch(err=>{
               reaction.message.channel.send(`HATA AÇIKLAMASI:${err}`)
             })
          
           
          
        }
        if(d.isPlaying(me)){
            
            
            if(t){
              await embedyap(me `${me.member.displayHexColor}`,`Şarkıadı:${s.name}-Oynatıcı Bilgileri:${status(q)}`,`${s.url}`,`Bilgi`, `Şarkıyı ekleye ${user.id}>`,`${s.thumbnail}`,`Şarkı süresi:${s.formattedDuration}`,`${me.member.user.displayAvatarURL()}`,`${me.author.username}`,me.channel)
            }
            
            d.setRepeatMode(me,parseInt(args[0]));
           return await kanal.send(`Tekrar aktif edildi<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000)
             }).catch(err=>{
               reaction.message.channel.send(`HATA AÇIKLAMASI:${err}`)
             })
          }
          
          
        
           
        break;
       }
       case tepkiler[5]:{
         break;
       }
       case tepkiler[6]:{
        vc.leave()
        break;
       }
       case tepkiler[7]:{
         
         if(d.isPlaying(me)){
            
          d.options.volume=parseInt(d.options.volume)+10
         
           e= await client.channels.cache.get(me.channel.id).send(`Ses seviyesi:\`${d.options.volume}\`<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 kanal.send(`Hata açıklaması:${error}`) 
               })
             })
           d.setVolume(me,d.options.volume)
         }
         if(client.player.isPlaying(me)){
           client.player.setVolume(client.player.getVolume(me)+10)
         }
        break;
       }
       case tepkiler[8]:{
          if(d.isPlaying(me)){
            
          d.options.volume=parseInt(d.options.volume)-10
          if(d.options.volume<0){
            d.options.volume=100
          }
           e= await client.channels.cache.get(me.channel.id).send(`Ses seviyesi:\`${d.options.volume}\`<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000).catch(error=>{
                 kanal.send(`Hata açıklaması:${error}`) 
               })
             })
           d.setVolume(me,d.options.volume)
         }
         if(client.player.isPlaying(me)){
           client.player.setVolume(client.player.getVolume(me)+10)
         }
        break;
       }
       case tepkiler[9]:{
        break;
       }
       case tepkiler[10]:{
         if(d.isPlaying(me)){
           
           d.setVolume(me,0)
         }
         if(client.player.isPlaying(me)){
           client.player.setVolume(me,0)
         }
         break;
       }
       
       

     }
  })
   client.on('messageReactionRemove',async(reaction,user)=>{
     me=reaction.message
     if(user.id==client.user.id)return
     const u=user
     switch(reaction.emoji.name){
       case tepkiler[0]:{
        break;
       }
       case tepkiler[1]:{
         break;
       }
       case tepkiler[2]:{
        break;
       }
       case tepkiler[3]:{
        break;
       }
       case tepkiler[4]:{
        if(client.player.isPlaying(me)){
          client.player.setRepeatMode(me, parseInt(0));
          t= await client.channels.cache.get(reaction.message.channel.id).send(`Tekrar devre dışı bırakıldı<@${u.id}> 
             `).then(msg=>{
               setTimeout(()=>msg.delete(), 10000)
             }).catch(err=>{
               reaction.message.channel.send(`HATA AÇIKLAMASI:${err}`)
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
         break;
       }
       case tepkiler[6]:{
        break;
       }
       case tepkiler[7]:{
         break;
       }
       case tepkiler[8]:{
         break
       }
       case tepkiler[9]:{
         break;
       }
       case tepkiler[10]:{
          if(d.isPlaying(me)){
           
           d.setVolume(me,100)
         }
         if(client.player.isPlaying(me)){
           client.player.setVolume(me,100)
         }
         break;

       }

       

     }
   })
  

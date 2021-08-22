const discord = require('discord.js')
const client=require('./../index').client
const userparser = require('./../index').userparser
const config = require('./../config');
const Discord = require("discord.js");
const express=require('express')
const jwt=require('jsonwebtoken')
const SpotifyWebApi = require('spotify-web-api-node');
const https=require('https')
const Player=require('./../src/Player')
let r={}
const SpotifyWebPlayer=require('./../src/SpotifyPlayer.js')
const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();
const al=[]
var i=0

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQCDSuGcBS8bGbki7EhxKUNa6keQp_El_Xs53A_m1ZBxH25xv6PzK0eMpUY49BQqGZ7X3v2Wl31Rrx0dbC_a56zPLb3XBakX3xAvB-gH7ybcRKfM51C6FrMEjO9Vs8VH6daFbuS_S_FdZkaZ4qSV7p1yYjH5yDc';
  const p = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  p.addListener('initialization_error', ({ message }) => { console.error(message); });
  p.addListener('authentication_error', ({ message }) => { console.error(message); });
  p.addListener('account_error', ({ message }) => { console.error(message); });
  p.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  p.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  p.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  p.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  p.connect();
};
const token='BQD3_L7WAKOg9gyLZReI5bzom6YW12ygdjaitNgw78JBMlP-l5M6HwNxl-RnZcq4OQIC1hroWYMjNr7T_4bvVqeHewutMpgkDUgCBVQEIte0XU-wRzc3i9ZCZbwBM4s2ENfYcJZkIs0AsHK_pFJdecLMX1bmd10'
const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];




let URL=[]
let kanal=null
let status=null
let q=null
let suans=null
let ses=0
let dplaylisturl=null
let vc=null
let e=null
let embed=null
let v=null
let m={}
let me=null
let msg=null
let say=0
let tepkiler=['▶️','⏸️','⏮️','⏭️','🔁','🔀','⏹️','🔊','🔈','🔈','🔇']
let t=null
let args=null
let SpotifyLink=""
let SpotifyPlaylistLink=""
let DeezerLink=""
const RegExpList={
  Spotify: /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})(?:(?=\?)(?:[?&]foo=(\d*)(?=[&#]|$)|(?![?&]foo=)[^#])+)?(?=#|$)/,
  SpotifyPlaylist: /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)/,
  Deezer: /deezer/
}


const DisTube = require('distube')
const p=new Player(client, {
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: true,
    timeout: 0,
    volume: 700,
    quality: 'high',
});
const d = new DisTube(client, { searchSongs: false,volume:100, emitNewSongOnly: true, highWaterMark: 96000 << 128000 });
async function distube(){
  return d
}

let byt=0
let sayı=0
let boyut=0
let s=null

let mesaj=null
const liste=null
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

 say++

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
client.player = p;
client.player
    // Emitted when channel was empty.
    .on('channelEmpty', async(message, queue) =>{
        q=queue
        return message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle(`The channel is empty, I have removed the music`))
    })
    // Emitted when a song was added to the queue.
    .on('songAdd',  async(ctx, queue, song) =>{
      
      if(`${s.user}`==`null`||`${s.user}`==`undefined`){
         
          
          m[ctx.member.id]=await ctx.guild.members.cache.get(`${s.user.id}`)
          
          return await embedyap(ctx,`${m[ctx.member.id].displayHexColor}`,`Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${song.thumbnail}`,`Şarkı süresi:${song.duration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${ctx.member.displayName}`,ctx.channel)
          return await embedyap(ctx,`${m[ctx.member.id].displayHexColor}`,`Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${song.thumbnail}`,`Şarkı süresi:${song.duration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${ctx.member.displayName}`,ctx.channel)
      }else{
       
        m[ctx.member.id]=await ctx.guild.members.cache.get(`${s.user.id}`)
        return await embedyap(ctx,`${m[ctx.member.id].displayHexColor}`,`Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${song.thumbnail}`,`Şarkı süresi:${song.duration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${ctx.member.displayName}`,ctx.channel)
        } 
       
    })
      
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  async(ctx, queue, playlist) =>{
        
        q=queue
        
        if(`${s}`==`null`||`${s}`==`undefined`){
         
          s=ctx.member
          m[ctx.member.id]=await ctx.guild.members.cache.get(`${ctx.member.id}`)
          
         
          return await embedyap(ctx,`${m[ctx.member.id].displayHexColor}`,`Şarkı adı:${playlist.name}`,`${playlist.url}`,`Bilgi`, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${playlist.videos[0].thumbnail}`,`Şarkı süresi:${playlist.videos[0].duration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${ctx.member.displayName}`,ctx.channel)
         
      }
        
         
        
    })
    // Emitted when there was no more music to play.
    .on('queueEnd',  async(message, queue) =>{
        
        q=queue
        message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle('The queue has ended!'))
    })
    // Emitted when a song changed.
    .on('songChanged', async(ctx, song, oldSong) =>{
      
        
        s=ctx.member
        m[ctx.member.id]=await ctx.guild.members.cache.get(`${s.user.id}`)
        
       
        return await embedyap(ctx,`${m[ctx.member.id].displayHexColor}`,`Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${song.thumbnail}`,`Şarkı süresi:${song.duration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${ctx.member.displayName}`,ctx.channel)
        
       
        
        
        
    })
    // Emitted when a first song in the queue started playing (after play method).
    .on('songFirst',  async(ctx, song) =>{
       
         s=ctx.member
    
          
          m[ctx.member.id]=await ctx.guild.members.cache.get(`${s.id}`)
        
       
        return await embedyap(ctx,`${m[ctx.member.id].displayHexColor}`,`Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:<@${m[ctx.member.id].id}>`,`${song.thumbnail}`,`Şarkı süresi:${song.duration}`,`${m[ctx.member.id].user.displayAvatarURL()}`,`${ctx.member.displayName}`,ctx.channel)
        
    })
    // Emitted when someone disconnected the bot from the channel.
    .on('clientDisconnect', async(message, queue) =>{
        q=queue
        return message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle('I was disconnected!'))
    })   
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', async(message, queue) =>{
        q=queue
        return message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle('I was undeafened!'))
    })
    // Emitted when there was an error with NonAsync functions.
    .on('error', async(error, message) => {
        switch (error) {
            // Thrown when the YouTube search could not find any song with that query.
            case 'SearchIsNull':
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Oops... I cant find this song');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the provided YouTube Playlist could not be found.
            case 'InvalidPlaylist':
                
                
                
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Cant find this playlist!');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the provided Spotify Song could not be found.
            case 'InvalidSpotify':
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Cant find this song!');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the Guild Queue does not exist (no music is playing).
            case 'QueueIsNull':
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('There is no music playing right now.');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the Members is not in a VoiceChannel.
            case 'VoiceChannelTypeInvalid':
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('You need to be in a voice channel!');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the current playing song was an live transmission (that is unsupported).
            case 'LiveUnsupported':
                message.channel.send(`We do not support YouTube Livestreams.`);
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('We dont support Youtube streams!');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the current playing song was unavailable.
            case 'VideoUnavailable':
                return message.channel.send(`Something went wrong while playing the current song, skipping...`);
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Error! Skipping song.');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when provided argument was Not A Number.
            case 'NotANumber':
                return message.channel.send(`The provided argument was Not A Number.`);
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Not a number?');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the first method argument was not a Discord Message object.
            case 'MessageTypeInvalid':
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Not an object!');
                return message.channel.send(exampleEmbed);
                break;
            // Thrown when the Guild Queue does not exist (no music is playing).
            default:
                var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Oops! Unknown Error.');
                return message.channel.send(exampleEmbed);
                break;
        }
    });
    status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
d
    .on("playSong", async(ctx, queue, song) => {
        s=song
        
        
        q=queue
        
        m[song.user.id]=await ctx.guild.members.cache.get(`${song.user.id}`)
       
        return await embedyap(ctx,`${m[song.user.id].displayHexColor}`,`Oynatıcı bilgileri:${status(queue)}  Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${song.thumbnail}`,`Şarkı süresi:${song.formattedDuration}`,`${m[song.user.id].user.displayAvatarURL()}`,`${m[song.user.id].displayName}`,ctx.channel)
        
        
    
        
    })
    .on("addSong", async(ctx,queue, song) =>{
     s=song
     q=queue
     
     m[ctx.member.id]=ctx
     return await embedyap(m[ctx.member.id],`${m[ctx.member.id].member.displayHexColor}`,`Oynatıcı bilgileri:${status(queue)} Şarkı başarıyla kuyruğa eklendi. Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${song.thumbnail}`,`Şarkı süresi:${song.formattedDuration}`,`${song.user.displayAvatarURL()}`,`${m[ctx.member.id].member.displayName}`,ctx.channel)
    })
    .on("playList", async(ctx, queue, playlist, song) => {
         s=song
         q=queue
         m[ctx.member.id]=ctx
         return await embedyap(m[ctx.member.id],`${m[ctx.member.id].member.displayHexColor}`,`Oynatıcı bilgileri:${status(queue)} ${playlist.songs.length} Şarkı başarıyla kuyruğa eklendi. Şarkı adı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:${song.user}`,`${song.thumbnail}`,`Şarkı süresi:${song.formattedDuration}`,`${song.user.displayAvatarURL()}`,`${m[ctx.member.id].member.displayName}`,ctx.channel)
    })
    
    
    .on("addList", async(ctx, queue, playlist) => {
        
         s=playlist.songs[0]
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
    


async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

module.exports = {
	name:  'çal',
	description: 'Varsayılan müziği çalar',
	cooldown: 5,
    args:true,
    usage:`${client.config.prefix}çal İstediğiniz Şarkıyı link olarak veya Adını yazınız.`,
    distube:d,
    player:client.player,
   
	async execute(ctx,url){
	  try{
     me=ctx
	   this.usage=`${config.prefix}çal İstediğiniz şarkı`
	   vc=await ctx.member.voice.channel
     URL=url
     args = me.content.slice(config.prefix.length).trim().split(/ +/g);
	   if(`${vc}`=='null'||`${vc}`=='undefined'){
	     return await ctx.reply('Lütfen bir sesli kanala girin')
	   }
      SpotifyLink =RegExpList.Spotify.test(url);
      SpotifyPlaylistLink =RegExpList.SpotifyPlaylist.test(url)
      DeezerLink=RegExpList.Deezer.test(url)
    
console.log(DeezerLink)
if(DeezerLink){
  return await client.player.playlist(ctx,url.join(' '))
}


 
//Get album list for the given artist id

     if(SpotifyPlaylistLink){
      const u=url.join(' ')
      if(u.search('artist')!=-1||u.search('playlist')!=-1||u.search('album')!=-1){
        await client.player.playlist(ctx, {
            search: url.join(' '),
            maxSongs: 4000,
           
        });
      } 
       if(u.search('track')!=-1){
        return await client.player.play(ctx,{
           search:url.join(' '),
           requestedBy:ctx.member
        });
      } 
     

       
       
      
      
      return await embedyap(ctx,`${ctx.member.displayHexColor}`,`Şarkıadı:${song.name}`,`${song.url}`,`Bilgi`, `Şarkıyı ekleyen:<@${ctx.author.id}>`,`${client.user.displayAvatarURL}`,`${ctx.author.username}`,ctx.channel)
     } 
  
     else if(!SpotifyPlaylistLink&&client.player.isPlaying(ctx)){ 
       
       
     
     
        return s=await client.player.play(ctx, {
            search: url.join(' '),
            user:ctx.member,
        });
       
        
     
     } 
     else if(!client.player.isPlaying(ctx)&&!d.isPlaying(ctx)){
       
       if(ctx.author.id!=client.user.id){
       vc.join().then(async connection=>{
       sayı=0
       
        
	      
	      await d.play(ctx,url.join(' '))
        return d.setVolume(ctx,100)
	      
	      
	        
	        
        
     })
     
     }
     
	     
    
     }
     else if(!client.player.isPlaying(ctx)&&d.isPlaying(ctx)){
       return await d.play(ctx,url.join(' '))
     }
     
	      
	     
	    
    
   
        
        
    
    

  
  if(s!=null&&s){
    sayı=0
    
  }
     
    
  
    
      
    
	
	  }catch(error){
    
      console.log(`HATA:${error}`)
	    
	    
     
     
      
 

      
	    
	   
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
         if(client.player.isPlaying(me)){
           
         }
        break;
       }
       case tepkiler[8]:{
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

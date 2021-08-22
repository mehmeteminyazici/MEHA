const discord = require('discord.js')
const config = require('./../config.json');
const client = require('./../index').client
const Database = require("@replit/database")
const db=new Database()
let DB=""
async function veritabanınıtemizle(){
  try{
    DB=await db.list("")
    for(let i=0;i<=DB.length;i++){
      await db.delete(DB[i])
    }
    
    
      
  
 }catch(error){
   console.log(error)
 }
 }
module.exports = {

	name: 'veritabanınıtemizle',

	description: 'Veritabanını Temizler',

	cooldown: 5,

  args:true,

  usage:`Botun veritabanını temizlersiniz(Sadece sahibi içindir.)`,

	async execute(ctx,mesaj){
     try{
       if(ctx.member.id==770893793955545088&&!ctx.author.bot||ctx.auhor.bot&&ctx
       .member.id==667323301454151700){
             await ctx.channel.send("Temizleniyor...")
             await veritabanınıtemizle()
       }
       else{
         await ctx.reply("Hata ")
       }
       
     }catch(error){
       console.log(error)
     }
  }


}

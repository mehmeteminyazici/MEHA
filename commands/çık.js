const config=require('./../config.json')
module.exports = {
	name:  'çık',
	description: 'Sesli kanaldan çıkmak içindir.',
	cooldown: 5,
    args:true,
    usage:`Prefix'in tespit edilemedi hatadan dolayı özür dileriz bir daha komutu yazarmısınız`,
  
   
	async execute(ctx,acıklama){
	  try{
	    this.usage=`${config.prefix}çık Açıklamanı yaz` 
	    const vc=await ctx.member.voice.channel
      await vc.leave()
      
	   
     
     
	     
    
     
	      
	     
	    
    
   
        
  
    
  
    
      
    
	
	  }catch(error){
      console.log(error)
    }
  }
}

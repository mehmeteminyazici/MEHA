const Playlist = require('./Playlist');
const Song = require('./Song');
const Queue = require('./Queue');
const Discord = require('discord.js');
const YTSR = require('ytsr');
const YouTubeClient = require("youtubei");
const config = require('./../config');
const YouTube = new YouTubeClient.Client()
const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();
const al={}
var i=0
var request = require("request")
const { getPreview, getData } = require("spotify-url-info");
const RegExpList = {
    YouTubeVideo: /^((?:https?:)\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))((?!channel)(?!user)\/(?:[\w\-]+\?v=|embed\/|v\/)?)((?!channel)(?!user)[\w\-]+)(\S+)?$/,
    YouTubeVideoID: /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
    YouTubePlaylist: /^((?:https?:)\/\/)?((?:www|m)\.)?((?:youtube\.com)).*(youtu.be\/|list=)([^#&?]*).*/,
    YouTubePlaylistID: /[&?]list=([^&]+)/,
    Spotify: /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})(?:(?=\?)(?:[?&]foo=(\d*)(?=[&#]|$)|(?![?&]foo=)[^#])+)?(?=#|$)/,
    SpotifyPlaylist: /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)/,
     Deezer: /deezer/,

}

// Helper Functions
/**
 * Get ID from YouTube link.
 * @param {String} url
 * @returns {String}
 */
function ParseYouTubeVideo(url) {
    const match = url.match(RegExpList.YouTubeVideoID);
    return (match && match[7].length === 11) ? match[7] : false;
}
/**
 * Get ID from Playlist link.
 * @param {String} url
 * @returns {String}
 */
function ParseYouTubePlaylist(url) {
    const match = url.match(RegExpList.YouTubePlaylistID);
    return (match && match[1].length === 34) ? match[1] : false;
}
/**
 * Stringify Video duration.
 * @param {String|Number} time
 * @returns {String}
 */
function VideoDurationResolver(time) {
    let date = new Date(null);
    date.setSeconds(time);
    let duration = date.toISOString().substr(11, 8);
    return duration.replace(/^0(?:0:0?)?/, '');
}

/**
 * Utils Class
 * @ignore
 */
class Util {

    static PlayerOptions = {
        leaveOnEnd: true,
        leaveOnStop: true,
        leaveOnEmpty: true,
        deafenOnJoin: false,
        timeout: 0,
        volume: 100,
        quality: 'high',
    };
    static PlayOptions = {
        search: '',
        uploadDate: null,
        duration: null,
        sortBy: 'relevance',
        requestedBy: null,
        index: null,
        localAddress: null
    };
    static PlaylistOptions =  {
        search: '',
        maxSongs: -1,
        requestedBy: null,
        shuffle: false,
        localAddress: null
    };
    static ProgressOptions =  {
        size: 20,
        arrow: '>',
        block: '='
    };

    /**
     * @param {String} Search
     * @param {Partial<PlayOptions>} SOptions
     * @param {Queue} Queue
     * @param {String} Requester
     * @param {Number} Limit
     * @return {Promise<Song[]>}
     */
    static async search(Search, SOptions, Queue, Requester, Limit = 1) {
        SOptions = Object.assign({}, this.PlayOptions, SOptions);
        let Filters;

        // Default Options - Type: Video
        let FiltersTypes = await YTSR.getFilters(Search);
        Filters = FiltersTypes.get('Type').get('Video');

        // Custom Options - Upload date: null
        if (SOptions.uploadDate !== null)
            Filters = Array.from(
                (
                    await YTSR.getFilters(Filters.url)
                )
                    .get('Upload date'), ([name, value]) => ({ name, url: value.url })
                )
                    .find(o => o.name.toLowerCase().includes(SOptions.uploadDate))
                 Filters;

        // Custom Options - Duration: null
        if (SOptions.duration !== null)
            Filters = Array.from(
                (
                    await YTSR.getFilters(Filters.url)
                )
                    .get('Duration'), ([name, value]) => ({ name, url: value.url })
                )
                    .find(o => o.name.toLowerCase().startsWith(SOptions.duration))
                Filters;

        // Custom Options - Sort by: relevance
        if (SOptions.duration !== null)
            Filters = Array.from(
                (
                    await YTSR.getFilters(Filters.url)
                )
                    .get('Sort by'), ([name, value]) => ({ name, url: value.url })
                )
                    .find(o => o.name.toLowerCase().includes(SOptions.sortBy))
                 Filters;

        try {
            let Result = await YTSR(
                Filters.url,
                {
                    limit: Limit,
                    nextpageRef: Filters.url,
                }
            );

            let { items } = Result;

            items = items.map(item => {
                if(item.type.toLowerCase() !== 'video')
                    return null;
                item = {
                    title: item.title,
                    duration: item.duration,
                    channel: {
                        name: item.author.name,
                    },
                    url: item.url,
                    thumbnail: item.bestThumbnail.url,
                    isLiveContent: item.isLive
                };
                return new Song(item, Queue, Requester);
            }).filter(I => I);

            return items;
        }
        catch (e) {
            throw 'SearchIsNull';
        }
    }

    /**
     * @param {String} Search
     * @param {Queue} Queue
     * @param {String} Requester
     * @param {String?} LocalAddress
     * @return {Promise<Song>}
     */
    static async link(Search, Queue, Requester, LocalAddress) {

        let SpotifyLink =
            RegExpList.Spotify.test(Search);
        let YouTubeLink =
            RegExpList.YouTubeVideo.test(Search);

        if(SpotifyLink) {
            try {
                let SpotifyResult = await getPreview(Search);
                let SearchResult = await this.search(
                    `${SpotifyResult['artist']} - ${SpotifyResult['title']}`,
                    null,
                    Queue,
                    Requester
                );
                return SearchResult[0];
            }
            catch(e) {
                throw 'InvalidSpotify';
            }
        } else if(YouTubeLink) {
            let VideoID = ParseYouTubeVideo(Search);
            if (!VideoID) throw 'SearchIsNull';

            YouTube.options.httpOptions.localAddress = LocalAddress;
            let VideoResult = await YouTube.getVideo(VideoID);
            VideoResult['duration'] = VideoDurationResolver(VideoResult.duration= 0);
            VideoResult['url'] = Search;

            return new Song(VideoResult, Queue, Requester);
        }

        return null;
    }

    /**
     * @param {String} Search
     * @param {Partial<PlayOptions>} SOptions
     * @param {Queue} Queue
     * @param {String} Requester
     * @param {Number} Limit
     * @return {Promise<Song>}
     */
    static async best(Search, SOptions, Queue, Requester, Limit = 1) {
        let Song;

        Song = await this.link(
            Search,
            Queue,
            Requester,
            SOptions.localAddress
        );

        if(!Song)
            Song = (await this.search(
                Search,
                SOptions,
                Queue,
                Requester,
                Limit
            ))[0];


        return Song;
    }

    /**
     * @param {String} Search
     * @param {Queue} Queue
     * @param {String} Requester
     * @param {Number} Limit
     * @param {String?} LocalAddress
     * @return {Promise<Playlist>}
     */
static async playlist(Search, Queue, Requester, Limit= -1, LocalAddress) {

        let SpotifyPlaylistLink =
            RegExpList.SpotifyPlaylist.test(Search);
        let YouTubePlaylistLink =
            RegExpList.YouTubePlaylist.test(Search);
        let DeezerLink=RegExpList.Deezer.test(Search)
if(DeezerLink){
const u=Search
if(`${u}`.search(`artist`)!=-1){
const s=`${Search}`.split('https://www.deezer.com/tr/artist/').join('')
let DeezerResult={}
deezer.artist(`${s}`).then(async function(result) {
 DeezerResult={
   title:result.name,
   url:Search,
 }
  
  
request({
    url: result.tracklist,
    json: true

}, async function (error, response, body) {
     
    
     
      for(let b of body.data){
      
      DeezerResult={
        title:result.name,
       
        url:Search,
        videos: Object.values(b.title) ? Object.values(b.title) : [],
        videoCount:0,
        
      
     
      
     
        
      }
      }
      console.log(DeezerResult)
     DeezerResult.videos = await Promise.all(DeezerResult.videos.map(async (track, index) => {
                
              
                    
                let Result = this.search(
                    `${result.name}-${DeezerResult.videos}`,
                    null,
                    Queue,
                    Requester
                ).catch(() => null);
                return Result ? Result[0] : null;
            })
                .filter(V => V)
            )
            DeezerResult.videoCount =
                Limit === -1 ?
                  DeezerResult.videos.length :
                   DeezerResult.videos.length > Limit ?
                        Limit :
                        DeezerResult.videos.length;
     
     console.log(DeezerResult)
     return new Playlist(DeezerResult,Queue,Requester)
      
    
     
      
     
 


})


if(i>25){
  request({
    url: result.next,
    json: true

}, async function (error, response, body) {
     
     body.data.forEach(async b=>{
      DeezerResult={
        title:result.name,
       
        url:Search,
        videos: Object.values(b.title) ? Object.values(b.title) : [],
        videoCount:0
        
      }
      
     
       
     
        
     })
      DeezerResult.videos = await Promise.all(DeezerResult.videos.map(async (track, index) => {
                
              
                    
                let Result = await this.search(
                    `${result.name}-${DeezerResult.videos}`,
                    null,
                    Queue,
                    Requester
                ).catch(() => null);
                return Result ? Result[0] : null;
            })
                .filter(V => V)
            )
            DeezerResult.videoCount =
                Limit === -1 ?
                    DeezerResult.videos.length :
                    DeezerResult.videos.length > Limit ?
                        Limit :
                        DeezerResult.videos.length;
     
   
        
     
      
       
      
        
     
       
      
     
 


})
}


})
 
   
}
if(`${u}`.search('playlist')!=-1){
 const deezer_playlist=`${Search}`.split('https://www.deezer.com/tr/playlist/').join('')
 deezer.playlist(`${deezer_playlist}`).then(async function(result) {
  
  


    
     
         
        
     for(var i=0;i<=Object.keys(result.tracks.data).length;i++){
       al.push(`${result.tracks.data[i].artist.name}`+`-`+`${result.tracks.data[i].title}`)
      
       await d.play(ctx, `${result.tracks.data[i].artist.name}`+`-`+`${result.tracks.data[i].title}`)
      
       
     }
     
       
      
     
    

})  

}
    
if(`${u}`.search(`album`)!=-1){
  const deezer_album=`${Search}`.split('https://www.deezer.com/tr/album/').join('')
  console.log('Etkin')
  deezer.album(`${deezer_album}`).then(async function(result) {
      console.log(result)
       
    console.log(Object.keys(result.tracks.data).length)      
        
     for(var i=0;i<=Object.keys(result.tracks.data).length;i++){
       al.push(`${result.tracks.data[i].artist.name}`+`-`+`${result.tracks.data[i].title}`)
      
       
      
       
     }
  })
}
  
  return new Playlist(DeezerResult,Queue,Requester)
}
        if(SpotifyPlaylistLink) {
            let SpotifyResult = await getData(Search).catch(() => null);
            if(SpotifyResult&&['user'].includes(SpotifyResult['type'])){
              SpotifyResult = {
                title: SpotifyResult['name'],
                channel: SpotifyResult['type'] === 'playlist' ? { name: SpotifyResult['owner']['display_name'] } : Object.values(SpotifyResult['name']),
                url: Search,
                videos: Object.values(SpotifyResult['tracks']) ? Object.values(SpotifyResult['tracks']) : [],
                videoCount: 0,
                type: SpotifyResult['type']
            }

            SpotifyResult.videos = await Promise.all(SpotifyResult.videos.map(async (track, index) => {
                if (Limit !== -1 && index >= Limit) return null;
                if(SpotifyResult['type'] === 'playlist')
                    track = track['track'];
                    
                let Result = await this.search(
                    `${track['artists'][0].name}-${track['name']}`,
                    null,
                    Queue,
                    Requester
                ).catch(() => null);
                return Result ? Result[0] : null;
            })
                .filter(V => V)
            )
            SpotifyResult.videoCount =
                Limit === -1 ?
                    SpotifyResult.videos.length :
                    SpotifyResult.videos.length > Limit ?
                        Limit :
                        SpotifyResult.videos.length;
            
            return new Playlist(SpotifyResult, Queue, Requester);

            }
            if(SpotifyResult&&['artist'].includes(SpotifyResult['type'])){
              SpotifyResult = {
                title: SpotifyResult['name'],
                channel: SpotifyResult['type'] === 'playlist' ? { name: SpotifyResult['owner']['display_name'] } : Object.values(SpotifyResult['name']),
                url: Search,
                videos: Object.values(SpotifyResult['tracks']) ? Object.values(SpotifyResult['tracks']) : [],
                videoCount: 0,
                type: SpotifyResult['type']
            }

            SpotifyResult.videos = await Promise.all(SpotifyResult.videos.map(async (track, index) => {
                
                if (Limit !== -1 && index >= Limit) return null;
                if(SpotifyResult['type'] === 'playlist')
                    track = track['track'];
                    
                let Result = await this.search(
                    `${track['artists'][0].name}-${track['name']}`,
                    null,
                    Queue,
                    Requester
                ).catch(() => null);
                return Result ? Result[0] : null;
            })
                .filter(V => V)
            )
            SpotifyResult.videoCount =
                Limit === -1 ?
                    SpotifyResult.videos.length :
                    SpotifyResult.videos.length > Limit ?
                        Limit :
                        SpotifyResult.videos.length;
            
            return new Playlist(SpotifyResult, Queue, Requester);
            

            }
            if(!SpotifyResult || !['playlist', 'album'].includes(SpotifyResult['type']))
                throw 'InvalidPlaylist';

            SpotifyResult = {
                title: SpotifyResult['name'],
                channel: SpotifyResult['type'] === 'playlist' ? { name: SpotifyResult['owner']['display_name'] } : SpotifyResult['artists'][0],
                url: Search,
                videos: SpotifyResult['tracks'] ? SpotifyResult['tracks'].items : [],
                videoCount: 0,
                type: SpotifyResult['type']
            }

            SpotifyResult.videos = await Promise.all(SpotifyResult.videos.map(async (track, index) => {
                
                if (Limit !== -1 && index >= Limit) return null;
                if(SpotifyResult['type'] === 'playlist')
                    track = track['track'];
                let Result = await this.search(
                    `${track['artists'][0].name} - ${track['name']}`,
                    null,
                    Queue,
                    Requester
                ).catch(() => null);
                return Result ? Result[0] : null;
            })
                .filter(V => V)
            )
            SpotifyResult.videoCount =
                Limit === -1 ?
                    SpotifyResult.videos.length :
                    SpotifyResult.videos.length > Limit ?
                        Limit :
                        SpotifyResult.videos.length;

            return new Playlist(SpotifyResult, Queue, Requester);
        } else if(YouTubePlaylistLink) {
            let PlaylistID = ParseYouTubePlaylist(Search);
            if (!PlaylistID)
                throw 'InvalidPlaylist';

            YouTube.options.httpOptions.localAddress = LocalAddress;
            let YouTubeResult = await YouTube.getPlaylist(PlaylistID);
            if (!YouTubeResult || Object.keys(YouTubeResult).length === 0)
                throw 'InvalidPlaylist';

            YouTubeResult.videos = YouTubeResult.videos.map((video, index) => {
                if (Limit !== -1 && index >= Limit) return null;
                video.duration = VideoDurationResolver(video.duration=0);
                video.url = `https://youtube.com/watch?v=${video.id}`;
                video.isLiveContent = video.isLive;

                return new Song(video, Queue, Requester);
            })
                .filter(V => V);
            YouTubeResult['url'] = Search;
            YouTubeResult.videoCount =
                Limit === -1 ?
                    YouTubeResult.videoCount :
                    YouTubeResult.videoCount > Limit ?
                        Limit :
                        YouTubeResult.videoCount;

            return new Playlist(YouTubeResult, Queue, Requester);
        }

        throw 'InvalidPlaylist';
    }

    /**
     * Converts Milliseconds to Time (HH:MM:SS)
     * @param {Number} ms Milliseconds
     * @returns {String}
     */
    static MillisecondsToTime(ms) {
        const seconds = Math.floor(ms / 1000 % 60);
        const minutes = Math.floor(ms / 60000 % 60);
        const hours = Math.floor(ms / 3600000);

        const secondsT = `${seconds}`.padStart(2,'0');
        const minutesT = `${minutes}`.padStart(2,'0');
        const hoursT = `${hours}`.padStart(2,'0');

        return `${hours ? `${hoursT}:` : ''}${minutesT}:${secondsT}`;
    }

    /**
     * Converts Time (HH:MM:SS) to Milliseconds
     * @param {String} time Time
     * @returns {number}
     */
    static TimeToMilliseconds(time) {
        const items = time.split(':');
        return items.reduceRight(
            (prev,curr,i,arr) => prev + parseInt(curr) * 60**(arr.length-1-i),
            0
        ) * 1000;
    }

    /**
     * Create a text progress bar
     * @param {Number} value - The value to fill the bar
     * @param {Number} maxValue - The max value of the bar
     * @param {Number} size - The bar size (in letters)
     * @param {String} loadedIcon - Loaded Icon
     * @param {String} arrowIcon - Arrow Icon
     * @return {String} - Music Bar
     */
    static buildBar(value, maxValue, size, loadedIcon, arrowIcon) {
        const percentage = value / maxValue;
        const progress = Math.round((size * percentage));
        const emptyProgress = size - progress;

        const progressText = loadedIcon.repeat(progress) + arrowIcon;
        const emptyProgressText = ' '.repeat(emptyProgress);

        return `[${progressText}${emptyProgressText}][${this.MillisecondsToTime(value)}/${this.MillisecondsToTime(maxValue)}]`;
    };

    /**
     * @param {Partial<PlayerOptions>} options
     * @returns {PlayerOptions|Partial<PlayerOptions>}
     */
    static deserializeOptionsPlayer(options) {
        if(options && typeof options === 'object')
            return Object.assign({}, this.PlayerOptions, options);
        else return this.PlayerOptions;
    }

    /**
     * @param {Partial<PlayerOptions>|String} options
     * @returns {Partial<PlayOptions>}
     */
    static deserializeOptionsPlay(options) {
        if(options && typeof options === 'object')
            return Object.assign({}, this.PlayOptions, options);
        else if(typeof options === 'string')
            return Object.assign({}, this.PlayOptions, { search: options });
        else return this.PlayOptions;
    }

    /**
     * @param {Partial<PlayerOptions>|String} options
     * @returns {Partial<PlayOptions>}
     */
    static deserializeOptionsPlaylist(options) {
        if(options && typeof options === 'object')
            return Object.assign({}, this.PlaylistOptions, options);
        else if(typeof options === 'string')
            return Object.assign({}, this.PlaylistOptions, { search: options });
        else return this.PlaylistOptions;
    }

    /**
     * @param {Partial<PlayerOptions>} options
     * @returns {Partial<ProgressOptions>}
     */
    static deserializeOptionsProgress(options) {
        if(options && typeof options === 'object')
            return Object.assign({}, this.ProgressOptions, options);
        else return this.ProgressOptions;
    }

    /**
     * @param {Discord.VoiceState} voice
     * @return {Boolean}
     */
    static isVoice(voice) {
        if(voice.constructor.name !== Discord.VoiceState.name)
            return false;
        return voice.channel ? voice.channel.constructor.name === 'VoiceChannel' || voice.channel.constructor.name === 'StageChannel' : false;
    }

    /**
     * @param {Array} array
     * @return {Array}
     */
    static shuffle(array) {
        if(!Array.isArray(array)) return [];
        const clone = [...array];
        const shuffled = [];
        while(clone.length > 0)
            shuffled.push(
                clone.splice(
                    Math.floor(
                        Math.random() * clone.length
                    ), 1
                )[0]
            );
        return shuffled;
    }

}

module.exports = Util;

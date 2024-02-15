
const mongoose = require('mongoose')
const Joi = require('joi');

const recomendedSchema = new mongoose.Schema({

    title: {
        type: String,
      
    },
    artist: {
        type: String,
    
    },
   
    artwork: {
        type: String,
    },
    url:{
        type: String,
        require:true,
    }
  
});

const playListAlbumScheema = new mongoose.Schema({
    album_image: {
        type: String,
      
    },
    album_name: {
        type: String,
    
    },

  
})


const songsPlaylistSchema = new mongoose.Schema({
    user_id:{
        type: String,
        require:true,
    },
    title: {
        type: String,
      
    },
    artist: {
        type: String,
    
    },
   
    artwork: {
        type: String,
       
    },
    url:{
        type: String,
        require:true
    }
  
});


var RecomendedSongs = mongoose.model('recomendedsongs', recomendedSchema);
var MyPlayListAlbum = mongoose.model('myplaylistalbum,', playListAlbumScheema);
var MySongsPlaylist = mongoose.model('mysongsplaylist,', songsPlaylistSchema);


exports.MyPlayListAlbum = MyPlayListAlbum;
exports.RecomendedSongs = RecomendedSongs;
exports.MySongsPlaylist = MySongsPlaylist;





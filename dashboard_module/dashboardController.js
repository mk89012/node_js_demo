require('dotenv').config()
const mongoose = require('mongoose');
const {RecomendedSongs,MyPlayListAlbum,MySongsPlaylist,validateProduct} = require('./dashboardModel');
var db=mongoose.connection;








////create user api ......................................
const dashboardData =async (req, res) => {
    let recomendedSongs = await RecomendedSongs.find();
    let myPlayListAlbum = await MyPlayListAlbum.find();
    let mySongsPlaylist = await MySongsPlaylist.find();

    let combined = myPlayListAlbum.map(item => ({ item, songs: mySongsPlaylist.filter((f) =>{
       var string = JSON.stringify(f);
       var objectValue = JSON.parse(string);
      
        return  objectValue.album_id == item._id;
    })}));
    try{
            res.status(200).json({ 
                status:true,
                message: "SuccessFully Fetched",
                data:{
                    "recomended_songs":recomendedSongs,
                    "myPlayListAlbum":combined,
                }
               
             });
    } catch(e){
        res.json({ 
            status:false,
            message: "Something went wrong",
        });
        console.log(e);
    }
  
}






exports.dashboardData = dashboardData;

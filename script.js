// NEED TO BE ABLE TO ADD TRACK???
var selectedTrack = 1; // default loaded track number
var trackList = []; // array of songs

// populate array of songs
for (i = 0; i < $("audio").length - 1; i++) {
    trackList.push($("audio")[i]);
}

var currentSongName; // Name of song that is playing now

// *** OUTDATED METHOD?? ***
// Get name of mp3 file currently playing
// function currentSong(trackNumber) {
//     var temp = $("audio:eq(" + (trackNumber-1) + ")").attr("src");
//     return temp.substr(13);
// }

// Get name of mp3 file currently playing
function currentSong(trackList, trackNumber) {
    var temp = trackList[trackNumber].src;
    return temp.substr(temp.lastIndexOf("/") + 1);
}

function changeList() {

}

currentSongName = currentSong(trackList, selectedTrack-1);
console.log(trackList);

// Object
function JukeBox(songList) {
  this.songList = songList;
  this.currentSongNumber = selectedTrack-1;
  this.currentSongName = currentSong(this.songList, this.currentSongNumber);
  this.play = function() {
    playCurrentSong(this.songList, this.currentSongNumber); // function call
    //this.currentSongNumber = (this.currentSongNumber + 1) % this.songList.length; // change to next track
  }
  this.pause = function() {
    pauseCurrentSong(this.songList, this.currentSongNumber)
  }
  this.stop =  function() {
    stopCurrentSong(this.songList, this.currentSongNumber)
  }
  this.addSong = function(newSong) {
    //$(newSong).attr("id","4");
    this.songList.push(newSong);
  }
  // this.next =
}

var jukeBox = new JukeBox(trackList);

// JukeBox functions for Play, Pause, Stop
function playCurrentSong(theSongList, theCurrentSongNumber) {
  // $("#currentlyPlaying").innerText = currentSong(theSongList, theCurrentSongNumber);
  document.getElementById("currentlyPlaying").innerText = currentSong(theSongList, theCurrentSongNumber);
  theSongList[theCurrentSongNumber].play();
}

function pauseCurrentSong(theSongList, theCurrentSongNumber) {
  theSongList[theCurrentSongNumber].pause();
}

function stopCurrentSong(theSongList, theCurrentSongNumber) {
  theSongList[theCurrentSongNumber].pause();
  theSongList[theCurrentSongNumber].currentTime = 0;
}



// $("#playButton").on({click: function(e){
//   $("#playButton").on('click');
//   jukeBox.play();
//   $("#playButton").off('click');
// }})

// Set Button Actions
$("#playButton").click(function(){
  jukeBox.play();
  //document.getElementById("track" + selectedTrack).play();
})

$("#pauseButton").click(function(){
  jukeBox.pause();
  //document.getElementById("track" + selectedTrack).pause();
})

$("#stopButton").click(function(){
  jukeBox.stop();
  //document.getElementById("track" + selectedTrack).pause();
  //document.getElementById("track" + selectedTrack).currentTime = 0;
})

// Set Track Number Button Actions
// $("li").click(function() {
//   selectedTrack = parseInt(this.innerText);
//   // jukeBox.play(this.innerText);
//   document.getElementById("track" + selectedTrack).play();
// })



$("#search").click(function(e){
  e.preventDefault();
  var userSelectedTrack = $("#searchText").val()
  // $("#searchText").val("") to clear the text area
  $("#tracklist").append("<li id = " + "5" + ">" + userSelectedTrack + "</li>");
  $.ajax({
    url: "https://api.spotify.com/v1/search",
    data: {
      q: userSelectedTrack,
      type: "track",
    },
    success: function(response) {
      var trackurl = response.tracks.items[0].preview_url;
      $("#searchedTrack").attr("src", trackurl);
      jukeBox.addSong($("#searchedTrack"));
      console.log(response);
      console.log(response.tracks.items[0].preview_url);
    }
  })
})

function refresh(){
  $("li").click(function() {
  alert("he");
  jukeBox.stop();
  // jukeBox.currentSongNumber = parseInt(this.innerText - 1);
  jukeBox.currentSongNumber = parseInt($(this).attr("id")) - 1;
  // jukeBox.play(this.innerText);
  jukeBox.play();
})}

$(document).ready(function(){
  $("#tracklist").append("<li id = " + "5" + ">" + "hello" + "</li>");
  refresh();
})

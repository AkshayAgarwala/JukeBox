// NEED TO BE ABLE TO ADD TRACK???
var selectedTrack = 1; // default loaded track number
var trackList = []; // array of songs

// populate array of songs
for (i = 0; i < $("audio").length; i++) {
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
  this.stop = function() {
    stopCurrentSong(this.songList, this.currentSongNumber)
  }
  this.addSong = function(newSong) {
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

$("li").click(function() {
  jukeBox.stop();
  jukeBox.currentSongNumber = parseInt(this.innerText - 1);
  // jukeBox.play(this.innerText);
  jukeBox.play();
})

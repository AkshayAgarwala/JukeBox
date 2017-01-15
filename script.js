// Tracks are numbered 1+ and adjusted when indexing array
var selectedTrack = 1; // default loaded track number
var trackList = []; // array of songs

// populate array of songs
for (i = 0; i < $("audio").length; i++) {
    trackList.push($("audio")[i]);
}

// Get name of mp3 file that is currently playing
function currentSong(trackList, trackNumber) {
    return trackList[trackNumber].innerText;
}

var currentSongName; // Name of song that is playing now
currentSongName = currentSong(trackList, selectedTrack-1);

// Object
function JukeBox(songList) {
  this.songList = songList;
  this.numberOfSongs = function() {
    return songList.length;
  }

  this.currentSongNumber = selectedTrack-1;
  this.currentSongName = currentSong(this.songList, this.currentSongNumber);
  this.play = function() {
    playCurrentSong(this.songList, this.currentSongNumber); // function call
  }

  this.pause = function() {
    pauseCurrentSong(this.songList, this.currentSongNumber);
  }

  this.stop =  function() {
    stopCurrentSong(this.songList, this.currentSongNumber);
  }

  this.addSong = function (newSong, newSongUrl) {
    addSongToList(newSong, newSongUrl, this); // pass the object as a parameter
  }

  this.previous = function() {
    playPreviousSong(this);
  }

  this.next = function() {
    playNextSong(this);
  }

  this.shuffle = function() {
    shuffle(this);
  }

} // object

var jukeBox = new JukeBox(trackList);

// JukeBox functions for Play/Pause/Stop, Previous/Next, Shuffle
function playCurrentSong(theSongList, theCurrentSongNumber) {
  theSongList[theCurrentSongNumber].play();
  document.getElementById("currentlyPlaying").innerText = "Now Playing: " + currentSong(theSongList, theCurrentSongNumber);
}

function pauseCurrentSong(theSongList, theCurrentSongNumber) {
  theSongList[theCurrentSongNumber].pause();
}

function stopCurrentSong(theSongList, theCurrentSongNumber) {
  theSongList[theCurrentSongNumber].pause();
  theSongList[theCurrentSongNumber].currentTime = 0;
}

function playPreviousSong(box) {
  var num = box.numberOfSongs();
  box.stop();
  box.currentSongNumber = ((box.currentSongNumber - 1) % num);
  if(box.currentSongNumber < 0) box.currentSongNumber = (num-1);
  box.play();
}

function playNextSong(box) {
  var num = box.numberOfSongs();
  box.stop();
  box.currentSongNumber = ((box.currentSongNumber + 1) % num);
  box.play();
}

function shuffle(box) {
  box.stop();
  box.currentSongNumber = Math.floor(Math.random() * box.numberOfSongs());
  box.play();
}

function addSongToList(newSong, newSongUrl, box) {
  // Create audio element with text that was searched for
  var tempAudioElement = document.createElement("audio");
  var tempText = document.createTextNode(newSong);
  tempAudioElement.appendChild(tempText);
  // Set id of audio element to next track number
  var myAtt = document.createAttribute("id");
  myAtt.value = ("track" + (box.numberOfSongs()+1));
  tempAudioElement.setAttributeNode(myAtt);
  // Change src of audio element to url of searched track
  $(tempAudioElement).attr("src", newSongUrl);
  // add new track to pre-existing track list
  box.songList.push(tempAudioElement);
  // refresh the event listeners on the list of tracks
  refresh();
}

// Set Button Actions
$("#playButton").click(function(){
  jukeBox.play();
})

$("#pauseButton").click(function(){
  jukeBox.pause();
})

$("#stopButton").click(function(){
  jukeBox.stop();
})

$("#previousButton").click(function(){
  jukeBox.previous();
})

$("#nextButton").click(function(){
  jukeBox.next();
})

$("#shuffleButton").click(function(){
  jukeBox.shuffle();
})

// Search for new songs
$("#search").click(function(e){
  e.preventDefault();
  var userSelectedTrack = $("#searchText").val()
  $("#searchText").val(""); // Clear Search Text Area
  $("#tracklist").append("<li id = " + (jukeBox.numberOfSongs() + 1) + ">" + userSelectedTrack + "</li>");
  //refresh();
  $.ajax({
    url: "https://api.spotify.com/v1/search",
    data: {
      q: userSelectedTrack,
      type: "track",
    },
    success: function(response) {
      console.log(response);
      var trackurl = response.tracks.items[0].preview_url;
      jukeBox.addSong(userSelectedTrack, trackurl);
    } // success
  }) // ajax
})

// refreshes the click event listener on all list items
function refresh(){
  $("li").click(function() {
    jukeBox.stop();
    jukeBox.currentSongNumber = parseInt($(this).attr("id")) - 1;
    // play song after a short delay to avoid pause to play interrupts
    setTimeout(function(){
      jukeBox.play();
    }, 150);
  })
}

 refresh(); // Set click event listener on pre-loaded tracks

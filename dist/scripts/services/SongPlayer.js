(function() {
    
    function SongPlayer($rootScope, Fixtures) {
        
        var SongPlayer = {};
        
        /**
        * @desc The current album gotten from the Fixtures service
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        
        /**
        * @desc Buzz object audio file
        * @type {object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playinh song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                SongPlayer.stop();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Plays the currently set song and changes the playing boolean on the song object to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function getSongIndex
        * @desc Returns the index of the song - used by the prev and next buttons on the player_bar
        * @param {Object} song
        */
        var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc stores the currently playing song object to compare to a new song object when the song is switched
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @desc volume setting out of 100 (default 70)
        * @type {Number}
        */
        SongPlayer.volume = 70;
        
        /**
        * @function play
        * @desc plays the song that is passed to it. 
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if( SongPlayer.currentSong !== song ) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function pause
        * @desc pauses the song that is passed to it. 
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        /**
        * @function previous
        * @desc Changes the currently playing song to the one before it.
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                SongPlayer.stop();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        }

        /**
        * @function next
        * @desc Changes the currently playing song to the one after it.
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length-1) {
                SongPlayer.stop();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        }
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
/**
        * @function setVolume
        * @desc Set the Volume
        * @param {Number}
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };

        /**
        * @function stop
        * @desc Stops the current song that is playing and sets the current song to null.
        */
        SongPlayer.stop = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
        return SongPlayer;
        
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
    
})();
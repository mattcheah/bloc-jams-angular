(function() {
    
    function SongPlayer(Fixtures) {
        
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        }

        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
    
})();
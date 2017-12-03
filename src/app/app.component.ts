import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  songPaths = ["assets/juicy_snare.mp3", "assets/A1 Wake_320kbps.mp3", "assets/A2 Rorschach_320kbps.mp3", "assets/A3 Empiricist_320kbps.mp3", "assets/A4 Algernon_320kbps.mp3"];

  songs = [];
  playingIndex = undefined;
  playImage = "../assets/ic_play_arrow_black_24px.svg";
  pauseImage = "../assets/ic_pause_black_24px.svg";

  ngOnInit() {

    for (let i = 0; i < this.songPaths.length; i++) {
      let song = new Howl({
        src: [this.songPaths[i]],

        onload: function() {
          console.log(i + " loaded");
        },
        onplay: function() {
          console.log(i + " playing");
        },
        onend: function() {
          console.log(i + " ended");
        }
      });
      this.songs.push(song);
    }

  }

  playSong(i) {
    this.stopCurrent();
    this.playingIndex = i;
    this.songs[i].play();

    let nextSong = i < this.songs.length - 1 ? this.songs[i + 1] : null;


    this.songs[i].once('end', function() {
      nextSong.play();
    })
  }

  checkSelected(i) {
    return this.playingIndex === i ? "selected" : "";
  }

  stopCurrent() {
    if (this.playingIndex !== undefined) {
      this.songs.forEach(e => e.stop());
      this.playingIndex = undefined;
    }
  }

  togglePause() {
    if (this.playingIndex === undefined) {
      this.playingIndex = 0;
      this.songs[0].play();
    } else {
      if (this.songs[this.playingIndex].playing()) {
        this.songs[this.playingIndex].pause();
      } else {
        this.songs[this.playingIndex].play();
      }
    }
  }

  checkPauseState(): string {
    console.log('checkPauseState()')
    // if there is a focused song
    if (this.playingIndex !== undefined) {
      // return image based on song state
      if (!this.songs[this.playingIndex].playing()) {
        return this.playImage;
      }

      return this.pauseImage;

      // no focus
    } else {
      return this.playImage;
    }
  }
}

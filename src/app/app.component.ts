import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  songPaths = ["assets/A1 Wake_320kbps.mp3", "assets/A2 Rorschach_320kbps.mp3", "assets/A3 Empiricist_320kbps.mp3", "assets/A4 Algernon_320kbps.mp3"];

  songs = [];
  playingIndex = undefined;
  songItemClass = "";

  ngOnInit() {

    for (let i = 0; i < this.songPaths.length; i++) {
      let song = new Howl({
        src: [this.songPaths[i]],
      });
      this.songs.push(song);
    }

  }

  playSong(i) {
    this.stopCurrent();
    this.playingIndex = i;
    this.songItemClass = "selected";
    this.songs[i].play();
  }

  checkSelected(i) {
    return this.playingIndex === i ? "selected" : "";
  }

  stopCurrent() {
    if (this.playingIndex !== undefined) {
      this.songs[this.playingIndex].stop();
      this.playingIndex = undefined;
    }
  }

  togglePause() {
    if (this.playingIndex === undefined) {
      this.songs[0].play();
      this.playingIndex = 0;
    } else {
      if (this.songs[this.playingIndex].playing()) {
        this.songs[this.playingIndex].pause();
      } else {
        this.songs[this.playingIndex].play();
      }
    }
  }
}

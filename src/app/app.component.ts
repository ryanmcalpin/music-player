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

  ngOnInit() {
    // this.songPaths.forEach(function(path) {
    //   let song = new Howl({
    //     src: [path]
    //   })
    //   this.songs.push(song)
    // })


    for (let i = 0; i < this.songPaths.length; i++) {
      let song = new Howl({
        src: [this.songPaths[i]],
      });
      this.songs.push(song);
    }

  }


  playSong(i){
    if (this.playingIndex !== undefined) this.songs[this.playingIndex].stop();
    this.playingIndex = i;
    this.songs[i].play();
  }
}

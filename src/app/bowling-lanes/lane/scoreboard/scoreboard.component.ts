import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  playersScore: any[] = [];
  numberRounds: any[] = [];

  constructor() {
    this.numberRounds =  Array(10);
  }

  ngOnInit(): void { }

}

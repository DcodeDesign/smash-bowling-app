import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  @Input() score: any;
  @Input() player: any;
  numberRounds: any[] = [];

  constructor() {
    this.numberRounds =  Array(10);
  }

  ngOnInit(): void { console.log(this.score) }

}

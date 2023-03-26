import { Component, Input, OnInit } from '@angular/core';
import { PlayerData } from '../services/interfaces/player-data.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements OnInit {
  @Input() playersData: PlayerData[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
}

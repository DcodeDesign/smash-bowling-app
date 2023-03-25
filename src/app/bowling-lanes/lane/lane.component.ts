import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements OnInit {
  @Input() playersData: any; // TODO: create interface

  constructor() { }

  ngOnInit(): void {
  }

}

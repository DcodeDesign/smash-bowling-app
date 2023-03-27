import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { PlayerData } from '../../services/interfaces/player-data.interface';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent implements OnInit {
  @Input() player: any;
  @Output() pins = new EventEmitter<number>();

  form = this.formBuilder.group({
    throw: [null, [Validators.min(0), Validators.max(10), Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void { }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.addPins(this.form.value);
    }
  }

  addPins(pins: number) {
    this.pins.emit(pins);
  }
}

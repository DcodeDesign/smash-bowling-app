import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent implements OnInit {
  @Input() player: any;
  @Output() numberDroppedPins = new EventEmitter<number>();

  form = this.formBuilder.group({
    throw: [null, [Validators.min(0), Validators.max(10), Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.onNumberDroppedPins(this.form.value);
    }
  }

  onNumberDroppedPins(pins: number) {
    this.numberDroppedPins.emit(pins);
  }
}

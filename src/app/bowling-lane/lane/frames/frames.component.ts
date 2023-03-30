import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScoreInterface } from '../../models/scores.interface';
import { GAME_CONFIGURATIONS } from '../../models/game-configurations.constant';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent implements OnInit, OnChanges {
  @Input() firstThrows: ScoreInterface;
  @Output() numberDroppedPins = new EventEmitter<number>();

  private _MAX_NUMBER_PINS = GAME_CONFIGURATIONS.MAX_NUMBER_PINS;
  public form: FormGroup;
  public rest: number;

  constructor(private formBuilder: FormBuilder) {
    if(!!this.firstThrows) {
      this.rest = this.firstThrows.rest;
    }
    else {
      this.rest = this._MAX_NUMBER_PINS;
    }

    this.form = this.formBuilder.group({
      count: [null, [Validators.min(0), Validators.max(this.rest), Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const lastThrowsValue = changes.firstThrows;
    if (!!lastThrowsValue.currentValue) {
      this.rest = lastThrowsValue.currentValue.rest
      this.form.controls.count.setValidators([Validators.min(0), Validators.max(lastThrowsValue.currentValue.rest), Validators.required])
      this.form.controls.count.updateValueAndValidity();
    }
  }

  ngOnInit(): void { }

  onSubmitForm() {
    if (this.form.valid) {
      this.onNumberDroppedPins(this.form.value);
      this.form.reset();
    } else {
      this.form.controls.count.markAsDirty();
    }
  }

  onNumberDroppedPins(pins: { count: number }) {
    this.numberDroppedPins.emit(pins.count);
  }

}

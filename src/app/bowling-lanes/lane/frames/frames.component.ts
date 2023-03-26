import {Component, Input, OnInit} from '@angular/core';
import {PlayerData} from '../../services/interfaces/player-data.interface';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ValidationDirtyChecker} from '../../../shared/services/validation/services/ValidationDirtyChecker';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent implements OnInit {
  @Input() playersData: PlayerData[] = [];

  form = this.formBuilder.group({
    throw: [null, [Validators.min(0), Validators.max(10), Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private validationDirtyChecker: ValidationDirtyChecker
  ) { }

  ngOnInit(): void { }

  onSubmitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.validationDirtyChecker.markControlsDirty(this.form);
    }
  }



}

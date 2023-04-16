import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FramesComponent } from './frames.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { GAME_CONFIGURATIONS } from '../../models/game-configurations.constant';
import { ScoreInterface } from '../../models/scores.interface';
import { TechnicalTermsEnum } from '../../models/technicalTerms.enum';

describe('FramesComponent', () => {
  let component: FramesComponent;
  let fixture: ComponentFixture<FramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FramesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct number of dropped pins when the form is submitted', () => {
    component.rest = 10;
    fixture.detectChanges();

    spyOn(component.numberDroppedPins, 'emit');
    const form = component.form;
    form.controls.count.setValue(3);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.numberDroppedPins.emit).toHaveBeenCalledWith(3);
  });

  it('should set the form validator and rest value correctly on changes', () => {
    const score: ScoreInterface = {
      pins: 7,
      score: 7,
      rest: 3,
      term: TechnicalTermsEnum.HOLE,
    };
    component.ngOnChanges({
      firstThrows: {
        currentValue: score,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.rest).toBe(score.rest);
  });

  it('should set the form validator and rest value correctly when there are no previous scores', () => {
    component.ngOnChanges({});
    expect(component.rest).toBe(GAME_CONFIGURATIONS.MAX_NUMBER_PINS);
  });

  it('should be invalid if the form is empty', () => {
    const form = component.form;
    expect(form.valid).toBeFalse();
  });

  it('should be invalid if the count is less than zero', () => {
    const form = component.form;
    form.controls.count.setValue(-1);
    form.markAllAsTouched();
    expect(form.valid).toBeFalse();
  });

  it('should be invalid if the count is greater than the rest', () => {
    const form = component.form;
    component.rest = 10;
    form.controls.count.setValue(11);
    form.markAllAsTouched();
    expect(form.valid).toBeFalse();
  });

  it('should be valid if the count is between zero and the rest', () => {
    const form = component.form;
    component.rest = 10;
    form.controls.count.setValue(5);
    form.markAllAsTouched();
    expect(form.valid).toBeTrue();
  });
});

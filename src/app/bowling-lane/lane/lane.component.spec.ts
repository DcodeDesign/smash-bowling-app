import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaneComponent } from './lane.component';
import { GameService } from '../services/game.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { FramesComponent } from './frames/frames.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('LaneComponent', () => {
  let laneComponent: LaneComponent;
  let fixtureLaneComponent: ComponentFixture<LaneComponent>;

  let scoreboardComponent: ScoreboardComponent;
  let fixtureScoreboardComponent: ComponentFixture<ScoreboardComponent>;

  let framesComponent: FramesComponent;
  let fixtureFramesComponent: ComponentFixture<FramesComponent>;

  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GameService', ['updateScoreboard', 'initScoreboard', 'scoreboard']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ LaneComponent, ScoreboardComponent, FramesComponent ],
      providers: [{ provide: GameService, useValue: spy }]
    });

    fixtureLaneComponent = TestBed.createComponent(LaneComponent);
    laneComponent = fixtureLaneComponent.componentInstance;

    fixtureScoreboardComponent = TestBed.createComponent(ScoreboardComponent);
    scoreboardComponent = fixtureScoreboardComponent.componentInstance;

    fixtureFramesComponent = TestBed.createComponent(FramesComponent);
    framesComponent = fixtureFramesComponent.componentInstance;

    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });

  it('should create', () => {
    expect(laneComponent).toBeTruthy();
    expect(scoreboardComponent).toBeTruthy();
    expect(framesComponent).toBeTruthy();
  });

  it('should update scoreboard on numberDroppedPins event', () => {
    spyOn(laneComponent, 'parseScoreGame');
    const pins = 5;
    gameServiceSpy.updateScoreboard.and.returnValue(undefined);
    laneComponent.onNumberDroppedPins(pins);
    expect(gameServiceSpy.updateScoreboard).toHaveBeenCalledWith(pins);
    expect(laneComponent.parseScoreGame).toHaveBeenCalled();
  });

  it('should call initScoreboard on restart', () => {
    spyOn(laneComponent, 'parseScoreGame');
    fixtureLaneComponent.detectChanges();
    laneComponent.restart();
    expect(gameServiceSpy.initScoreboard).toHaveBeenCalled();
    expect(laneComponent.parseScoreGame).toHaveBeenCalled();
  });

  it('should display end game message if isEndGame is true', () => {
    spyOn(laneComponent, 'parseScoreGame');
    laneComponent.isEndGame = true;
    fixtureLaneComponent.detectChanges();
    const endGameMessage = fixtureLaneComponent.nativeElement.querySelector('.text-infos').textContent;
    expect(endGameMessage).toContain('End Game');
  });

  it('should display current round and throw if isEndGame is false', () => {
    spyOn(laneComponent, 'parseScoreGame');
    laneComponent.isEndGame = false;
    laneComponent.currentRound = 2;
    laneComponent.currentThrow = 1;
    fixtureLaneComponent.detectChanges();
    const roundAndThrowMessage = fixtureLaneComponent.nativeElement.querySelector('.text-infos').textContent;
    expect(roundAndThrowMessage).toContain('Round: 2 | throw: 1');
  });

  it('should display error message if errorMessage is not empty', () => {
    spyOn(laneComponent, 'parseScoreGame');
    laneComponent.errorMessage = 'Test error message';
    fixtureLaneComponent.detectChanges();
    const errorMessage = fixtureLaneComponent.nativeElement.querySelector('.text-infos').textContent;
    expect(errorMessage).toContain('Test error message');
  });


});

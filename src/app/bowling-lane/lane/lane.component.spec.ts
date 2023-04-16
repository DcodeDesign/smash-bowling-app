import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaneComponent } from './lane.component';
import { GameService } from '../services/game.service';

describe('LaneComponent', () => {
  let component: LaneComponent;
  let fixture: ComponentFixture<LaneComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    const gameServiceSpyObj = jasmine.createSpyObj('GameService', ['updateScoreboard', 'initScoreboard', 'scoreboard']);
    await TestBed.configureTestingModule({
      declarations: [ LaneComponent ],
      providers: [
        { provide: GameService, useValue: gameServiceSpyObj }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaneComponent);
    component = fixture.componentInstance;
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when pins are dropped', () => {
    it('should update the scoreboard and parse the score game', () => {
      const pins = 5;
      const scoreboard = {
        currentRound: 1,
        currentThrow: 2,
        isEndGame: false,
        error: null,
        scores: [
          { totalScore: 10, scoreFrames: [{ pins: 5, score: 5, rest: 5, term: null }] }
        ]
      };
      gameServiceSpy.updateScoreboard.and.returnValue(scoreboard);
      const parseScoreGameSpy = spyOn(component, 'parseScoreGame');
      component.onNumberDroppedPins(pins);
      expect(gameServiceSpy.updateScoreboard).toHaveBeenCalledWith(pins);
      expect(parseScoreGameSpy).toHaveBeenCalled();
    });
  });
});

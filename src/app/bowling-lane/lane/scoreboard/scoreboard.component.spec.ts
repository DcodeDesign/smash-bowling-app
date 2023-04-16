import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreFrameInterface, ScoreInterface } from '../../models/scores.interface';
import { TechnicalTermsEnum } from '../../models/technicalTerms.enum';
import { GameService } from '../../services/game.service';
import {ScoreboardInterface} from '../../models/scoreboard.interface';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let gameService: GameService;
  let scoreboard: ScoreboardInterface;
  let score: ScoreFrameInterface[] = [];
  let currentRound: number;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreboardComponent ],
      providers: [ GameService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    gameService = TestBed.inject(GameService);
    gameService.initScoreboard();
    scoreboard = gameService.scoreboard;
    currentRound = scoreboard.currentRound;
    score = scoreboard.scores;

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    component.scoreFrames = score;
    component.currentRound = currentRound;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have inputs', () => {
    expect(component.scoreFrames).toBeDefined();
    expect(component.currentRound).toBeDefined();
  });

  it('should render the current round', () => {
    component.currentRound = 1; // set the current round
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.highlight span');
    expect(element.textContent.trim()).toBe('1');

    component.currentRound = 2; // set the current round
    fixture.detectChanges();
    const element2 = fixture.nativeElement.querySelector('.highlight span');
    expect(element2.textContent.trim()).toBe('2');

    component.currentRound = 3; // set the current round
    fixture.detectChanges();
    const element3 = fixture.nativeElement.querySelector('.highlight span');
    expect(element3.textContent.trim()).toBe('3');
  });

  it('should render the score frames', () => {
    const scoreFrames: ScoreFrameInterface[] = [
      {
        totalScore: 10,
        scoreFrames: [
          {
            pins: 10,
            score: 10,
            rest: 0,
            term: TechnicalTermsEnum.STRIKE
          }
        ]
      },
      {
        totalScore: 20,
        scoreFrames: [
          {
            pins: 5,
            score: 5,
            rest: 5,
            term: 'HOLE'
          },
          {
            pins: 5,
            score: 5,
            rest: 0,
            term: TechnicalTermsEnum.SPARE
          }
        ]
      }
    ];
    component.scoreFrames = scoreFrames;
    fixture.detectChanges();
    const scoreboardElement = fixture.nativeElement.querySelector('.scoreboard');
    const frames = scoreboardElement.querySelectorAll('.container-score-frames');
    expect(frames.length).toEqual(2);
    expect(frames[0].querySelector('.content-score').textContent).toContain('x');
    expect(frames[1].querySelectorAll('.content-score span')[0].textContent).toContain('5');
    expect(frames[1].querySelectorAll('.content-score span')[1].textContent).toContain('/');
    expect(frames[1].querySelector('.total-score span').textContent).toContain('20');
  });
});

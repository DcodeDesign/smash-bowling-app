import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
    service.initScoreboard();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('Hole test score', () => {
    service.updateScoreboard(4);
    const scoreboard = service.scoreboard;
    expect(scoreboard.currentRound).toEqual(1);
    expect(scoreboard.currentThrow).toEqual(2);
    expect(scoreboard.scores[0].scoreFrames[0].pins).toEqual(4);
    expect(scoreboard.scores[0].scoreFrames[0].score).toEqual(4);
    expect(scoreboard.scores[0].scoreFrames[0].rest).toEqual(6);
    expect(scoreboard.scores[0].scoreFrames[0].term).toEqual('HOLE');
    expect(scoreboard.scores[0].totalScore).toEqual(4);
  });

  it('Spare test score', () => {
    let scoreboard = service.updateScoreboard(2);
    expect(scoreboard.currentRound).toEqual(1);
    expect(scoreboard.currentThrow).toEqual(2);
    expect(scoreboard.scores[0].scoreFrames[0].pins).toEqual(2);
    expect(scoreboard.scores[0].scoreFrames[0].score).toEqual(2);
    expect(scoreboard.scores[0].scoreFrames[0].rest).toEqual(8);
    expect(scoreboard.scores[0].scoreFrames[0].term).toEqual('HOLE');
    expect(scoreboard.scores[0].totalScore).toEqual(2);

    scoreboard = service.updateScoreboard(8);
    expect(scoreboard.currentRound).toEqual(2);
    expect(scoreboard.currentThrow).toEqual(1);
    expect(scoreboard.scores[0].scoreFrames[1].pins).toEqual(8);
    expect(scoreboard.scores[0].scoreFrames[1].score).toEqual(8);
    expect(scoreboard.scores[0].scoreFrames[1].rest).toEqual(0);
    expect(scoreboard.scores[0].scoreFrames[1].term).toEqual('SPARE');
    expect(scoreboard.scores[0].totalScore).toEqual(10); // error
  });

  it('Strike test score', () => {
    service.updateScoreboard(10);
    const scoreboard = service.scoreboard;
    expect(scoreboard.currentRound).toEqual(2);
    expect(scoreboard.currentThrow).toEqual(1);
    expect(scoreboard.scores[0].scoreFrames[0].pins).toEqual(10);
    expect(scoreboard.scores[0].scoreFrames[0].score).toEqual(10);
    expect(scoreboard.scores[0].scoreFrames[0].rest).toEqual(0);
    expect(scoreboard.scores[0].scoreFrames[0].term).toEqual('STRIKE');
    expect(scoreboard.scores[0].totalScore).toEqual(10);
  });

  it('should update scoreboard properly after updating the score in the first throw of the last round', () => {
    const gameService = new GameService();

    for(let i = 0; i <= 9; i++) {
      for(let k = 0; k <= 1; k++) {
        const scoreboard = gameService.updateScoreboard(2);

        if(k === 0) {
          expect(scoreboard.scores[i].scoreFrames[k].pins).toEqual(2);
          expect(scoreboard.scores[i].scoreFrames[k].score).toEqual(2);
          expect(scoreboard.scores[i].scoreFrames[k].rest).toEqual(8);
          expect(scoreboard.scores[i].scoreFrames[k].term).toEqual('HOLE');

        } else if (k === 1) {
          expect(scoreboard.scores[i].scoreFrames[k].pins).toEqual(2);
          expect(scoreboard.scores[i].scoreFrames[k].score).toEqual(2);
          expect(scoreboard.scores[i].scoreFrames[k].rest).toEqual(6);
          expect(scoreboard.scores[i].scoreFrames[k].term).toEqual('HOLE');
        }
      }
    }
  });

  it('should update scoreboard properly after updating the score in the last throw of the last round', () => {
    const gameService = new GameService();

    // Completer les 9 premières manches
    for(let i = 0; i < 9; i++) {
      gameService.updateScoreboard(4);
      gameService.updateScoreboard(3);
    }

    // Effectuer le dernier lancer
    const scoreboard = gameService.updateScoreboard(10);

    // Vérifier que le score final est correct
    expect(scoreboard.currentRound).toEqual(10);
    expect(scoreboard.currentThrow).toEqual(2);
    expect(scoreboard.scores[9].scoreFrames[1].pins).toEqual(0);
    expect(scoreboard.scores[9].scoreFrames[1].score).toEqual(0);
    expect(scoreboard.scores[9].scoreFrames[1].rest).toEqual(10);
    expect(scoreboard.scores[9].scoreFrames[1].term).toEqual(null);
    expect(scoreboard.scores[9].totalScore).toEqual(73);
  });

  it('should handle a game with a mix of strikes and spares', () => {
    const gameService = new GameService();

    // Roll 3 strikes
    gameService.updateScoreboard(10);
    gameService.updateScoreboard(10);
    gameService.updateScoreboard(10);

    // Roll 5 spares
    gameService.updateScoreboard(9);
    gameService.updateScoreboard(1);

    gameService.updateScoreboard(8);
    gameService.updateScoreboard(2);

    gameService.updateScoreboard(6);
    gameService.updateScoreboard(4);

    gameService.updateScoreboard(5);
    gameService.updateScoreboard(5);

    gameService.updateScoreboard(4);
    gameService.updateScoreboard(6);

    // Roll a final strike and spare

    gameService.updateScoreboard(10);
    gameService.updateScoreboard(0);

    gameService.updateScoreboard(10);
    gameService.updateScoreboard(0);

    const scoreboard = gameService.scoreboard;

    // Verify that the score is correct
    expect(scoreboard.currentRound).toEqual(10);
    expect(scoreboard.currentThrow).toEqual(2);
    expect(scoreboard.scores[0].totalScore).toEqual(10);
    expect(scoreboard.scores[1].totalScore).toEqual(20);
    expect(scoreboard.scores[2].totalScore).toEqual(30);
    expect(scoreboard.scores[3].totalScore).toEqual(40);
    expect(scoreboard.scores[4].totalScore).toEqual(50);
    expect(scoreboard.scores[5].totalScore).toEqual(60);
    expect(scoreboard.scores[6].totalScore).toEqual(70);
    expect(scoreboard.scores[7].totalScore).toEqual(80);
    expect(scoreboard.scores[8].totalScore).toEqual(90);
    expect(scoreboard.scores[9].totalScore).toEqual(100);
  });

});

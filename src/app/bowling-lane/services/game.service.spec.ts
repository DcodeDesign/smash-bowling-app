import {TestBed, tick} from '@angular/core/testing';

import { GameService } from './game.service';

describe('Game service', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });
});

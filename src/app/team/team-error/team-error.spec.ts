import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamError } from './team-error';

describe('TeamError', () => {
  let component: TeamError;
  let fixture: ComponentFixture<TeamError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamError],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

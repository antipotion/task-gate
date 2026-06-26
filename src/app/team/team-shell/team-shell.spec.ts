import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamShell } from './team-shell';

describe('TeamShell', () => {
  let component: TeamShell;
  let fixture: ComponentFixture<TeamShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamShell],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

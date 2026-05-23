import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDashboardHeader } from './team-dashboard-header';

describe('TeamDashboardHeader', () => {
  let component: TeamDashboardHeader;
  let fixture: ComponentFixture<TeamDashboardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDashboardHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamDashboardHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

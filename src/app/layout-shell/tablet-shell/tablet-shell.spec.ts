import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletShell } from './tablet-shell';

describe('TabletShell', () => {
  let component: TabletShell;
  let fixture: ComponentFixture<TabletShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabletShell],
    }).compileComponents();

    fixture = TestBed.createComponent(TabletShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

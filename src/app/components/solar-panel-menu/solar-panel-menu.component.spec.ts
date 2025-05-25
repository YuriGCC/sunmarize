import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarPanelMenuComponent } from './solar-panel-menu.component';

describe('SolarPanelMenuComponent', () => {
  let component: SolarPanelMenuComponent;
  let fixture: ComponentFixture<SolarPanelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolarPanelMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolarPanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

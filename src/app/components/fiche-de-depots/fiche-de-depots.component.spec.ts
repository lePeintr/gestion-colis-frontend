import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDeDepotsComponent } from './fiche-de-depots.component';

describe('FicheDeDepotsComponent', () => {
  let component: FicheDeDepotsComponent;
  let fixture: ComponentFixture<FicheDeDepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheDeDepotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheDeDepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

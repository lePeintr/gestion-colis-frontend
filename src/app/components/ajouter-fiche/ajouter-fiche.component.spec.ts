import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFicheComponent } from './ajouter-fiche.component';

describe('AjouterFicheComponent', () => {
  let component: AjouterFicheComponent;
  let fixture: ComponentFixture<AjouterFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterFicheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisParFicheComponent } from './colis-par-fiche.component';

describe('ColisParFicheComponent', () => {
  let component: ColisParFicheComponent;
  let fixture: ComponentFixture<ColisParFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColisParFicheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColisParFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

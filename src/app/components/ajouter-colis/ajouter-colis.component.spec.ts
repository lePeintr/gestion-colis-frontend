import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterColisComponent } from './ajouter-colis.component';

describe('AjouterColisComponent', () => {
  let component: AjouterColisComponent;
  let fixture: ComponentFixture<AjouterColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterColisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

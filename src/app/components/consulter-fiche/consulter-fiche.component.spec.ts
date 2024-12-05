import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFicheComponent } from './consulter-fiche.component';

describe('ConsulterFicheComponent', () => {
  let component: ConsulterFicheComponent;
  let fixture: ComponentFixture<ConsulterFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterFicheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

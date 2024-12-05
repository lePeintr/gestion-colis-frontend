import { Component, OnInit } from '@angular/core';
import { ColisComponent } from '../colis/colis.component';
import { ColisService } from '../../services/colis.service';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Colis } from '../../models/colis.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ajouter-colis',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,ReactiveFormsModule,CommonModule,NgFor, NgIf],
  templateUrl: './ajouter-colis.component.html',
  styleUrl: './ajouter-colis.component.css'
})
export class AjouterColisComponent implements OnInit{

  newColisFormGroup!:FormGroup;
  colis!:Colis;
  idFiche!: number;
  constructor(private fb:FormBuilder,
    private colisService:ColisService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.newColisFormGroup=this.fb.group({
      numeroDuConteneur:this.fb.control(null),
      descriptionColis: this.fb.control(null),
      quantite: this.fb.control(null),
      longueur: this.fb.control(null),
      lageur: this.fb.control(null),
      hauteur: this.fb.control(null),
      coutParMetreCube: this.fb.control(null),
      idFicheDeDepot: this.fb.control(null),
      })
  }
  
  handleAjouterColis(){
     this.colis=this.newColisFormGroup.value;
     this.idFiche=this.newColisFormGroup.value.idFicheDeDepot
    this.colisService.ajouterUnColis(this.idFiche,this.colis).subscribe({
      next:(colis)=>{
        alert("colis ajouté avec succès");
        this.newColisFormGroup.reset();
      },
      error:(err)=>{

      }
    }) 

  }
  goBack(){
    this.router.navigate(['/colis']);

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FicheService } from '../../services/fiche.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FicheDeDepot } from '../../models/ficheDeDepot.model';

@Component({
  selector: 'app-ajouter-fiche',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,ReactiveFormsModule,CommonModule,NgFor, NgIf],
  templateUrl: './ajouter-fiche.component.html',
  styleUrl: './ajouter-fiche.component.css'
})
export class AjouterFicheComponent implements OnInit{
  newFicheFormGroup!:FormGroup;
  fiche!:FicheDeDepot;
  constructor(private fb:FormBuilder,
    private ficheService:FicheService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.newFicheFormGroup=this.fb.group({
      numeroDuConteneur:this.fb.control(null),
      nomExpediteur:this.fb.control(null),
      numeroExpediteur:this.fb.control(null),
      nomDuDestinataire:this.fb.control(null),
      numeroDestinataire:this.fb.control(null),
      destination:this.fb.control(null)
      })
  }
  
  handleAjouterFiche(){
    this.fiche=this.newFicheFormGroup.value;
    this.ficheService.ajouterUneFiche(this.fiche).subscribe({
      next:(fiche)=>{
        alert("fiche ajouté avec succès");
        this.newFicheFormGroup.reset();
      },
      error:(err)=>{

      }
    })

  }
  goBack(){
    this.router.navigate(['/fiche-de-depot']);

  }
}

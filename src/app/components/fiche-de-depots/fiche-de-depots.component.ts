import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf ,CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FicheService } from '../../services/fiche.service';
import { FicheDeDepot } from '../../models/ficheDeDepot.model';
@Component({
  selector: 'app-fiche-de-depots',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf ,CommonModule],
  templateUrl: './fiche-de-depots.component.html',
  styleUrl: './fiche-de-depots.component.css'
})
export class FicheDeDepotsComponent implements OnInit{
  listeFiches!: FicheDeDepot[]
  
  constructor(private route:Router,private ficheService:FicheService){}
  ngOnInit(): void {
    this.afficherToutesLesFiches();
  }
  handleConsulterFiche(f:FicheDeDepot){
    this.route.navigateByUrl("/consulter-fiche/"+f.idFicheDeDepot);
  }

  afficherToutesLesFiches(){
    this.ficheService.listerToutesLesFiches().subscribe(
     { next:(fiches)=>{
      this.listeFiches = fiches
      console.log(this.listeFiches)
      },
      error:(err)=>{

      }
    }
    )
  }
  handleSupprimerFiche(f:FicheDeDepot){
    let conf = confirm("Are you sure?");
    if( conf==false) return;
    this.ficheService.supprimerFiche(f.idFicheDeDepot).subscribe({
    next: (data)=>{
      //this.handleGetAllProducts(); //ici on supprime dans le backend et on repart vers le backend pour listes tous
      // les produits de nouveau: procédure lourde
      let index = this.listeFiches.indexOf(f);
        this.listeFiches.splice(index,1); //on supprime l'element à partir de son index dans le tableau
     }
     })
  }



  
}

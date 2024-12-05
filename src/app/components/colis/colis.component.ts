import { Component, OnInit } from '@angular/core';
import { Colis } from '../../models/colis.model';
import { ColisService } from '../../services/colis.service';
import { Router } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-colis',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf ,CommonModule],
  templateUrl: './colis.component.html',
  styleUrl: './colis.component.css'
})
export class ColisComponent implements OnInit{
  listeColis!: Colis[]
  volumeDuColis!: number;
  coutTotalDuColis!: number;
  constructor(private route:Router,private colisService:ColisService){}
  ngOnInit(): void {
    this.afficherTousLesColis();
  }

  afficherTousLesColis(){
    this.colisService.listerToutesLesColis().subscribe(
     { next:(colis)=>{
      this.listeColis = colis
      console.log(this.listeColis)
      this.listeColis.forEach((colis) => {
        this.colisService.volumeTotalColis(colis.idColis).subscribe({
          next: (volume) => {
            colis.volume = volume;
            console.log(colis.idColis+":"+this.volumeDuColis);
          },
          error: (err) => {
            console.error(`Erreur pour volume du colis ${colis.idColis}`, err);
          }
        });
         // Appeler API pour le coût
         this.colisService.coutTotalColis(colis.idColis).subscribe({
          next: (cout) => {
            colis.cout = cout;
            console.log(colis.idColis+":"+this.coutTotalDuColis);
          },
          error: (err) => {
            console.error(`Erreur pour coût du colis ${colis.idColis}`, err);
          }
        });
      })
      },
      error:(err)=>{

      }
    }
    )
  

  }
}

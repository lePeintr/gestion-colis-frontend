import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheService } from '../../services/fiche.service';
import { FicheDeDepot } from '../../models/ficheDeDepot.model';
import { NgFor,NgIf } from '@angular/common';
import jsPDF from 'jspdf';
import { ExportService } from '../../services/export.service';
//import html2canvas from 'html2canvas';
import 'jspdf/dist/polyfills.es';
import { ColisService } from '../../services/colis.service';
import { Colis } from '../../models/colis.model';

@Component({
  selector: 'app-consulter-fiche',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './consulter-fiche.component.html',
  styleUrl: './consulter-fiche.component.css'
})
export class ConsulterFicheComponent implements OnInit {
  ficheDepot = {
    numero: 'FD12345',
    expediteur: 'John Doe',
    destinataire: 'Jane Smith',
    destination: 'Paris, France',
    date: new Date(),
    total: 200.5,
    colis: [
      { id: 1, description: 'Colis 1', poids: 5 },
      { id: 2, description: 'Colis 2', poids: 3.2 },
    ],
  }
  ficheDeDepot!: FicheDeDepot;
  listeColisParFiche!: Colis[];
  volumeDuColis!: number;
  coutTotalDuColis!: number;
  idFiche!: number;
  quantiteTotal!: number;
  coutTotal!: number;
  constructor(private router:Router,private ficheService:FicheService,
    private route:ActivatedRoute,private exportService:ExportService,
    private colisService:ColisService
  ){this.idFiche=this.route.snapshot.params['idFiche']}
  ngOnInit(): void {
    this.afficherLaFicheSelectionnee()
  }

  goBack(): void {
    this.router.navigate(['/fiche-de-depot']);
  }

  afficherLaFicheSelectionnee(){
    console.log("idFiche:"+this.idFiche)
    this.ficheService.consulterUneFiche(this.idFiche).subscribe({
      next:(fiche)=>{
        this.ficheDeDepot=fiche;
        this.afficherLesColisParFiche();
        console.log(fiche);
      },
      error:(err)=>{

      }
    })
    this.colisService.quantiteTotalColisParFiche(this.idFiche).subscribe({
      next:(quantite)=>{
        this.quantiteTotal=quantite;
        this.afficherLesColisParFiche();
        console.log(quantite);
      },
      error:(err)=>{

      }
    })
    this.colisService.coutTotalColisParFiche(this.idFiche).subscribe({
      next:(cout)=>{
        this.coutTotal=cout;
        this.afficherLesColisParFiche();
        console.log(this.coutTotal);
      },
      error:(err)=>{

      }
    })
  }

  afficherLesColisParFiche(){
    console.log('idFiche:', this.idFiche);

    // Récupérer tous les colis par fiche
    this.colisService.listerToutesLesFiches(this.idFiche).subscribe({
      next: (colisList) => {
        this.listeColisParFiche = colisList; // Récupère la liste des colis
        console.log('Colis récupérés:', this.listeColisParFiche);
  
        // Initialiser les totaux
        this.volumeDuColis = 0;
        this.coutTotalDuColis = 0;
  
        // Parcourir chaque colis pour calculer les totaux
        this.listeColisParFiche.forEach((colis) => {
          // Appeler API pour le volume
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
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des colis:', err);
      }
    });
  }

  





























































  async exporter() {
    /* try {
      // Sélectionner l'élément HTML à exporter
      const element = document.querySelector('.container.my-4');
  
      if (!element) {
        console.error('Élément non trouvé');
        return;
      }
  
      // Utiliser html2canvas pour capturer l'élément
      //const canvas = await html2canvas(element)  as HTMLCanvasElement; // canvas est de type HTMLCanvasElement
  
   
  
      // Convertir le canvas en image
      //const imgData = canvas.toDataURL('image/png');
  
      // Créer un document PDF avec jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Ajouter l'image au PDF
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      // Enregistrer le PDF
      pdf.save('fiche-depot.pdf');
    } catch (error) {
      console.error('Erreur lors de l\'exportation en PDF', error);
    } */
  }  

  exportAsPDF() {
    const columns = ['ID', 'Description', 'Poids'];
    const data = this.ficheDepot.colis.map((colis) => [
      colis.id,
      colis.description,
      colis.poids,
    ]);
    this.exportService.exportToPDF(data, columns, `Fiche_Depot_${this.ficheDepot.numero}`);
  }

  exportAsPDFBis() {
    try {
      const element = document.querySelector('.container.my-4') as HTMLElement;
      if (!element) {
        console.error('Élément non trouvé');
        return;
      }
  
      // Masquer les boutons temporairement
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => button.style.display = 'none');
  
      // Obtenez la hauteur du contenu HTML
      const contentHeight = element.scrollHeight;
      const pdfHeight = (contentHeight * 0.264583); // Convertir pixels en mm (1px = 0.264583mm)
  
      const pdf = new jsPDF('p', 'mm', [pdfHeight, 210]); // Hauteur dynamique, largeur fixe (210 mm pour A4)
  
      pdf.html(element, {
        callback: (pdf) => {
          // Réafficher les boutons après l'exportation
          buttons.forEach(button => button.style.display = 'block');
  
          // Enregistrez le PDF
          pdf.save(`Fiche_Depot_${this.ficheDeDepot.idFicheDeDepot}.pdf`);
        },
        x: 10, // Marges à gauche
        y: 10, // Marges en haut
        width: 190, // Largeur capturée
        windowWidth: 800 // Largeur de la fenêtre de l'élément capturé
      });
    } catch (error) {
      console.error('Erreur lors de l\'exportation en PDF', error);
    }
  /*   try {
      const element = document.querySelector('.container.my-4') as HTMLElement;
      if (!element) {
        console.error('Élément non trouvé');
        return;
      }
  
      // Masquer les boutons temporairement
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => button.style.display = 'none');
  
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      pdf.html(element, {
        callback: (pdf) => {
          // Afficher les boutons à nouveau
          buttons.forEach(button => button.style.display = 'block');
  
          // Enregistrez le PDF
          pdf.save(`Fiche_Depot_${this.ficheDeDepot.idFicheDeDepot}.pdf`);
        },
        x: 10, // Réduire les marges gauche
        y: 10, // Réduire les marges en haut
        width: 190, // Ajuster la largeur pour éviter de dépasser la page
        windowWidth: 800 // Adapter la largeur du rendu pour capturer l'intégralité du contenu
      });
    } catch (error) {
      console.error('Erreur lors de l\'exportation en PDF', error);
    } */
  /*   try {
      // Sélectionnez l'élément HTML à exporter
      const element = document.querySelector('.container.my-4') as HTMLElement;
      if (!element) {
        console.error('Élément non trouvé');
        return;
      }
  
      // Masquer les boutons avant de capturer l'élément
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => button.style.display = 'none');
  
      // Créez une instance de jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Utilisez la méthode html() pour ajouter le contenu HTML
      pdf.html(element, {
        callback: (pdf) => {
          // Afficher à nouveau les boutons après la capture
          buttons.forEach(button => button.style.display = 'block');
  
          // Enregistrez le PDF
          pdf.save(`Fiche_Depot_${this.ficheDeDepot.idFicheDeDepot}.pdf`);
        },
        x: 10, // Décalage horizontal
        y: 10, // Décalage vertical
        width: 190, // Largeur de la page PDF (en mm)
        windowWidth: 800, // Largeur de la fenêtre de l'élément HTML à capturer
      });
    } catch (error) {
      console.error('Erreur lors de l\'exportation en PDF', error);
    } */
}
}


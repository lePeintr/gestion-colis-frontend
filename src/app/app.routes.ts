import { Routes } from '@angular/router';
import { AcceuilPageComponent } from './components/acceuil-page/acceuil-page.component';
import { FicheDeDepotsComponent } from './components/fiche-de-depots/fiche-de-depots.component';
import { AjouterFicheComponent } from './components/ajouter-fiche/ajouter-fiche.component';
import { ColisComponent } from './components/colis/colis.component';
import { AjouterColisComponent } from './components/ajouter-colis/ajouter-colis.component';
import { ConsulterFicheComponent } from './components/consulter-fiche/consulter-fiche.component';

export const routes: Routes = [
    {path:"",component:AcceuilPageComponent},
    {path:"fiche-de-depot",component:FicheDeDepotsComponent},
    {path:"ajouter-fiche",component:AjouterFicheComponent},
    {path:"colis",component:ColisComponent},
    {path:"ajouter-colis",component:AjouterColisComponent},
    {path:"consulter-fiche/:idFiche",component:ConsulterFicheComponent}
];


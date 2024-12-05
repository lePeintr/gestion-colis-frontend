import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheDeDepot } from '../models/ficheDeDepot.model';
import { environnement } from '../../environnements/environnement';
@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(private http: HttpClient) {}

  public listerToutesLesFiches():Observable<FicheDeDepot[]>{
    return this.http.get<Array<FicheDeDepot>>(environnement.backendFiche+"/fiches");
  }

  public consulterUneFiche(idFiche:number):Observable<FicheDeDepot>{
    return this.http.get<FicheDeDepot>(environnement.backendFiche+"/fiches/"+idFiche);
  }

  public ajouterUneFiche(fiche:FicheDeDepot):Observable<FicheDeDepot>{
    return this.http.post<FicheDeDepot>(environnement.backendFiche+"/ajouterFiche",fiche);
  }

  public supprimerFiche(idFiche:number){
    return this.http.delete<FicheDeDepot>(environnement.backendFiche+"/fiches/"+idFiche);
  }
}

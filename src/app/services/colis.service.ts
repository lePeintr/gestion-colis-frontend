import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Colis } from '../models/colis.model';
import { Observable } from 'rxjs';
import { environnement } from '../../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class ColisService {

  constructor(private http: HttpClient) { }

  public listerToutesLesFiches(idFiche:number):Observable<Colis[]>{
    return this.http.get<Array<Colis>>(environnement.backendColis+"/colis-liste/"+idFiche);
  }
  public volumeTotalColis(idColis:string):Observable<number>{
    return this.http.get<number>(environnement.backendColis+"/colis/volume/"+idColis);
  }
  public coutTotalColis(idColis:string):Observable<number>{
    return this.http.get<number>(environnement.backendColis+"/colis/cout/"+idColis);
  }
  public coutTotalColisParFiche(idFiche:number):Observable<number>{
    return this.http.get<number>(environnement.backendColis+"/colis/"+idFiche+"/coutColis");
  }
  public quantiteTotalColisParFiche(idFiche:number):Observable<number>{
    return this.http.get<number>(environnement.backendColis+"/colis/"+idFiche+"/totalColis");
  }
  public ajouterUnColis(idFiche:number,colis:Colis):Observable<Colis>{
    return this.http.post<Colis>(environnement.backendColis+"/"+idFiche+"/ajouterColis",colis);
  }
  public listerToutesLesColis():Observable<Colis[]>{
    return this.http.get<Array<Colis>>(environnement.backendColis+"/colis");
  }
}

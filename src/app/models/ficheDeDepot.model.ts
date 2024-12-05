export interface FicheDeDepot {
    idFicheDeDepot: number;
    numeroDuConteneur: string;
    nomExpediteur: string;
    numeroExpediteur: number;
    emailExpediteur: string;
    nombreTotalColis: string;
    dateDeDepotDuColis: Date;
    nomDuDestinataire: string;
    numeroDestinataire: number;
    emailDestinataire: string;
    destination: string;
    coutTotalDesColis: number
    idConteneur: string;
}
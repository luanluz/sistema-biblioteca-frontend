export interface LivroRequest {
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    valorEmCentavos: number;
    autoresCodigos: number[];
    assuntosCodigos: number[];
}

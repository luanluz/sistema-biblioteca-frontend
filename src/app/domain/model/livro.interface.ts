import { BaseInterface } from '@core/types/base.interface';
import { Assunto } from '@domain/model/assunto.interface';
import { Autor } from '@domain/model/autor.interface';

export interface Livro extends BaseInterface {
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    valorEmCentavos: number;
    autores: Autor[];
    assuntos: Assunto[];
}

import { Autor } from '@domain/model/autor.interface';
import { AutorRequest } from '@domain/model/request/autor-request.interface';

export class AutorMapper {
    static toRequest(autor: Partial<Autor>): Partial<AutorRequest> {
        const request: Partial<AutorRequest> = {};

        if (autor.nome !== undefined) {
            request.nome = autor.nome;
        }

        return request;
    }
}

import { Assunto } from '@domain/model/assunto.interface';
import { AssuntoRequest } from '@domain/model/request/assunto-request.interface';

export class AssuntoMapper {
    static toRequest(assunto: Partial<Assunto>): Partial<AssuntoRequest> {
        const request: Partial<AssuntoRequest> = {};

        if (assunto.descricao !== undefined) {
            request.descricao = assunto.descricao;
        }

        return request;
    }
}

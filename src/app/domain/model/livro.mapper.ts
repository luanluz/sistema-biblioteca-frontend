import { Livro } from '@domain/model/livro.interface';
import { LivroRequest } from '@domain/model/request/livro-request.interface';

export class LivroMapper {
    static toRequest(livro: Partial<Livro>): Partial<LivroRequest> {
        const request: Partial<LivroRequest> = {};

        if (livro.titulo !== undefined) {
            request.titulo = livro.titulo;
        }

        if (livro.editora !== undefined) {
            request.editora = livro.editora;
        }

        if (livro.edicao !== undefined) {
            request.edicao = livro.edicao;
        }

        if (livro.anoPublicacao !== undefined) {
            request.anoPublicacao = livro.anoPublicacao;
        }

        if (livro.valorEmCentavos !== undefined) {
            request.valorEmCentavos = livro.valorEmCentavos;
        }

        if (livro.autores !== undefined) {
            request.autoresCodigos = livro.autores.map((autor) => autor.codigo);
        }

        if (livro.assuntos !== undefined) {
            request.assuntosCodigos = livro.assuntos.map((assunto) => assunto.codigo);
        }

        return request;
    }
}

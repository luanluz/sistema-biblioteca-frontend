import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRestService } from '@core/services/base-rest.service';
import { Livro } from '@domain/model/livro.interface';
import { LivroRequest } from '@domain/model/request/livro-request.interface';

@Injectable({
    providedIn: 'root',
})
export class LivroService extends BaseRestService<Livro, LivroRequest> {
    constructor(http: HttpClient) {
        super(http, { endpoint: '/livro' });
    }
}

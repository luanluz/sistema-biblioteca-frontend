import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRestService } from '@core/services/base-rest.service';
import { Livro } from '@domain/model/livro.interface';

@Injectable({
    providedIn: 'root',
})
export class LivroService extends BaseRestService<Livro> {
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor(http: HttpClient) {
        super(http, { endpoint: '/livro' });
    }
}

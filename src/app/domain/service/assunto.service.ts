import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRestService } from '@core/services/base-rest.service';
import { Assunto } from '@domain/model/assunto.interface';

@Injectable({
    providedIn: 'root',
})
export class AssuntoService extends BaseRestService<Assunto> {
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor(http: HttpClient) {
        super(http, { endpoint: '/assunto' });
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRestService } from '@core/services/base-rest.service';
import { Assunto } from '@domain/model/assunto.interface';
import { AssuntoRequest } from '@domain/model/request/assunto-request.interface';

@Injectable({
    providedIn: 'root',
})
export class AssuntoService extends BaseRestService<Assunto, AssuntoRequest> {
    constructor(http: HttpClient) {
        super(http, { endpoint: '/assunto' });
    }
}

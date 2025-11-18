import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRestService } from '@core/services/base-rest.service';
import { Autor } from '@domain/model/autor.interface';
import { AutorRequest } from '@domain/model/request/autor-request.interface';

@Injectable({
    providedIn: 'root',
})
export class AutorService extends BaseRestService<Autor, AutorRequest> {
    constructor(http: HttpClient) {
        super(http, { endpoint: '/autor' });
    }
}

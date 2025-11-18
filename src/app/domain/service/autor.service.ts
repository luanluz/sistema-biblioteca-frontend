import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseRestService } from '@core/services/base-rest.service';
import { Autor } from '@domain/model/autor.interface';

@Injectable({
    providedIn: 'root',
})
export class AutorService extends BaseRestService<Autor> {
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor(http: HttpClient) {
        super(http, { endpoint: '/autor' });
    }
}

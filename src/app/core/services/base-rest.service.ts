import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseInterface } from '@core/types/base.interface';
import { PageableRequest, PageResponse } from '@core/types/page.interface';
import { environment } from '@environments/environment';

export interface BaseServiceConfig {
    endpoint: string;
    apiBase?: string;
}

export abstract class BaseRestService<RESPONSE extends BaseInterface, REQUEST> {
    protected readonly baseUrl: string;
    protected readonly endpoint: string;

    protected constructor(
        protected http: HttpClient,
        protected config: BaseServiceConfig,
    ) {
        this.endpoint = config.endpoint;
        this.baseUrl = config.apiBase || environment.api.backend;
    }

    findAll(params: PageableRequest = {}): Observable<PageResponse<RESPONSE>> {
        const { page = 0, size = 20, sort } = params;

        const validatedPage = Math.max(0, page);
        const validatedSize = Math.min(Math.max(1, size), 100);

        let httpParams = new HttpParams()
            .set('page', validatedPage.toString())
            .set('size', validatedSize.toString());

        if (sort && sort.field && sort.direction) {
            httpParams = httpParams.set('sort', `${sort.field},${sort.direction}`);
        }

        return this.http.get<PageResponse<RESPONSE>>(`${this.baseUrl}${this.endpoint}`, {
            params: httpParams,
        });
    }

    findById(id: number): Observable<RESPONSE> {
        return this.http.get<RESPONSE>(`${this.baseUrl}${this.endpoint}/${id}`);
    }

    create(entity: Partial<REQUEST>): Observable<RESPONSE> {
        return this.http.post<RESPONSE>(`${this.baseUrl}${this.endpoint}`, entity);
    }

    update(id: number, entity: Partial<REQUEST>): Observable<RESPONSE> {
        return this.http.put<RESPONSE>(`${this.baseUrl}${this.endpoint}/${id}`, entity);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`);
    }
}

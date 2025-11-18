import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RelatorioService {
    private readonly baseUrl: string;
    private readonly endpoint: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.api.backend;
        this.endpoint = '/relatorio';
    }

    downloadRelatorioAutoresPDF(): Observable<Blob> {
        return this.http.get(`${this.baseUrl}${this.endpoint}/autor/pdf`, {
            responseType: 'blob',
            observe: 'body',
        });
    }

    downloadRelatorioAutoresExcel(): Observable<Blob> {
        return this.http.get(`${this.baseUrl}${this.endpoint}/autor/excel`, {
            responseType: 'blob',
            observe: 'body',
        });
    }

    saveFile(blob: Blob, filename: string): void {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    baixarPDF(): void {
        this.downloadRelatorioAutoresPDF().subscribe({
            next: (blob) => {
                this.saveFile(blob, 'relatorio_autores.pdf');
            },
            error: (error) => {
                console.error('Erro ao baixar relatório PDF:', error);
            },
        });
    }

    baixarExcel(): void {
        this.downloadRelatorioAutoresExcel().subscribe({
            next: (blob) => {
                this.saveFile(blob, 'relatorio_autores.xlsx');
            },
            error: (error) => {
                console.error('Erro ao baixar relatório Excel:', error);
            },
        });
    }
}

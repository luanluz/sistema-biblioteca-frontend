import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { PageableRequest } from '@core/types/page.interface';
import { Autor } from '@domain/model/autor.interface';
import { AutorService } from '@domain/service/autor.service';
import { AutorFormComponent } from '@features/autor/components/autor-form/autor-form.component';
import { AutorViewComponent } from '@features/autor/components/autor-view/autor-view.component';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-autor',
    templateUrl: './autor.page.html',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialog,
        ButtonModule,
        ButtonGroupModule,
        AutorFormComponent,
        AutorViewComponent,
    ],
    providers: [ConfirmationService],
})
export class AutorPage implements OnInit {
    autores: Autor[] = [];
    loading = false;

    rows = 20;
    totalRecords = 0;
    currentPage = 0;

    formDrawerVisible = false;
    selectedAutorCodigo?: number;

    viewDrawerVisible = false;
    viewAutorCodigo?: number;

    constructor(
        private autorService: AutorService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit() {
        this.loadAutores();
    }

    loadAutores() {
        this.loading = true;

        const params: PageableRequest = {
            page: this.currentPage,
            size: this.rows,
            sort: { field: 'codigo', direction: 'asc' },
        };

        this.autorService.findAll(params).subscribe({
            next: (response) => {
                this.autores = response.content;
                this.totalRecords = response.page.totalElements;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar autores:', error);
            },
        });
    }

    openNew() {
        this.selectedAutorCodigo = undefined;
        this.formDrawerVisible = true;
    }

    editAutor(autor: Autor) {
        this.selectedAutorCodigo = autor.codigo;
        this.formDrawerVisible = true;
    }

    viewAutor(autor: Autor) {
        this.viewAutorCodigo = autor.codigo;
        this.viewDrawerVisible = true;
    }

    onSaveSuccess() {
        this.loadAutores();
    }

    onPageChange(event: { first: number; rows: number }) {
        this.currentPage = (event.first / event.rows) | 0;
        this.rows = event.rows;
        this.loadAutores();
    }

    deleteAutor(autor: Autor) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir "${autor.nome}"?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Não',
                severity: 'secondary',
                variant: 'text',
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Sim',
            },
            accept: () => {
                this.autorService.delete(autor.codigo).subscribe({
                    next: () => {
                        this.autores = this.autores.filter((val) => val.codigo !== autor.codigo);

                        if (this.autores.length === 0 && this.currentPage > 0) {
                            this.currentPage--;
                            this.loadAutores();
                        }

                        this.toastService.success('Autor excluído');
                    },
                    error: (error) => {
                        console.error('Erro ao excluir autor:', error);
                    },
                });
            },
        });
    }
}

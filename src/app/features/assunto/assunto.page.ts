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
import { Assunto } from '@domain/model/assunto.interface';
import { AssuntoService } from '@domain/service/assunto.service';
import { AssuntoFormComponent } from '@features/assunto/components/assunto-form/assunto-form.component';
import { AssuntoViewComponent } from '@features/assunto/components/assunto-view/assunto-view.component';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-assunto',
    templateUrl: './assunto.page.html',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialog,
        ButtonModule,
        ButtonGroupModule,
        AssuntoFormComponent,
        AssuntoViewComponent,
    ],
    providers: [ConfirmationService],
})
export class AssuntoPage implements OnInit {
    assuntos: Assunto[] = [];
    loading = false;

    rows = 20;
    totalRecords = 0;
    currentPage = 0;

    formDrawerVisible = false;
    selectedAssuntoCodigo?: number;

    viewDrawerVisible = false;
    viewAssuntoCodigo?: number;

    constructor(
        private assuntoService: AssuntoService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit() {
        this.loadAssuntos();
    }

    loadAssuntos() {
        this.loading = true;

        const params: PageableRequest = {
            page: this.currentPage,
            size: this.rows,
            sort: { field: 'codigo', direction: 'asc' },
        };

        this.assuntoService.findAll(params).subscribe({
            next: (response) => {
                this.assuntos = response.content;
                this.totalRecords = response.page.totalElements;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar assuntos:', error);
            },
        });
    }

    openNew() {
        this.selectedAssuntoCodigo = undefined;
        this.formDrawerVisible = true;
    }

    editAssunto(assunto: Assunto) {
        this.selectedAssuntoCodigo = assunto.codigo;
        this.formDrawerVisible = true;
    }

    viewAssunto(assunto: Assunto) {
        this.viewAssuntoCodigo = assunto.codigo;
        this.viewDrawerVisible = true;
    }

    onSaveSuccess() {
        this.loadAssuntos();
    }

    onPageChange(event: { first: number; rows: number }) {
        this.currentPage = (event.first / event.rows) | 0;
        this.rows = event.rows;
        this.loadAssuntos();
    }

    deleteAssunto(assunto: Assunto) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir "${assunto.descricao}"?`,
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
                this.assuntoService.delete(assunto.codigo).subscribe({
                    next: () => {
                        this.assuntos = this.assuntos.filter(
                            (val) => val.codigo !== assunto.codigo,
                        );

                        if (this.assuntos.length === 0 && this.currentPage > 0) {
                            this.currentPage--;
                            this.loadAssuntos();
                        }

                        this.toastService.success('Assunto excluído');
                    },
                    error: (error) => {
                        console.error('Erro ao excluir assunto:', error);
                    },
                });
            },
        });
    }
}

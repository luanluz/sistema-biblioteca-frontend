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
import { Livro } from '@domain/model/livro.interface';
import { LivroService } from '@domain/service/livro.service';
import { LivroFormComponent } from '@features/livro/components/livro-form/livro-form.component';
import { LivroViewComponent } from '@features/livro/components/livro-view/livro-view.component';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-livro',
    templateUrl: './livro.page.html',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialog,
        ButtonModule,
        ButtonGroupModule,
        LivroFormComponent,
        LivroViewComponent,
    ],
    providers: [ConfirmationService],
})
export class LivroPage implements OnInit {
    livros: Livro[] = [];
    loading = false;

    rows = 20;
    totalRecords = 0;
    currentPage = 0;

    formDrawerVisible = false;
    selectedLivroCodigo?: number;

    viewDrawerVisible = false;
    viewLivroCodigo?: number;

    constructor(
        private livroService: LivroService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit() {
        this.loadLivros();
    }

    loadLivros() {
        this.loading = true;

        const params: PageableRequest = {
            page: this.currentPage,
            size: this.rows,
            sort: { field: 'codigo', direction: 'asc' },
        };

        this.livroService.findAll(params).subscribe({
            next: (response) => {
                this.livros = response.content;
                this.totalRecords = response.page.totalElements;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar livros:', error);
            },
        });
    }

    openNew() {
        this.selectedLivroCodigo = undefined;
        this.formDrawerVisible = true;
    }

    editLivro(livro: Livro) {
        this.selectedLivroCodigo = livro.codigo;
        this.formDrawerVisible = true;
    }

    viewLivro(livro: Livro) {
        this.viewLivroCodigo = livro.codigo;
        this.viewDrawerVisible = true;
    }

    onSaveSuccess() {
        this.loadLivros();
    }

    onPageChange(event: { first: number; rows: number }) {
        this.currentPage = (event.first / event.rows) | 0;
        this.rows = event.rows;
        this.loadLivros();
    }

    deleteLivro(livro: Livro) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir "${livro.titulo}"?`,
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
                this.livroService.delete(livro.codigo).subscribe({
                    next: () => {
                        this.livros = this.livros.filter((val) => val.codigo !== livro.codigo);

                        if (this.livros.length === 0 && this.currentPage > 0) {
                            this.currentPage--;
                            this.loadLivros();
                        }

                        this.toastService.success('Livro excluído');
                    },
                    error: (error) => {
                        console.error('Erro ao excluir livro:', error);
                    },
                });
            },
        });
    }
}

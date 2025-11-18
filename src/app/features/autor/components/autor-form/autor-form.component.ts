import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Autor } from '@domain/model/autor.interface';
import { AutorMapper } from '@domain/model/autor.mapper';
import { AutorService } from '@domain/service/autor.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-autor-form',
    templateUrl: './autor-form.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DrawerModule,
        InputTextModule,
        ButtonModule,
        ProgressSpinnerModule,
    ],
})
export class AutorFormComponent implements OnChanges {
    @Input() visible = false;
    @Input() autorCodigo?: number;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() eventEmitterSave = new EventEmitter<void>();

    autor: Partial<Autor> = {};
    submitted = false;
    loading = false;
    isEditMode = false;

    constructor(
        private autorService: AutorService,
        private toastService: ToastService,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible'] && this.visible) {
            if (this.autorCodigo) {
                this.isEditMode = true;
                this.loadAutor(this.autorCodigo);
            } else {
                this.isEditMode = false;
                this.resetForm();
            }
        }
    }

    loadAutor(codigo: number) {
        this.loading = true;
        this.autorService.findById(codigo).subscribe({
            next: (autor) => {
                this.autor = { ...autor };
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar autor:', error);
                this.hideDrawer();
            },
        });
    }

    resetForm() {
        this.autor = {};
        this.submitted = false;
    }

    hideDrawer() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.submitted = false;
    }

    saveAutor() {
        this.submitted = true;

        if (!this.autor.nome?.trim()) {
            this.toastService.error('Nome é obrigatório');
            return;
        }

        this.loading = true;
        const request = AutorMapper.toRequest(this.autor);

        if (this.autor.codigo) {
            this.autorService.update(this.autor.codigo, request).subscribe({
                next: () => {
                    this.toastService.success('Autor atualizado');
                    this.loading = false;
                    this.hideDrawer();
                    this.eventEmitterSave.emit();
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Erro ao atualizar autor:', error);
                },
            });

            return;
        }

        this.autorService.create(request).subscribe({
            next: () => {
                this.toastService.success('Autor criado');
                this.loading = false;
                this.hideDrawer();
                this.eventEmitterSave.emit();
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao criar autor:', error);
            },
        });
    }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Assunto } from '@domain/model/assunto.interface';
import { AssuntoMapper } from '@domain/model/assunto.mapper';
import { AssuntoService } from '@domain/service/assunto.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-assunto-form',
    templateUrl: './assunto-form.component.html',
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
export class AssuntoFormComponent implements OnChanges {
    @Input() visible = false;
    @Input() assuntoCodigo?: number;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() eventEmitterSave = new EventEmitter<void>();

    assunto: Partial<Assunto> = {};
    submitted = false;
    loading = false;
    isEditMode = false;

    constructor(
        private assuntoService: AssuntoService,
        private toastService: ToastService,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible'] && this.visible) {
            if (this.assuntoCodigo) {
                this.isEditMode = true;
                this.loadAssunto(this.assuntoCodigo);
            } else {
                this.isEditMode = false;
                this.resetForm();
            }
        }
    }

    loadAssunto(codigo: number) {
        this.loading = true;
        this.assuntoService.findById(codigo).subscribe({
            next: (assunto) => {
                this.assunto = { ...assunto };
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar assunto:', error);
                this.hideDrawer();
            },
        });
    }

    resetForm() {
        this.assunto = {};
        this.submitted = false;
    }

    hideDrawer() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.submitted = false;
    }

    saveAssunto() {
        this.submitted = true;

        if (!this.assunto.descricao?.trim()) {
            this.toastService.error('Descrição é obrigatória');
            return;
        }

        this.loading = true;
        const request = AssuntoMapper.toRequest(this.assunto);

        if (this.assunto.codigo) {
            this.assuntoService.update(this.assunto.codigo, request).subscribe({
                next: () => {
                    this.toastService.success('Assunto atualizado');
                    this.loading = false;
                    this.hideDrawer();
                    this.eventEmitterSave.emit();
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Erro ao atualizar assunto:', error);
                },
            });

            return;
        }

        this.assuntoService.create(request).subscribe({
            next: () => {
                this.toastService.success('Assunto criado');
                this.loading = false;
                this.hideDrawer();
                this.eventEmitterSave.emit();
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao criar assunto:', error);
            },
        });
    }
}

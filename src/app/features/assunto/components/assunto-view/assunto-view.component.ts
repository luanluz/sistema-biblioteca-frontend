import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Assunto } from '@domain/model/assunto.interface';
import { AssuntoService } from '@domain/service/assunto.service';

@Component({
    selector: 'app-assunto-view',
    templateUrl: './assunto-view.component.html',
    standalone: true,
    imports: [CommonModule, DrawerModule, ButtonModule, ProgressSpinnerModule],
})
export class AssuntoViewComponent implements OnChanges {
    @Input() visible = false;
    @Input() assuntoCodigo?: number;
    @Output() visibleChange = new EventEmitter<boolean>();

    assunto?: Assunto;
    loading = false;

    constructor(private assuntoService: AssuntoService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible'] && this.visible && this.assuntoCodigo) {
            this.loadAssunto(this.assuntoCodigo);
        }
    }

    loadAssunto(codigo: number) {
        this.loading = true;
        this.assuntoService.findById(codigo).subscribe({
            next: (assunto) => {
                this.assunto = assunto;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar assunto:', error);
                this.hideDrawer();
            },
        });
    }

    hideDrawer() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
}

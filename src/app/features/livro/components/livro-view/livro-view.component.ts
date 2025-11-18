import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DrawerModule } from 'primeng/drawer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Livro } from '@domain/model/livro.interface';
import { LivroService } from '@domain/service/livro.service';

@Component({
    selector: 'app-livro-view',
    templateUrl: './livro-view.component.html',
    standalone: true,
    imports: [CommonModule, DrawerModule, ButtonModule, ChipModule, ProgressSpinnerModule],
})
export class LivroViewComponent implements OnChanges {
    @Input() visible = false;
    @Input() livroCodigo?: number;
    @Output() visibleChange = new EventEmitter<boolean>();

    livro?: Livro;
    loading = false;

    constructor(private livroService: LivroService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible'] && this.visible && this.livroCodigo) {
            this.loadLivro(this.livroCodigo);
        }
    }

    loadLivro(codigo: number) {
        this.loading = true;
        this.livroService.findById(codigo).subscribe({
            next: (livro) => {
                this.livro = livro;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar livro:', error);
                this.hideDrawer();
            },
        });
    }

    hideDrawer() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
}

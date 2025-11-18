import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Autor } from '@domain/model/autor.interface';
import { AutorService } from '@domain/service/autor.service';

@Component({
    selector: 'app-autor-view',
    templateUrl: './autor-view.component.html',
    standalone: true,
    imports: [CommonModule, DrawerModule, ButtonModule, ProgressSpinnerModule],
})
export class AutorViewComponent implements OnChanges {
    @Input() visible = false;
    @Input() autorCodigo?: number;
    @Output() visibleChange = new EventEmitter<boolean>();

    autor?: Autor;
    loading = false;

    constructor(private autorService: AutorService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible'] && this.visible && this.autorCodigo) {
            this.loadAutor(this.autorCodigo);
        }
    }

    loadAutor(codigo: number) {
        this.loading = true;
        this.autorService.findById(codigo).subscribe({
            next: (autor) => {
                this.autor = autor;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar autor:', error);
                this.hideDrawer();
            },
        });
    }

    hideDrawer() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
}

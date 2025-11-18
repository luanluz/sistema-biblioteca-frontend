import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { DrawerModule } from 'primeng/drawer';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { PageableRequest } from '@core/types/page.interface';
import { Assunto } from '@domain/model/assunto.interface';
import { Autor } from '@domain/model/autor.interface';
import { Livro } from '@domain/model/livro.interface';
import { LivroMapper } from '@domain/model/livro.mapper';
import { AssuntoService } from '@domain/service/assunto.service';
import { AutorService } from '@domain/service/autor.service';
import { LivroService } from '@domain/service/livro.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-livro-form',
    templateUrl: './livro-form.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DrawerModule,
        InputTextModule,
        ButtonModule,
        InputNumberModule,
        MultiSelectModule,
        ProgressSpinnerModule,
        DatePicker,
    ],
})
export class LivroFormComponent implements OnInit, OnChanges {
    @Input() visible = false;
    @Input() livroCodigo?: number;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() eventEmitterSave = new EventEmitter<void>();

    livro: Partial<Livro> = {};
    submitted = false;
    loading = false;
    isEditMode = false;

    autoresDisponiveis: Autor[] = [];
    assuntosDisponiveis: Assunto[] = [];

    constructor(
        private livroService: LivroService,
        private assuntoService: AssuntoService,
        private autorService: AutorService,
        private toastService: ToastService,
    ) {}

    ngOnInit() {
        this.loadAutores();
        this.loadAssuntos();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visible'] && this.visible) {
            if (this.livroCodigo) {
                this.isEditMode = true;
                this.loadLivro(this.livroCodigo);
            } else {
                this.isEditMode = false;
                this.resetForm();
            }
        }
    }

    loadLivro(codigo: number) {
        this.loading = true;
        this.livroService.findById(codigo).subscribe({
            next: (livro) => {
                this.livro = { ...livro };
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao carregar livro:', error);
                this.hideDrawer();
            },
        });
    }

    loadAutores() {
        const params: PageableRequest = {
            page: 0,
            size: 100,
            sort: { field: 'codigo', direction: 'asc' },
        };

        this.autorService.findAll(params).subscribe({
            next: (response) => {
                this.autoresDisponiveis = response.content;
            },
            error: (error) => {
                console.error('Erro ao carregar autores:', error);
            },
        });
    }

    loadAssuntos() {
        const params: PageableRequest = {
            page: 0,
            size: 100,
            sort: { field: 'codigo', direction: 'asc' },
        };

        this.assuntoService.findAll(params).subscribe({
            next: (response) => {
                this.assuntosDisponiveis = response.content;
            },
            error: (error) => {
                console.error('Erro ao carregar assuntos:', error);
            },
        });
    }

    resetForm() {
        this.livro = {
            autores: [],
            assuntos: [],
        };
        this.submitted = false;
    }

    hideDrawer() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.submitted = false;
    }

    saveLivro() {
        this.submitted = true;

        const request = LivroMapper.toRequest(this.livro);
        this.loading = true;

        if (this.livro.codigo) {
            this.livroService.update(this.livro.codigo, request).subscribe({
                next: () => {
                    this.toastService.success('Livro atualizado');
                    this.loading = false;
                    this.hideDrawer();
                    this.eventEmitterSave.emit();
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Erro ao atualizar livro:', error);
                },
            });

            return;
        }

        this.livroService.create(request).subscribe({
            next: () => {
                this.toastService.success('Livro criado');
                this.loading = false;
                this.hideDrawer();
                this.eventEmitterSave.emit();
            },
            error: (error) => {
                this.loading = false;
                console.error('Erro ao criar livro:', error);
            },
        });
    }

    get valorEmReais(): number | null {
        return this.livro.valorEmCentavos ? this.livro.valorEmCentavos / 100 : null;
    }

    set valorEmReais(value: number | null) {
        this.livro.valorEmCentavos = value ? Math.round(value * 100) : 0;
    }

    get anoPublicacao(): string | undefined {
        return this.livro.anoPublicacao;
    }

    set anoPublicacao(value: Date | undefined | null) {
        this.livro.anoPublicacao = value?.getFullYear().toString();
    }
}

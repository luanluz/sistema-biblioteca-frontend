import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { MenubarModule } from 'primeng/menubar';
import { Tooltip } from 'primeng/tooltip';

import { RelatorioService } from '@domain/service/relatorio.service';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [MenubarModule, ButtonGroupModule, ButtonModule, Tooltip],
})
export class AppHeaderComponent implements OnInit {
    items: MenuItem[] | undefined;
    appTitle = environment.app.name;

    constructor(
        private router: Router,
        private relatorioService: RelatorioService,
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Livros',
                icon: 'pi pi-book',
                command: () => this.router.navigate(['/livros']),
            },
            {
                label: 'Assuntos',
                icon: 'pi pi-bookmark',
                command: () => this.router.navigate(['/assuntos']),
            },
            {
                label: 'Autores',
                icon: 'pi pi-users',
                command: () => this.router.navigate(['/autores']),
            },
        ];
    }

    gerarRelatorioPDF(): void {
        this.relatorioService.baixarPDF();
    }

    gerarRelatorioExcel(): void {
        this.relatorioService.baixarExcel();
    }
}

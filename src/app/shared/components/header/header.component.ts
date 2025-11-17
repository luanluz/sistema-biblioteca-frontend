import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { MenubarModule } from 'primeng/menubar';
import { Tooltip } from 'primeng/tooltip';

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

    ngOnInit() {
        this.items = [
            {
                label: 'Livros',
                icon: 'pi pi-book',
            },
            {
                label: 'Assuntos',
                icon: 'pi pi-bookmark',
            },
            {
                label: 'Autores',
                icon: 'pi pi-users',
            },
        ];
    }
}

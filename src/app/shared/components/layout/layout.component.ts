import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { AppHeaderComponent } from '@shared/components/header/header.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [CommonModule, RouterOutlet, AppHeaderComponent, FooterComponent],
})
export class AppLayoutComponent {}

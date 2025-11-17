import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';

import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-inicio',
    imports: [Button],
    templateUrl: './inicio.page.html',
    providers: [ToastService],
})
export class InicioPage {
    private toastService: ToastService = inject(ToastService);

    showSimpleSuccess(): void {
        this.toastService.success('Operação realizada com sucesso!');
    }
}

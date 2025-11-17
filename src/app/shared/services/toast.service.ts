import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface ToastConfig {
    severity?: 'success' | 'info' | 'warn' | 'error';
    summary?: string;
    detail: string;
    life?: number;
    sticky?: boolean;
    closable?: boolean;
    key?: string;
    styleClass?: string;
    contentStyleClass?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private messageService: MessageService = inject(MessageService);

    private defaultConfig: Partial<ToastConfig> = {
        life: 5000,
        closable: true,
        sticky: false,
    };

    success(config: ToastConfig | string): void {
        const options = this.buildOptions(config, 'success');
        this.messageService.add({
            severity: options.severity,
            summary: options.summary || 'Sucesso',
            detail: options.detail,
            life: options.life,
            sticky: options.sticky,
            closable: options.closable,
            key: options.key,
            styleClass: options.styleClass,
            contentStyleClass: options.contentStyleClass,
        });
    }

    error(config: ToastConfig | string): void {
        const options = this.buildOptions(config, 'error');
        this.messageService.add({
            severity: options.severity,
            summary: options.summary || 'Erro',
            detail: options.detail,
            life: options.life,
            sticky: options.sticky,
            closable: options.closable,
            key: options.key,
            styleClass: options.styleClass,
            contentStyleClass: options.contentStyleClass,
        });
    }

    warning(config: ToastConfig | string): void {
        const options = this.buildOptions(config, 'warn');
        this.messageService.add({
            severity: options.severity,
            summary: options.summary || 'Atenção',
            detail: options.detail,
            life: options.life,
            sticky: options.sticky,
            closable: options.closable,
            key: options.key,
            styleClass: options.styleClass,
            contentStyleClass: options.contentStyleClass,
        });
    }

    info(config: ToastConfig | string): void {
        const options = this.buildOptions(config, 'info');
        this.messageService.add({
            severity: options.severity,
            summary: options.summary || 'Informação',
            detail: options.detail,
            life: options.life,
            sticky: options.sticky,
            closable: options.closable,
            key: options.key,
            styleClass: options.styleClass,
            contentStyleClass: options.contentStyleClass,
        });
    }

    clear(key?: string): void {
        this.messageService.clear(key);
    }

    private buildOptions(
        config: ToastConfig | string,
        severity: 'success' | 'info' | 'warn' | 'error',
    ): ToastConfig {
        if (typeof config === 'string') {
            return {
                ...this.defaultConfig,
                severity,
                detail: config,
            } as ToastConfig;
        }

        return {
            ...this.defaultConfig,
            severity,
            ...config,
        } as ToastConfig;
    }
}

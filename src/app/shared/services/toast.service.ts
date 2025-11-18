import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface ToastConfig {
    title?: string;
    message: string;
    timeOut?: number;
    extendedTimeOut?: number;
    closeButton?: boolean;
    progressBar?: boolean;
    positionClass?: string;
    enableHtml?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private defaultConfig: Partial<ToastConfig> = {
        timeOut: 5000,
        extendedTimeOut: 2000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        enableHtml: false,
    };

    private toastr: ToastrService = inject(ToastrService);

    success(config: ToastConfig | string): void {
        const options = this.buildOptions(config);
        this.toastr.success(options.message, options.title, {
            timeOut: options.timeOut,
            extendedTimeOut: options.extendedTimeOut,
            closeButton: options.closeButton,
            progressBar: options.progressBar,
            positionClass: options.positionClass,
            enableHtml: options.enableHtml,
            toastClass: 'ngx-toastr success-toast',
        });
    }

    error(config: ToastConfig | string): void {
        const options = this.buildOptions(config);
        this.toastr.error(options.message, options.title, {
            timeOut: options.timeOut,
            extendedTimeOut: options.extendedTimeOut,
            closeButton: options.closeButton,
            progressBar: options.progressBar,
            positionClass: options.positionClass,
            enableHtml: options.enableHtml,
            toastClass: 'ngx-toastr error-toast',
        });
    }

    warning(config: ToastConfig | string): void {
        const options = this.buildOptions(config);
        this.toastr.warning(options.message, options.title, {
            timeOut: options.timeOut,
            extendedTimeOut: options.extendedTimeOut,
            closeButton: options.closeButton,
            progressBar: options.progressBar,
            positionClass: options.positionClass,
            enableHtml: options.enableHtml,
            toastClass: 'ngx-toastr warning-toast',
        });
    }

    info(config: ToastConfig | string): void {
        const options = this.buildOptions(config);
        this.toastr.info(options.message, options.title, {
            timeOut: options.timeOut,
            extendedTimeOut: options.extendedTimeOut,
            closeButton: options.closeButton,
            progressBar: options.progressBar,
            positionClass: options.positionClass,
            enableHtml: options.enableHtml,
            toastClass: 'ngx-toastr info-toast',
        });
    }

    clear(): void {
        this.toastr.clear();
    }

    private buildOptions(config: ToastConfig | string): ToastConfig {
        if (typeof config === 'string') {
            return { ...this.defaultConfig, message: config } as ToastConfig;
        }

        return { ...this.defaultConfig, ...config } as ToastConfig;
    }
}

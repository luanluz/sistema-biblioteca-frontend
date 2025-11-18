import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiError, ValidationError } from '@core/types/api-error.interface';
import { ToastService } from '@shared/services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private toastService = inject(ToastService);

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.handleError(error);
                return throwError(() => error);
            }),
        );
    }

    private handleError(error: HttpErrorResponse): void {
        if (error.status === 0) {
            this.toastService.error({
                title: 'Erro de Conexão',
                message:
                    'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
            });
            return;
        }

        if (error.status === 400) {
            this.handleValidationError(error);
            return;
        }

        this.handleGenericError(error);
    }

    private handleValidationError(error: HttpErrorResponse): void {
        const validationError = error.error as ValidationError;

        if (validationError?.invalidFields && validationError.invalidFields.length > 0) {
            validationError.invalidFields.forEach((field) => {
                this.toastService.error({
                    title: validationError.title || 'Erro de Validação',
                    message: field.errorMessage,
                    enableHtml: true,
                    timeOut: 8000,
                });
            });

            return;
        }

        this.toastService.error({
            title: validationError?.title || 'Erro de Validação',
            message: validationError?.detail || 'Os dados enviados são inválidos.',
        });
    }

    private handleGenericError(error: HttpErrorResponse): void {
        const apiError = error.error as ApiError;

        const errorMessage = this.getErrorMessage(error.status, apiError);
        const errorTitle = apiError?.title || this.getErrorTitle(error.status);

        this.toastService.error({
            title: errorTitle,
            message: errorMessage,
        });
    }

    private getErrorTitle(status: number): string {
        const titles: Record<number, string> = {
            404: 'Não Encontrado',
            500: 'Erro no Servidor',
            502: 'Servidor Indisponível',
            503: 'Serviço Indisponível',
        };

        return titles[status] || 'Erro';
    }

    private getErrorMessage(status: number, apiError?: ApiError): string {
        if (apiError?.detail) {
            return apiError.detail;
        }

        const messages: Record<number, string> = {
            404: 'O recurso solicitado não foi encontrado.',
            500: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
            502: 'O servidor está temporariamente indisponível.',
            503: 'O serviço está temporariamente fora do ar.',
        };

        return messages[status] || 'Ocorreu um erro inesperado. Tente novamente.';
    }
}

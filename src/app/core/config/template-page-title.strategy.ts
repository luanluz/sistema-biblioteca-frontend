import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { environment } from 'environments/environment';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
    private base = environment.app.name;
    private title: Title = inject(Title);

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);
        if (title !== undefined) {
            this.title.setTitle(`${title} – ${this.base}`);
        }
    }
}

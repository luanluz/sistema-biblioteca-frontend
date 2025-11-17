import { Component } from '@angular/core';

import { environment } from '@environments/environment';

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    appDescription = environment.app.description;
    projectUrl = environment.app.projectUrl;
    apiUrl = environment.app.apiUrl;
}

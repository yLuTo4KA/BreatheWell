import { Component, inject } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    private loadingService = inject(LoadingService);

    loading$ = this.loadingService.loading$;
}

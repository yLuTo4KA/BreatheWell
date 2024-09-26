import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-task-complete',
  templateUrl: './task-complete.component.html',
  styleUrls: ['./task-complete.component.scss']
})
export class TaskCompleteComponent {
  private authService = inject(AuthService);
  private authSub: Subscription | null = null;

  userData!: User;

  ngOnInit(): void {
    this.authSub = this.authService.user$.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    })

  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}

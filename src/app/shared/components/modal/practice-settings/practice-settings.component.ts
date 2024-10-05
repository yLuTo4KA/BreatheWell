import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Breath } from 'src/app/core/models/breath.model';
import { ModalsView } from 'src/app/core/models/modals-view.model';
import { Practice } from 'src/app/core/models/practice.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BreathService } from 'src/app/core/services/breath.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-practice-settings',
  templateUrl: './practice-settings.component.html',
  styleUrls: ['./practice-settings.component.scss']
})
export class PracticeSettingsComponent implements OnInit {
  private breathService = inject(BreathService);
  private modalService = inject(ModalService);
  private router = inject(Router);
  private authService = inject(AuthService);

  private practiceSub!: Subscription;
  private modalSub!: Subscription;
  private breathSub!: Subscription;

  userData!: User;

  modals: ModalsView = {
    practiceSettings: false,
    soundSettings: false,
    durationSettings: false
  }
  breathSetting: Breath | null = null;

  public practiceData!: Practice[];

  @Output() closeModalEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.practiceSub = this.breathService.getPractice().subscribe(response => {
      this.practiceData = response;
    })
    this.modalSub = this.modalService.modalsView$.subscribe(response => {
      this.modals = response;
    })
    this.breathSub = this.breathService.breathSetting$.subscribe(response => {
      this.breathSetting = response;
    })
    this.authService.user$.subscribe(data => {
      if(data) {
        this.userData = data;
      }
    })
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.closeAllSettingModal();
  }
  openPractice(): void {
    this.closeModalEvent.emit();
    this.router.navigate(['/breathing']);
    this.closeAllSettingModal();
  }

  closeAllSettingModal(): void {
    this.modalService.closeModal('practiceSettings');
    this.modalService.closeModal('durationSettings');
    this.modalService.closeModal('soundSettings');
  }
  updatePractice(practice: Practice): void {
    if(!this.userData.premium && !practice.free) {
      this.router.navigate(['/buying']);
    }else {
      this.breathService.updatePractice(practice);
    }
  }

  getDuration(): number {
    return Math.round(this.breathSetting!.duration / 60);
  }
  openSoundModal(): void {
    this.modalService.openModal('soundSettings');
  }
  openDurationModal(): void {
    this.modalService.openModal('durationSettings');
  }

  ngOnDestroy(): void {
    if(this.practiceSub && this.modalSub && this.breathSub) {
      this.practiceSub.unsubscribe();
      this.modalSub.unsubscribe();
      this.breathSub.unsubscribe();
    }
  }
}

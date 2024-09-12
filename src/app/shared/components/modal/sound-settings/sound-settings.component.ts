import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breath } from 'src/app/core/models/breath.model';
import { ModalsView } from 'src/app/core/models/modals-view.model';
import { Sound } from 'src/app/core/models/sound.model';
import { BreathService } from 'src/app/core/services/breath.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-sound-settings',
  templateUrl: './sound-settings.component.html',
  styleUrls: ['./sound-settings.component.scss']
})
export class SoundSettingsComponent {
  breathService = inject(BreathService);
  modalService = inject(ModalService);
  
  breathSoundSub!: Subscription;
  modalSub!: Subscription;
  breathSub!: Subscription;
  
  @Output() closeModalEvent = new EventEmitter<void>();

  soundsData!: Sound[];
  modal: ModalsView = {
    practiceSettings: false,
    soundSettings: false,
    durationSettings: false
  }
  breathSetting: Breath | null = null;


  ngOnInit(): void {
    this.breathSoundSub = this.breathService.getSounds().subscribe(response => {
      this.soundsData = response;
    })
    this.modalSub = this.modalService.modalsView$.subscribe(response => {
      this.modal = response;
    })
    this.breathSub = this.breathService.breathSetting$.subscribe(response => {
      this.breathSetting = response;
    })

  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.modalService.closeModal('soundSettings');
  }

  updateSound(sound: Sound | null): void {
    this.breathService.updateSound(sound);
  }

  ngOnDestroy(): void {
    if(this.modalSub && this.breathSub && this.breathSoundSub) {
      this.modalSub.unsubscribe();
      this.breathSub.unsubscribe();
      this.breathSoundSub.unsubscribe();
    }
  }
}

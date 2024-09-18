import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breath } from 'src/app/core/models/breath.model';
import { ModalsView } from 'src/app/core/models/modals-view.model';
import { BreathService } from 'src/app/core/services/breath.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-duration-settings',
  templateUrl: './duration-settings.component.html',
  styleUrls: ['./duration-settings.component.scss']
  
})
export class DurationSettingsComponent {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  breathService = inject(BreathService);
  modalService = inject(ModalService);
  selectDuration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  
  modalSub!: Subscription;
  
  @Output() closeModalEvent = new EventEmitter<void>();
  modal: ModalsView = {
    practiceSettings: false,
    soundSettings: false,
    durationSettings: false
  }
  duration: number = 3;
  private breathSub!: Subscription;

  swiperConfig = {
    initialSlide: 2
  }

  private afterInit: boolean = false;
  

  ngOnInit(): void {
    this.modalSub = this.modalService.modalsView$.subscribe(response => {
      this.modal = response;
    })

  }
  ngAfterViewInit() {
    this.afterInit = true;
    this.swiper.nativeElement.swiper.activeIndex = this.duration;
    this.swiper.nativeElement.swiper.on('slideChange', () => {
      const activeIndex = this.swiper.nativeElement.swiper.activeIndex;
      this.breathService.updateDuration(activeIndex + 1);
    })
    this.breathSub = this.breathService.breathSetting$.subscribe(response => {
      this.duration = Math.floor(response.duration / 60) - 1;
      if (this.swiper?.nativeElement) {
        this.swiper.nativeElement.swiper.slideTo(this.duration);
      }
    });
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.modalService.closeModal('durationSettings');
  }

  updateDuration(duration: number): void {
    this.breathService.updateDuration(duration);
  }

  ngOnDestroy(): void {
    if(this.modalSub && this.breathSub) {
      this.modalSub.unsubscribe();
      this.breathSub.unsubscribe();
    }
  }
}

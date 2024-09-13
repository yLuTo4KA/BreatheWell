import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private modalService = inject(ModalService);
  constructor() { }

  ngOnInit() {
  }

  openPracticeSettin(): void {
    this.modalService.openModal('practiceSettings');
  }

}

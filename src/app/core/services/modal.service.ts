import { Injectable } from '@angular/core';
import { boolean } from '@telegram-apps/sdk';
import { ModalsView } from '../models/modals-view.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    private modals: ModalsView = {
        practiceSettings: false,
        soundSettings: false,
        durationSettings: false
    }

    modalsView$: BehaviorSubject<ModalsView> = new BehaviorSubject<ModalsView>(this.modals)

    constructor() {}
    
    openModal(modalName: keyof ModalsView) {
        const updatedModals = {...this.modalsView$.getValue()};

        updatedModals[modalName] = true;

        this.modalsView$.next(updatedModals);
    }

    closeModal(modalName: keyof ModalsView) {
        const updatedModals = {...this.modalsView$.getValue()};

        updatedModals[modalName] = false;

        this.modalsView$.next(updatedModals);
    }
}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

import { LogoLoaderComponent } from './components/logo-loader/logo-loader.component';
import { TagComponent } from './components/tag/tag.component';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { MiniButtonComponent } from './components/mini-button/mini-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { PracticeSettingsComponent } from './components/modal/practice-settings/practice-settings.component';
import { SoundSettingsComponent } from './components/modal/sound-settings/sound-settings.component';
import { DurationSettingsComponent } from './components/modal/duration-settings/duration-settings.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PriceComponent } from './components/price/price.component';
import { BenefitsItemComponent } from './components/benefits-item/benefits-item.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { PremiumTagComponent } from './components/premium-tag/premium-tag.component';
import { SugesstComponent } from './components/suggest/suggest.component';
import { SectorComponent } from './components/sector/sector.component';
import { LessonCardComponent } from './components/lesson-card/lesson-card.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { FeatureItemComponent } from './components/feature-item/feature-item.component';
import { ConfrimCloseComponent } from './components/modal/confrim-close/confrim-close.component';
import { HelpModalComponent } from './components/modal/help-modal/help-modal.component';
import { LessonLearnedComponent } from './components/modal/lesson-learned/lesson-learned.component';
import { SuggestLessonComponent } from './components/modal/suggest-lesson/suggest-lesson.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoadingComponent } from './components/modal/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FirstLessonComponent } from './components/modal/first-lesson/first-lesson.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [ButtonComponent, LogoLoaderComponent, TagComponent, SelectButtonComponent, MiniButtonComponent, ModalComponent, PracticeSettingsComponent, SoundSettingsComponent, DurationSettingsComponent, CalendarComponent, PriceComponent, BenefitsItemComponent, AvatarComponent, PremiumTagComponent, SugesstComponent, SectorComponent, LessonCardComponent, TaskCardComponent, FeatureItemComponent, ConfrimCloseComponent, HelpModalComponent, LessonLearnedComponent, SuggestLessonComponent, TruncatePipe, LoadingComponent, SafeHtmlPipe, FirstLessonComponent],
  exports: [
    ButtonComponent,
    LogoLoaderComponent,
    TagComponent,
    MiniButtonComponent,
    SelectButtonComponent,
    ModalComponent,
    PracticeSettingsComponent,
    SoundSettingsComponent,
    DurationSettingsComponent,
    CalendarComponent,
    PriceComponent,
    BenefitsItemComponent,
    AvatarComponent,
    PremiumTagComponent,
    SugesstComponent,
    SectorComponent,
    LessonCardComponent,
    TaskCardComponent,
    FeatureItemComponent,
    ConfrimCloseComponent,
    HelpModalComponent,
    LessonLearnedComponent,
    SuggestLessonComponent,
    TruncatePipe,
    SafeHtmlPipe,
    FirstLessonComponent,
    LoadingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }

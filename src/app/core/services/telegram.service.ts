import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { initUtils, mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';


const initDataRaw = new URLSearchParams([
  ['user', JSON.stringify({
    id: 99281932,
    first_name: 'Andrew',
    last_name: 'Rogue',
    username: 'rogue',
    language_code: 'en',
    is_premium: true,
    allows_write_to_pm: true,
  })],
  ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
  ['auth_date', '1716922846'],
  ['start_param', 'debug'],
  ['chat_type', 'sender'],
  ['chat_instance', '8428209589180549439'],
]).toString();

mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  initData: parseInitData(initDataRaw),
  initDataRaw,
  version: '7.2',
  platform: 'tdesktop',
});

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
    private window;
    tg;
    dummyResponse = true; 
    private utils = initUtils();
  constructor(@Inject(DOCUMENT) private _document: any) {
    this.window = this._document.defaultView;
    this.tg = this.window!.Telegram.WebApp;
    let startParam = this.tg.initDataUnsafe.start_param;
    if(startParam) {
      localStorage.setItem('lesson', startParam);     
    }
  }

  initData(): string {
    return this.tg.initData;
  }
  openTgLink(link: string, instantView: boolean = false): void {
    this.utils.openLink(link, { tryInstantView: instantView });
  }
  openTelegramLink(link: string) {
    this.utils.openTelegramLink(link);
  }
  closeTg(): void {
    this.tg.close();
  }
  expand(): void {
    this.tg.expand();
  }
}

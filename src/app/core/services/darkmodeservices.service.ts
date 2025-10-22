import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeservicesService {

  constructor() { }

  private isDark = false;

  toggleDarkMode() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  isDarkMode() {
    return this.isDark;
  }
}

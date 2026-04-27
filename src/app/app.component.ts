import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  count = signal(0);
  manualValue: number | null = null;

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }

  reset() {
    this.count.set(0);
  }

  setManual() {
    if (this.manualValue !== null && !isNaN(this.manualValue)) {
      this.count.set(Number(this.manualValue));
      this.manualValue = null;
    }
  }

  closeApp() {
    (window as any).app?.hide();
  }
}

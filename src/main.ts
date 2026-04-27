import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Only run inside Electron — block direct browser access
const isElectron = navigator.userAgent.toLowerCase().includes('electron');
if (!isElectron) {
  document.body.innerHTML =
    '<div style="font-family:sans-serif;display:grid;place-items:center;height:100vh;color:#666">' +
    '<p>This app is only available as a desktop application.</p></div>';
} else {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
}

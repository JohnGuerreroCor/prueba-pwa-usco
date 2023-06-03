import { NgModule, isDevMode, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CheckForUpdateService } from './services/check-for-update.service';
import { LogUpdateService } from './services/log-update.service';
import { PromptUpdateService } from './services/prompt-update.service';
import { PromptInstallComponent } from './components/prompt-install/prompt-install.component';
import { PromptNotificationService } from './services/promtp-notification.service';

const initializer =
  (promptNotificationService: PromptNotificationService) => () =>
    promptNotificationService.initPwaPrompt();

@NgModule({
  declarations: [AppComponent, PromptInstallComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatBottomSheetModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
  ],
  entryComponents: [
    PromptInstallComponent,
  ],
  providers: [
    CheckForUpdateService,
    LogUpdateService,
    PromptUpdateService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [PromptNotificationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

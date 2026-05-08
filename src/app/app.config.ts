import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProjectRepository } from './application/repository/project-repository';
import { FirestoreProjectRepository } from './infrastructure/firestore/firestore-project-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: ProjectRepository, useExisting: FirestoreProjectRepository },
  ],
};

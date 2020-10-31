import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { MessagesService } from './services/messages.service';
import { UsersService } from './services/users.service';

import { SETTINGS } from '@angular/fire/firestore';

import { ORIGIN } from '@angular/fire/functions';
import { firestore } from 'firebase';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, environment.firebaseConfig.projectId),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    MessagesService,
    UsersService,
    {
      provide: SETTINGS,
      useFactory: (): firestore.Settings | null => {
        if (!environment.production) {
          console.warn('Using Firestore at localhost:8080');
          return {
            host: 'localhost:8080',
            ssl: false,
          };
        }
        return null;
      },
    },{
      provide: ORIGIN,
      useFactory: () => {
        if (!environment.production) {
          console.warn('Using localhost:5001 for Firebase FNs');
          return 'localhost:5001';
        }
        return undefined;
      },
    },
  ],
})
export class FirebaseModule { }

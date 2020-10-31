import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _firestore: AngularFirestore) {
  }

  getUser(cpf: string): Observable<User> {
    return this._firestore.collection('users').doc<User>(cpf).valueChanges();
  }

  createNewUser(user: User) {
    return this._firestore.collection('users').doc(user.cpf).set({
      messages: firestore.FieldValue.arrayUnion({
        type: 'text',
        provider: 'web',
        create: Date.now(),
        message_content: 'oi',
        message_obj: {
          from: user.cpf,
          message: 'oi'
        },
      })
    }, { merge: true})
  }

  updateUser(message: SendMessage): Promise<void> {
    return this._firestore.collection('users').doc(message.from).update({
      messages: firestore.FieldValue.arrayUnion({
        type: 'text',
        provider: 'web',
        create: Date.now(),
        message_content: message.message,
        message_obj: message,
      })
    });
  }

  checkIfRegistred(data: SendMessage): Observable<boolean> {
    return this._firestore.collection('users').doc(data.from).snapshotChanges().pipe(map((a) => {
      return a.payload.exists;
    }));
  }
}

export interface SendMessage {
  from: string;
  message: string;
}
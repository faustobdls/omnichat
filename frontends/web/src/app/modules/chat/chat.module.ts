import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './page/chat.page';
import { InputSendMessageComponent } from './input-send-message/input-send-message.component';
import { ListMessagesComponent } from './list-messages/list-messages.component';
import { MessageComponent } from './message/message.component';
import { FirebaseModule } from '../../firebase/firebase.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    FirebaseModule,
  ],
  declarations: [ChatPage, InputSendMessageComponent, ListMessagesComponent, MessageComponent]
})
export class ChatModule {}

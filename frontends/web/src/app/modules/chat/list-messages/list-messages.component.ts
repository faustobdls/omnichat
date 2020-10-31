import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.scss'],
})
export class ListMessagesComponent implements OnInit, AfterViewChecked {

  @Input() messages: Array<Message>;

  @Input() content: IonContent;

  constructor() { }
  ngAfterViewChecked(): void {
    if (this.content !== null && this.content !== undefined) {
      this.content.scrollToBottom();
    }
  }

  ngOnInit() { }



}

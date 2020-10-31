import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { UsersService } from '../../../firebase/services/users.service';

@Component({
  selector: 'app-input-send-message',
  templateUrl: './input-send-message.component.html',
  styleUrls: ['./input-send-message.component.scss'],
})
export class InputSendMessageComponent implements OnInit {

  value:string;

  @Input() from: string;

  constructor(private _userService: UsersService) { }

  ngOnInit() {}

  async onEnter(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.value !== ''){
      await this._userService.updateUser({
        from: this.from,
        message: this.value
      });
      this.value = '';
    }
  }

}

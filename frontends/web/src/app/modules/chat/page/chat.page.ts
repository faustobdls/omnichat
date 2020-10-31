import { Component, OnInit } from '@angular/core';
import { SendMessage, UsersService } from '../../../firebase/services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private _userService: UsersService) { }

  users$: Observable<User>;
  registred$: Observable<boolean>;

  async ngOnInit() {
  }

  cpfValue: string;

  async onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.cpfValue !== '' && this.cpfValue.match(/^\d{3}.?\d{3}.?\d{3}-?\d{2}$/gm)) {
      this.registred$ = this._userService.checkIfRegistred({ from: this.cpfValue, message: "" }).pipe(map((registred) => {
        if (registred) {
          this.users$ = this._userService.getUser(this.cpfValue);
        } else {
          this._userService.createNewUser({
            cpf: this.cpfValue
          }).then(() => {
            this.users$ = this._userService.getUser(this.cpfValue);
            console.log(this.cpfValue);
          })
        }
        return registred;
      }));
    }

  }

}

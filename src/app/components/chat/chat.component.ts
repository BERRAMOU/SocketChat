import {Component, OnInit, OnDestroy} from '@angular/core';
import  { CommonModule } from '@angular/common';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
    messages:any = [];
    message:string;
    username:string;
    alert:any =false;
    connection: any;

    constructor(private _chatservice: ChatService) {
    }

    ngOnInit() {

        this.username = this._chatservice.getUsername();
        
        this.connection = this._chatservice.getMessages().subscribe(
            message =>{
                console.log(message);
                this.messages.push(message);
            }
        );
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }

    sendMessage() {
        this._chatservice.sendMessage(this.message , this.username );
        this.message = '';
      //  console.log(this.message);
    }

    setUsername(){
        this._chatservice.setUsername(this.username);
        this.alert="the username is set ";
    }

}

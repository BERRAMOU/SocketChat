import {Injectable} from '@angular/core';
import {Subject} from  'rxjs/Subject';
import  {Observable} from  'rxjs/Observable';
import * as io from  'socket.io-client';
// import {any} from "codelyzer/util/function";

@Injectable()
export class ChatService {
    private url = 'http://localhost:8000';
    private socket:any;

    /**
     *
     */
    constructor() {
    }

    /**
     * @returns {string|null|any}
     */
    getUsername(){
        return sessionStorage.getItem('username');
    }

    /**
     *
     * @param username
     */

    setUsername(username:string){
       console.log('username set '+username);
        sessionStorage.setItem('username' , username );
    }

    /**
     *
     * @param message
     *
     */
    sendMessage(message: string , username: string ) {
        
        this.socket.emit('add-message', message ,  username);
    }

    /**
     *
     * @returns {Observable|"././Observable".Observable|"./././Observable".Observable}
     *
     */
    getMessages() {

        let observable = new Observable((observer:any) => {
            this.socket = io(this.url);
            this.socket.on('message', (data:any) => {
                observer.next(data);
            });

            return () =>{
                this.socket.disconnect();
            }
        });

        return observable;
    }
}

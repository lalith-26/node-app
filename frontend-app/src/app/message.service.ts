import { Injectable } from '@angular/core';

import{Observable,Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import { map } from 'rxjs/operators';


export interface Message{
  msg : any
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: Subject<Message>;

  constructor(private wsService:WebsocketService) { 

    this.messages = <Subject<Message>>wsService
    .connect('ws://localhost:8089').pipe(map((response:MessageEvent):Message => {
      let data =  response.data;
       return {msg:data} ;
      }));
  



  }
}

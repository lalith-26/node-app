import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
//import { RText } from '@angular/core/src/render3/interfaces/renderer';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }
  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent>{
    if(!this.subject){
      this.subject = this.create(url);
    }
    return this.subject;
  }

  public create(url):Subject<MessageEvent>{

    let ws = new WebSocket(url);

    let observable  =  Observable.create((obs:Subject<MessageEvent>)=>{

      ws.onmessage =  obs.next.bind(obs);
      ws.onerror =  obs.error.bind(obs);
      ws.onclose  = obs.complete.bind(obs);
      return ws.close.bind(ws);

    });

    let observer = {
      next: (data:Object)=>{
        if(ws.readyState==WebSocket.OPEN){
          ws.send(JSON.stringify(data));
        }

      }
    }

    return Subject.create(observer,observable);
  

  }

}
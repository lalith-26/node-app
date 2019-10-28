import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import {MessageService} from '../message.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  
  specialEvents = []

  constructor(private _eventService: EventService,
              private _router: Router, private msgService: MessageService) { 

              }


  ngOnInit() {
    this.msgService.messages.subscribe(data=>{
      console.log("msg recieved from server",JSON.parse(data.msg));
      (this.specialEvents).shift();
      (this.specialEvents).push(JSON.parse(data.msg));
    })
    this._eventService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

}

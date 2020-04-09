import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UIManagerService {
  uiManagerResponseData$: Observable<String>;
  private _uiManagerResponseData$: BehaviorSubject<String>;

  constructor(private socket: Socket) {
    // Event suscription to recieve wcru ui data message
    this._uiManagerResponseData$ = new BehaviorSubject('');
    this.uiManagerResponseData$ = this._uiManagerResponseData$.asObservable();

    // TODO Make seperate observables for command and notification -Hemant


  }

  // connect to ui-manager-server
  suscribeReceiver() {
    if (this.socket != null) {
      this.socket.emit('newapp', 'overlay UI');
      this.receiveMessage();
    }
  }

  // --------------------- Receieving Commands/Notification/Data from WCRU -----------------
  suscribeOnReceiveCommandFromWCRU() {
    if (this.socket != null) {

      this.socket.on('CommandFromWCRU', (jsonCommand: any) => {
        this._uiManagerResponseData$.next(String(jsonCommand));
        console.log('CommandFromWCRU data recieved : ' + String(jsonCommand));
      }

      );
    }
  }

  suscribeOnReceiveNotificationFromWCRU() {
    if (this.socket != null) {

      this.socket.on('NotificationFromWCRU', (jsonNotification: any) => {
        this._uiManagerResponseData$.next(String(jsonNotification));
        console.log('NotificationFromWCRU recieved : ' + String(jsonNotification));
      }

      );
    }
  }
  suscribeOnReceiveDataFromWCRU() {
    if (this.socket != null) {
      this.socket.on('DataFromWCRU', (jsonEntityData: any) => {
        this._uiManagerResponseData$.next(String(jsonEntityData));
        console.log('DataFromWCRU recieved : ' + String(jsonEntityData));
      }

      );
    }
  }
  // --------------------------------------------------------------------------------------

  // --------------------- Sending Commands/Notification/Data from Overlay-----------------
  sendCommandFromOverlay(jsonCommand: string) {
    this.socket.emit('CommandFromOverlay', jsonCommand);
    console.log('sendCommandFromOverlay : ' + String(jsonCommand));
  }

  sendNotificationFromOverlay(jsonNotification: string) {
    this.socket.emit('NotificationFromOverlay', jsonNotification);
    console.log('sendNotificationFromOverlay : ' + String(jsonNotification));
  }

  sendDataFromOverlay(jsonData: string) {
    this.socket.emit('DataFromOverlay', jsonData);
    console.log('sendDataFromOverlay : ' + String(jsonData));
  }
  // --------------------------------------------------------------------------------------

  // send message to wcru ui
  sendMessageContent(textString: string) {
    this.socket.emit('private message', 'overlay UI msg : ' + textString);
  }

  // recieve message from wcru ui
  receiveMessage(): void {
    this.socket.on('this', (data: any) => {
      this._uiManagerResponseData$.next(String(data));
      console.log('message data recieved : ' + String(data));
    }

    );
  }
}

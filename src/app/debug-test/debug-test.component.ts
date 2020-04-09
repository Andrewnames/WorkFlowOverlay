import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIManagerService } from '../Services/ui-manager.service';
import { UIManagerCommonTypes_Command, COMMAND_DATA, COMMAND_TYPE } from '../Models/UIManagerCommonTypes';

@Component({
  selector: 'debug',//'app-debug-test',
  templateUrl: './debug-test.component.html',
  styleUrls: ['./debug-test.component.less']
})
export class DebugTestComponent implements OnInit {
  title = 'DebugTestPage';
  uiManagerCommandSubscription: Subscription;
  uiManagerNotificationSubscription: Subscription;
  uiManagerEntityDataSubscription: Subscription;
  notificationContent: String;
  testMessageContent: string;
  constructor(private uiManagerService: UIManagerService) { }

  ngOnInit(): void {
    this.uiManagerService.suscribeOnReceiveCommandFromWCRU();
    this.uiManagerCommandSubscription = this.uiManagerService.uiManagerResponseData$.subscribe(
      data => {
        if (data != undefined || data != '') {
          this.notificationContent = (data as String);
        }
        // console.log('notification' + String(data));
      },
      err => {
        console.log('error: ' + err);
      });

    this.uiManagerService.suscribeOnReceiveDataFromWCRU();
    this.uiManagerEntityDataSubscription = this.uiManagerService.uiManagerResponseData$.subscribe(
      data => {
        if (data != undefined || data != '') {
          this.notificationContent = (data as String);
        }
        // console.log('notification' + String(data));
      },
      err => {
        console.log('error: ' + err);
      });

    this.uiManagerService.suscribeOnReceiveNotificationFromWCRU();
    this.uiManagerNotificationSubscription = this.uiManagerService.uiManagerResponseData$.subscribe(
      data => {
        if (data != undefined || data != '') {
          this.notificationContent = (data as String);
        }
        // console.log('notification' + String(data));
      },
      err => {
        console.log('error: ' + err);
      });
  }

  ngOnDestroy() {
    this.uiManagerCommandSubscription.unsubscribe();
    this.uiManagerEntityDataSubscription.unsubscribe();
    this.uiManagerNotificationSubscription.unsubscribe();
  }

  onTestMessageSendClick() {
    try {

      let obj: UIManagerCommonTypes_Command = new UIManagerCommonTypes_Command();
      obj.CommandData = COMMAND_DATA.SII_PROTOCOL_MANAGER;
      obj.CommandType = COMMAND_TYPE.UI_CONTROL_HIDE;

    let jsonCommand :string = JSON.stringify(obj);

    this.uiManagerService.sendCommandFromOverlay(jsonCommand);
    console.log('sendCommandFromOverlay: passed');
    }
    catch (Error) {
      console.log('onTestMessageSendClick Error' + String(Error));
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { DataServiceService } from '../Services/DataService.service';
import { Router } from '@angular/router';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.less']
})
export class StatusBarComponent implements OnInit {
  SelectInjectionButtonActive = true;
  IsSettingAndMaintenanceVisible = true;
  IsPwlLabelVisible = false;
  IsSelectScreen = false;

  IsReadyToAddPatientData = false; // navigation button disabling properties
  IsReadyForReview = false;
  IsReadyToLock = false;
  private _ipc: IpcRenderer | undefined = void 0;


  constructor(iconRegistry: MatIconRegistry,
    private router: Router,
    sanitizer: DomSanitizer, private dataService: DataServiceService) {
    iconRegistry.addSvgIcon(
      'cog-wheel',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cogWheel.svg'));

    iconRegistry.addSvgIcon(
      'wrench',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wrench.svg'));

    iconRegistry.addSvgIcon(
      'question',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/question.svg'));

    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }


  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.processMessage(message));
  }
  processMessage(message: string): void {

    switch (message) {
      case 'select screen':
        console.log('hide setting button');
        this.IsSettingAndMaintenanceVisible = false;
        this.IsPwlLabelVisible = false;
        this.IsSelectScreen = true;

        break;
      case 'modality screen':
        console.log('hide setting button and show modality worklist label');
        this.IsSettingAndMaintenanceVisible = false;
        this.IsPwlLabelVisible = true;
        break;

      case 'activatePatientEdit':
        console.log('protocol was selected. ready to edit patient');
        this.IsReadyToAddPatientData = true;
        break;

      case 'activateProtocolReview':
        console.log('protocol was selected. ready to edit patient');
        this.IsReadyForReview = true;
        break;
      case 'activateLock':
        console.log('protocol under review. ready to lock');
        this.IsReadyToLock = true;
        break;
      default:
        break;
    }
  }

  navigationToggled(navigationEvent) {
    console.log('navigation toggled ' + navigationEvent);
    switch (navigationEvent.value) {
      case 'editPatient':
        this.dataService.changeMessage('editPatient');
        this.router.navigate(['select-protocol-screen']);

        break;
      case 'selectProtocol':
        this.dataService.changeMessage('selectProtocol');
        this.router.navigate(['select-protocol-screen']);
        break;
      case 'injectionReview':
        this.dataService.changeMessage('injectionReview');

        break;
      case 'proceedAndLock':

        if (this._ipc) {
          this._ipc.send('wrap-window');
        }


        break;

      default:
        break;
    }
  }

  exit() {
    window.close();
  }

}

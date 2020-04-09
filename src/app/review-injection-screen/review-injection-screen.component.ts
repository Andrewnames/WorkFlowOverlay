import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientModalityTableEntry } from '../Models/PatientModalityTableEntry';
import { ProcedureInfo } from '../Models/ProcedureInfo';
// animationrelated
import { trigger, transition, useAnimation } from '@angular/animations';

import { fadeInDown } from 'ng-animate';
import { slideInUp } from 'ng-animate';
import { flash } from 'ng-animate';
import { fadeInUp } from 'ng-animate';
import { fadeInRight } from 'ng-animate';


import { fadeInLeft } from 'ng-animate';
import { DataServiceService } from '../Services/DataService.service';
import { ProtocolPhase } from '../Models/ProtocolPhase';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NumpadControlPopupComponent } from '../select-protocol-screen/select-protocol-screen.component';
import * as moment from 'moment';
import { StandardProtocol } from '../Models/StandardProtocol';
import { Calculators } from '../utilities/calculators';
import { AdjustablePhase } from '../Models/AdjustablePhase';

@Component({
  selector: 'app-review-injection-screen',
  templateUrl: './review-injection-screen.component.html',
  styleUrls: ['./review-injection-screen.component.less'],
  animations: [
    trigger('fadeInDown', [transition('* => *', useAnimation(fadeInDown, {
      params: { timing: 0.25, a: '-100px', delay: 0 }
    }))]),
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft, {
      params: { timing: 0.2, d: '30px', delay: 0 }
    }))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp, {
      params: { timing: 0.1, delay: 0 }
    }))]),
    trigger('flash', [transition('* => *', useAnimation(flash, {
      params: { timing: 2, delay: 0.5 }
    }))]),
    trigger('fadeInUp', [transition('* => *', useAnimation(fadeInUp, {
      params: { timing: 0.25, a: '100px', delay: 0 }
    }))]),
    trigger('fadeInRight', [transition('* => *', useAnimation(fadeInRight, {
      params: { timing: 0.25, a: '100px', delay: 0 }
    }))]),

  ]
})
export class ReviewInjectionScreenComponent implements OnInit {
  ProcedureInfo: ProcedureInfo;
  ProcedurePhases: AdjustablePhase[] = [];

  TotalContrast = '— — — ';
  TotalSaline = '— — — ';
  TotalDuration = '— — — ';

  fadeInDown: any;
  flash: any;
  fadeInRight: any;
  fadeInUp: any;
  fadeInLeft: any;

  constructor(private router: Router,
    private dataService: DataServiceService,
    public dialog: MatDialog,
  ) {


    const navigaion = this.router.getCurrentNavigation();
    const procedure = navigaion.extras.queryParams as ProcedureInfo;
    console.log('caught procedure on  injection review screen');
    console.log(procedure);
    this.ProcedureInfo = procedure;
    procedure.protocolPlan.standardProtocols[0].phases.forEach(phase => {
      this.ProcedurePhases.push(new AdjustablePhase(phase));
    });

    this.calculateTotals();

    setTimeout(() => {
      this.dataService.changeMessage('activateLock');
    },
      1000);

  }

  ngOnInit() {
  }


  getDecimalSeparator() {
    let n = 1.1;
    return n.toLocaleString().substring(1, 2);
  }

  calculateTotals() {
    this.TotalContrast = Calculators.totalContrastVolume(this.ProcedureInfo.protocolPlan.standardProtocols[0]).toString() + ' ml';
    this.TotalSaline = Calculators.totalSalineVolume(this.ProcedureInfo.protocolPlan.standardProtocols[0]).toString() + ' ml';
    this.TotalDuration = Calculators.totalDuration(this.ProcedureInfo.protocolPlan.standardProtocols[0]);
    this.ProcedurePhases.forEach(phase => { phase.calculateDeltas(); });
  }

  editPhaseValues(_phase: ProtocolPhase, propertyType: string, event?: Event) {

    // (event as MouseEvent). release button focus here

    let propertyUnit;
    let propertyFieldName;
    let propertyValue;
    let numbersSeparator = this.getDecimalSeparator();
    let timeMask;




    switch (propertyType) { // this possibly will be globalized
      case 'FlowRate':
        propertyFieldName = 'Flow Rate';
        propertyUnit = 'ml/sec'; // can be taken from configs
        propertyValue = this.ProcedureInfo.protocolPlan.standardProtocols[0].phases.find(x => x.orderIndex === _phase.orderIndex).flowRate;
        break;
      case 'Volume':
        propertyFieldName = 'Volume';
        propertyUnit = 'ml'; // can be taken from configs
        propertyValue = this.ProcedureInfo.protocolPlan.standardProtocols[0].phases.find(x => x.orderIndex === _phase.orderIndex).volume;
        break;
      case 'Duration':
        propertyFieldName = 'Duration';
        timeMask = true;
        propertyUnit = ''; // can be taken from configs
        numbersSeparator = ' ';
        let phase = this.ProcedureInfo.protocolPlan.standardProtocols[0].phases.find(x => x.orderIndex === _phase.orderIndex);
        if (phase.type === 2) { // hold
          propertyValue = Calculators.ticksToDate(phase.durationTicks);
        }
        if (phase.type === 3) { // pause
          propertyValue = Calculators.secondsToDate(phase.pauseSeconds);
        }
        break;
      default:
        break;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.height = '630px';
    dialogConfig.width = '925px';

    dialogConfig.position = {
      top: '70px',
      left: '0px'
    };

    dialogConfig.data = {
      phase: _phase,
      protocolName: this.ProcedureInfo.protocolPlan.name,
      units: propertyUnit,
      denumerator: numbersSeparator,
      value: propertyValue,
      fieldName: propertyFieldName,
      mask: timeMask

    };

    const dialogRef = this.dialog.open(NumpadControlPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result != null) {
        let phase = this.ProcedureInfo.protocolPlan.standardProtocols[0].phases.find(x => x.orderIndex === _phase.orderIndex);
        let uiPhase = this.ProcedurePhases.find(x => x.orderIndex === _phase.orderIndex);

        switch (propertyType) { // this possibly will be globalized
          case 'FlowRate':
            phase.flowRate = result[0];
            uiPhase.flowRate = result[0];

            break;
          case 'Volume':
            phase.volume = result[0];
            uiPhase.volume = result[0];

          case 'Duration':
            console.log('time numpad value is ' + result[0])
            if (phase.type === 2) { // hold
              let ticks = Calculators.numpadTimeToCSharpTicks(result[0]);
              phase.durationTicks = uiPhase.durationTicks = ticks;

            }
            if (phase.type === 3) { // pause
              let seconds = Calculators.numpadTimeToSeconds(result[0]);
              phase.pauseSeconds = uiPhase.pauseSeconds = seconds;

            }
            break;
          default:
            break;
        }

        phase.durationTicks = Calculators.calculatePhaseDuration(phase);
        uiPhase.durationTicks = Calculators.calculatePhaseDuration(phase);

        this.calculateTotals();
        //this.calculateDeltas(); // run adjustments calculation
      }
    });

  }

}

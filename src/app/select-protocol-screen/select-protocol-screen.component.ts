import { Component, OnInit, Output, Inject, ApplicationRef, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PatientModalityTableEntry } from '../Models/PatientModalityTableEntry';
import { DataServiceService } from '../Services/DataService.service';
import { BasicProtocolPlan } from '../Models/BasicProtocolPlan';
import { ArchivedProtocol } from '../Models/ArchivedProtocol';
import * as faker from 'faker';
import { AnatomicalRegion } from '../Models/AnatomicalRegion.enum';
import { Guid } from 'guid-typescript';
import { MatRadioChange, MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LOCALE_ID } from '@angular/core';

// animationrelated
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeAnimation } from '../animations';
import { fadeInDown } from 'ng-animate';
import { slideInUp } from 'ng-animate';
import { flash } from 'ng-animate';
import { fadeInUp } from 'ng-animate';
import { fadeInRight } from 'ng-animate';


import { fadeInLeft } from 'ng-animate';
import { ProtocolPlan } from '../Models/ProtocolPlan';
import { StandardProtocol } from '../Models/StandardProtocol';
import { PhaseType } from '../Models/PhaseType.enum';
import { ProtocolPhase } from '../Models/ProtocolPhase';

import 'aos/dist/aos.css';
import * as moment from 'moment';
import { ProcedureInfo } from '../Models/ProcedureInfo';

import { Calculators } from '../utilities/calculators';





@Component({
  selector: 'app-select-protocol-screen',
  templateUrl: './select-protocol-screen.component.html',
  styleUrls: ['./select-protocol-screen.component.less'],
  animations: [fadeAnimation,
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


export class SelectProtocolScreenComponent implements OnInit, OnDestroy {
  fadeInDown: any;
  flash: any;
  fadeInRight: any;
  fadeInUp: any;
  fadeInLeft: any;
  NumberOfTemplates = 0; // TODO: these gonna come from  the service
  NumberOfPriors = 0;
  PressureUnit = 'PSI';

  // cross-layers communication service related


  // expanders open/close state
  panelOpenState = false;
  // navigation triggers
  IsProtocolSelectionActive = false;
  IsPatientDataEditActive = false;

  PatientInfoHeaderVisible = true;



  PressureLimits: number[] = [100,
    150,
    200,
    225,
    250,
    300];

  kVpValues: number[] = [70, 80, 90, 100, 120, 140];
  TotalSaline = '— — — ';
  TotalContrast = '— — — ';
  TotalDuration = '— — — ';

  eGfr = 150; // fake it till you make it (FITYMI)
  isTransitBolus;
  SelectedPressureValue = 150;
  SelectedPatient: PatientModalityTableEntry;
  public SelectedProtocol: ProtocolPlan;
  public SelectedProtocolForExpander: ProtocolPlan = new ProtocolPlan(); // these are to handle collpasing state for navigation
  public SelectedProtocolRadioButton: MatRadioButton;

  ProtocolTemplatesList: [string, ProtocolPlan[]][]; // tupples  array for protocol drodown
  PatientPriorsList: ArchivedProtocol[];


  // validations
  contrastControl = new FormControl('', Validators.required);


  constructor(
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dataService: DataServiceService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    @Inject(LOCALE_ID) public locale: string,

  ) {

    iconRegistry.addSvgIcon(
      'patient-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/patient.svg'));
    iconRegistry.addSvgIcon(
      'alert-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/alert.svg'));
    iconRegistry.addSvgIcon(
      'exclamationWhite-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/whiteExclamationCircle.svg'));
    iconRegistry.addSvgIcon(
      'contrast-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/contrastIcon.svg'));
    iconRegistry.addSvgIcon(
      'saline-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/salineIcon.svg'));





    const navigaion = this.router.getCurrentNavigation();
    const patient = navigaion.extras.queryParams as PatientModalityTableEntry;
    console.log('caught selected patient on  selection screen');
    console.log(patient);
    this.SelectedPatient = patient;
  }
  ngOnDestroy() {
  }
  ngOnInit() {

    this.dataService.currentMessage.subscribe(message => this.processMessage(message));
    this.PatientPriorsList = [];
    this.ProtocolTemplatesList = [];


    // fill up the plan
    for (const region in AnatomicalRegion) {
      if (isNaN(Number(region))) {
        const basicPlansPerRegion = [];

        //  emulate list of plans
        for (let index = 0; index < 2; index++) {
          const newPlan = new ProtocolPlan();
          newPlan.name = faker.hacker.noun();
          newPlan.anatomicalRegion = region;
          newPlan.description = faker.hacker.phrase();
          newPlan.uniqueId = Guid.create();
          newPlan.standardProtocols = [];
          // create actual steps
          for (let index = 0; index < 1; index++) {
            const newStep = new StandardProtocol();
            newStep.description = faker.hacker.phrase();
            newStep.isTestInjection = faker.random.boolean();
            newStep.pressureLimit = faker.random.number(2000);
            newStep.uniqueId = Guid.create();
            // lets make phases
            newStep.phases = [];
            for (let pindex = 0; pindex < 5; pindex++) {
              const newPhase = new ProtocolPhase();
              newPhase.orderIndex = pindex;
              newPhase.type = PhaseType[PhaseType[faker.random.arrayElement([0, 1, 2, 3, 6])]];
              if (newPhase.type === PhaseType.Inject_A) { newPhase.contrastRatio = 100; }
              if (newPhase.type === PhaseType.Inject_B) { newPhase.contrastRatio = 0; }
              if (newPhase.type === PhaseType.Ratio) { newPhase.contrastRatio = faker.random.number(100); }

              newPhase.volume = faker.random.number({ min: 1, max: 100 });
              newPhase.flowRate = faker.random.number({ min: 1, max: 10 });
              if (newPhase.type === PhaseType.Pause) {
                newPhase.pauseSeconds = faker.random.number(1200);
                newPhase.durationTicks = NaN;
              } else if (newPhase.type === PhaseType.Hold) {
                newPhase.durationTicks = (faker.date.past(faker.random.number(40)) * 10000) + 621355968000000000;

              } else {
                newPhase.durationTicks = Calculators.calculatePhaseDuration(newPhase);
              }
              newStep.phases.push(newPhase);
            }
            newPlan.standardProtocols.push(newStep);
          }
          basicPlansPerRegion.push(newPlan);
        }
        this.NumberOfTemplates += basicPlansPerRegion.length;
        const templateTuple: [string, ProtocolPlan[]] = [region, basicPlansPerRegion];
        this.ProtocolTemplatesList.push(templateTuple);
      }

    }
    for (let index = 0; index < 6; index++) {
      const planFromList = this.ProtocolTemplatesList[index][1][0];
      const newPrior = new ArchivedProtocol();
      newPrior.protocolPlan = planFromList;
      newPrior.studyName = 'study of ' + faker.hacker.noun() + ' and ' + faker.hacker.noun();
      newPrior.kvp = faker.random.arrayElement(this.kVpValues);
      newPrior.studyDate = faker.date.past(faker.random.number(4));
      newPrior.weight = faker.random.number(100);
      newPrior.studyDescription = faker.hacker.phrase();
      newPrior.id = Guid.create();
      this.PatientPriorsList.push(newPrior);

    }
    this.NumberOfPriors = this.PatientPriorsList.length;
    console.log(this.ProtocolTemplatesList);
  }
  processMessage(message: string): void {

    switch (message) {
      case 'editPatient':
        this.IsPatientDataEditActive = true;
        this.IsProtocolSelectionActive = false;
        break;
      case 'selectProtocol':
        this.IsProtocolSelectionActive = true;
        this.IsPatientDataEditActive = false;
        break;
      case 'injectionReview': // navigate to injection review screen

        const injectionInfo = new ProcedureInfo();
        injectionInfo.protocolPlan = this.SelectedProtocol;
        injectionInfo.patientInfo = this.SelectedPatient;

        let navigationExtras: NavigationExtras = {


          queryParams: injectionInfo
        };
        // localStorage.setItem('selectScreenComponent', JSON.stringify(this));
        this.router.navigate(['review-injection-screen'], navigationExtras);

        break;
      default:
        break;
    }

  }

  planSelected(planselectedChange: MatRadioChange) { // assign selected protocol from prior or new template

    this.SelectedProtocolRadioButton = planselectedChange.source;

    if (planselectedChange.source.value instanceof ArchivedProtocol) {
      this.SelectedProtocolForExpander.anatomicalRegion = null;
      this.SelectedProtocolForExpander = null;
      this.SelectedProtocolForExpander = new ProtocolPlan(); // to collaps expander for templates

      this.SelectedProtocol = planselectedChange.source.value.protocolPlan;
      this.SelectedPressureValue = this.SelectedProtocol?.standardProtocols[0].pressureLimit;
      console.log('triggered   ' + this.ProtocolTemplatesList[0][0] === this.SelectedProtocolForExpander.anatomicalRegion);
      console.log('selected archived  plan guid ' + planselectedChange.source.value.protocolPlan.uniqueId);


    }
    if (planselectedChange.source.value instanceof ProtocolPlan) {
      this.SelectedProtocol = planselectedChange.source.value;
      this.SelectedProtocolForExpander = planselectedChange.source.value;
      console.log('selected protocol  plan guid ' + planselectedChange.source.value.uniqueId);

    }
    // activate navigation to patient data
    this.dataService.changeMessage('activatePatientEdit');
    this.calculateTotals();
  }

  comparePressureLimits(object1: any, object2: any) {
    return false; // need to make pressure out of limits listed be able ещ фыышптув
  }

  calculateTotals() {
    this.TotalContrast = Calculators.totalContrastVolume(this.SelectedProtocol.standardProtocols[0]).toString() + ' ml';
    this.TotalSaline = Calculators.totalSalineVolume(this.SelectedProtocol.standardProtocols[0]).toString() + ' ml';
    this.TotalDuration = Calculators.totalDuration(this.SelectedProtocol.standardProtocols[0]);

  }

  randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }


  isTransitBolusSelected(toggleButtonSelectedEvent) {
    this.isTransitBolus = toggleButtonSelectedEvent.value;
  }

  getDecimalSeparator() {
    let n = 1.1;
    return n.toLocaleString().substring(1, 2);
  }

  openNumPad(propertyType: string) {
    let propertyUnit;
    let propertyFieldName;
    let propertyValue;


    switch (propertyType) { // this possibly will be globalized
      case 'height':
        propertyFieldName = 'Height';
        propertyUnit = 'in'; // can be taken from configs
        propertyValue = this.SelectedPatient.PatientHeight;
        break;
      case 'weight':
        propertyFieldName = 'Weight';
        propertyUnit = 'lb'; // can be taken from configs
        propertyValue = this.SelectedPatient.PatientWeight;
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
      protocolName: this.SelectedProtocol.name,
      units: propertyUnit,
      denumerator: this.getDecimalSeparator(),
      value: propertyValue,
      fieldName: propertyFieldName

    };

    const dialogRef = this.dialog.open(NumpadControlPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result != null) {
        switch (propertyType) { // this possibly will be globalized
          case 'height':
            this.SelectedPatient.PatientHeight = result[0];
            break;
          case 'weight':
            this.SelectedPatient.PatientWeight = result[0];
            break;
          default:
            break;
        }
        this.runRequiredsCheck(); // check if we have everything we need to unlock next navigation
      }
    });
  }
  runRequiredsCheck() {
    if (true) { // check all reauired fields
      this.dataService.changeMessage('activateProtocolReview');

    }
  }
}



export interface NumpadData {
  phase?: ProtocolPhase;
  protocolName: string;
  units: string;
  denumerator: string;
  value: number;
  fieldName: string;
  mask?: string;
}

@Component({
  selector: 'num-pad-control',
  templateUrl: '../num-pad-control/num-pad-control.component.html',
  animations: [fadeAnimation,
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
export class NumpadControlPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NumpadControlPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NumpadData,
    private ref: ChangeDetectorRef,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {

    iconRegistry.addSvgIcon(
      'backspace-arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/backspace-arrow.svg'));

  }

  fadeInDown: any;
  flash: any;
  fadeInRight: any;
  fadeInUp: any;
  fadeInLeft: any;
  numPadValue: string = this.data.value.toString();
  isSeparatorUsed: boolean;
  separator = this.getDecimalSeparator(LOCALE_ID);

  ngOnInit() {
    this.checkIfSeparatorUsed();
  }
  backspaceClick() {
    this.numPadValue = '';
    this.checkIfSeparatorUsed();
  }
  getDecimalSeparator(locale) {
    let n = 1.1;
    return n.toLocaleString().substring(1, 2);
  }

  numButtonClicked(event) {

    if (this.numPadValue.includes(this.separator)) {
      // if (this.numPadValue.length > this.numPadValue.ValueLength + 1) {
      //   return;
      // }
    } else {
      // if (this.numPadValue.Length >= this.numPadValue.ValueLength && num != Separator) {
      //   return;
      // }
    }

    this.numPadValue += event.target.textContent;
    this.checkIfSeparatorUsed();
  }

  backspaceButtonClicked() {

    if (this.numPadValue.length > this.numPadValue.length - 1) {
      this.numPadValue = this.numPadValue.slice(0, this.numPadValue.length - 1);
    }

    this.checkIfSeparatorUsed();
  }

  checkIfSeparatorUsed() {
    this.isSeparatorUsed = this.numPadValue.includes(this.separator);
    this.ref.detectChanges();

  }
  okClicked() {
    console.log('numpad value cleared');
    this.dialogRef.close([this.numPadValue, this.data.phase]);

  }
  cancelClicked() {

    this.dialogRef.close();
  }

  clearInput() {
    this.numPadValue = '';
    this.checkIfSeparatorUsed();
  }
}




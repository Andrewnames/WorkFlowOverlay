import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PatientModalityTableEntry } from '../Models/PatientModalityTableEntry';
import { DataServiceService } from '../DataService.service';
import { BasicProtocolPlan } from '../Models/BasicProtocolPlan';
import { ArchivedProtocol } from '../Models/ArchivedProtocol';
import * as faker from 'faker';
import { AnatomicalRegion } from '../Models/AnatomicalRegion.enum';
import { Guid } from 'guid-typescript';
import { MatRadioChange } from '@angular/material/radio';
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




@Component({
  selector: 'app-select-protocol-screen',
  templateUrl: './select-protocol-screen.component.html',
  styleUrls: ['./select-protocol-screen.component.css'],
  animations: [fadeAnimation,
    trigger('fadeInDown', [transition('* => *', useAnimation(fadeInDown, {
      params: { timing: 0.1, delay: 0 }
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


export class SelectProtocolScreenComponent implements OnInit {
  fadeInDown: any;
  flash: any;
  fadeInRight: any;
  fadeInUp: any;
  fadeInLeft: any;
  NumberOfTemplates = 0; // TODO: these gonna come from  the service
  NumberOfPriors: number = 0;
  PressureUnit = 'PSI';
  PressureLimits: number[] = [100,
    150,
    200,
    225,
    250,
    300];
  SelectedPatient: PatientModalityTableEntry;
  SelectedProtocol: ProtocolPlan;
  ProtocolTemplatesList: [string, ProtocolPlan[]][]; // tupples  array for protocol drodown
  PatientPriorsList: ArchivedProtocol[];

  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataService: DataServiceService) {

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
    console.log('caught on  selection screen');
    console.log(patient);
    this.SelectedPatient = patient;
  }

  ngOnInit() {

    this.dataService.currentMessage.subscribe(message => this.processMessage(message));


    this.PatientPriorsList = [];

    this.ProtocolTemplatesList = [];


    //fill up the plan
    for (const region in AnatomicalRegion) {
      if (isNaN(Number(region))) {

        const basicPlansPerRegion = [];
        //  emulate list of plans
        for (let index = 0; index < 2; index++) {
          let newPlan = new ProtocolPlan();
          newPlan.name = faker.hacker.noun();
          newPlan.anatomicalRegion = region;
          newPlan.description = faker.hacker.phrase();
          newPlan.uniqueId = Guid.create();
          newPlan.standardProtocols = [];
          // create actual steps
          for (let index = 0; index < 2; index++) {
            const newStep = new StandardProtocol();
            newStep.description = faker.hacker.phrase();
            newStep.isTestInjection = faker.random.boolean();
            newStep.pressureLimit = faker.random.number(2000);
            newStep.uniqueId = Guid.create();
            // lets make phases
            newStep.phases = [];
            for (let pindex = 0; pindex < 8; pindex++) {
              const newPhase = new ProtocolPhase();
              newPhase.type = PhaseType[PhaseType[faker.random.arrayElement([0, 1, 2, 3, 6])]];


              if (newPhase.type === PhaseType.Inject_A) { newPhase.contrastRatio = 100; }
              if (newPhase.type === PhaseType.Inject_B) { newPhase.contrastRatio = 0; }
              newPhase.volume = faker.random.number(100);
              if (newPhase.type === PhaseType.Pause) { newPhase.pauseSeconds = faker.random.number(1200); }
              newPhase.flowRate = faker.random.number(25);
              newPhase.durationTicks = (faker.date.past(faker.random.number(40)) * 10000) + 621355968000000000;
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
      let planFromList = this.ProtocolTemplatesList[index][1][0];
      const newPrior = new ArchivedProtocol();
      newPrior.protocolPlan = planFromList;
      newPrior.studyName = 'study of ' + faker.hacker.noun() + ' and ' + faker.hacker.noun();
      newPrior.kvp = faker.random.number();
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

  }

  planSelected(planselectedChange: MatRadioChange) { // assign selected protocol from prior or new template


    if (planselectedChange.source.value instanceof ArchivedProtocol) {
      console.log('selected archived  plan guid ' + planselectedChange.source.value.protocolPlan.uniqueId);
      this.SelectedProtocol = planselectedChange.source.value.protocolPlan;

    }
    if (planselectedChange.source.value instanceof ProtocolPlan) {
      console.log('selected protocol  plan guid ' + planselectedChange.source.value.uniqueId);
      this.SelectedProtocol = planselectedChange.source.value;
    }
    // activate navigation to patient data
    this.dataService.changeMessage('activatePatientEdit');
    this.calculateTotals();
  }

  calculateTotals() {

  }

  randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }

}

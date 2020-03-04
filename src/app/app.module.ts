import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartupScreenComponent } from './StartupScreen/startup-screen/startup-screen.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'; // material design imports
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { ModalityScreenComponent } from './modality-screen/modality-screen.component';
import { SelectProtocolScreenComponent } from './select-protocol-screen/select-protocol-screen.component';
import { DataServiceService } from './DataService.service';


import { AppRouting } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    StartupScreenComponent,
    StatusBarComponent,
    ModalityScreenComponent,
    SelectProtocolScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgScrollbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule,
    AppRouting
  ],
  providers: [DataServiceService], // here services go to register
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }



}

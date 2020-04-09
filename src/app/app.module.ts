import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartupScreenComponent } from './StartupScreen/startup-screen/startup-screen.component';
import {MatRippleModule} from '@angular/material/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'; // material design imports
import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { ModalityScreenComponent } from './modality-screen/modality-screen.component';
import { SelectProtocolScreenComponent, NumpadControlPopupComponent  } from './select-protocol-screen/select-protocol-screen.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DataServiceService } from './Services/DataService.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppRouting } from './app-routing.module';
import { TicksToDatePipePipe } from "./utilities/ticksToDatePipe.pipe";
import { ReviewInjectionScreenComponent } from './review-injection-screen/review-injection-screen.component';
import { DebugTestComponent } from './debug-test/debug-test.component';
import { AbsoluteValuePipe } from './utilities/absoluteValue.pipe';
import {IMaskModule} from 'angular-imask';
import { Ng5SliderModule } from 'ng5-slider';
const config: SocketIoConfig = { url: 'http://localhost:3005', options: {} };



@NgModule({
   declarations: [
      AppComponent,
      StartupScreenComponent,
      StatusBarComponent,
      ModalityScreenComponent,
      SelectProtocolScreenComponent,
      NumpadControlPopupComponent,
      TicksToDatePipePipe,
      AbsoluteValuePipe,
      ReviewInjectionScreenComponent,
      DebugTestComponent
   ],
   imports: [
      BrowserModule,
      NoopAnimationsModule,
      BrowserAnimationsModule,
      NgScrollbarModule,
      MatBadgeModule,
      MatRippleModule,
      MatIconModule,
      MatDialogModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatRadioModule,
      MatCheckboxModule,
      MatSelectModule,
      MatTabsModule,
      MatCardModule,
      MatDividerModule,
      MatFormFieldModule,
      FormsModule,
      MatTableModule,
      MatInputModule,
      MatSlideToggleModule,
      MatExpansionModule,
      HttpClientModule,
      AppRoutingModule,
      SocketIoModule.forRoot(config),
      IMaskModule,
      Ng5SliderModule,
      AppRouting
   ],
   exports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule
   ],
   providers: [
      DataServiceService,
      TicksToDatePipePipe,
      AbsoluteValuePipe
   ],
   entryComponents: [
      SelectProtocolScreenComponent,
      NumpadControlPopupComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }



}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartupScreenComponent } from './StartupScreen/startup-screen/startup-screen.component';
import { ModalityScreenComponent } from './modality-screen/modality-screen.component';
import { SelectProtocolScreenComponent } from './select-protocol-screen/select-protocol-screen.component';
import { ReviewInjectionScreenComponent } from './review-injection-screen/review-injection-screen.component'
import { DebugTestComponent } from './debug-test/debug-test.component';


const routes: Routes = [
  { path: '', redirectTo: 'startup-screen', pathMatch: 'full' },
  { path: 'debug', component: DebugTestComponent, data: null },
  { path: 'startup-screen', component: StartupScreenComponent, data: { state: 'startup-screen' } },
  { path: 'modality-worklist', component: ModalityScreenComponent, data: { state: 'modality-worklist' } },
  { path: 'select-protocol-screen', component: SelectProtocolScreenComponent, data: { state: 'select-protocol-screen' } },
  { path: 'review-injection-screen', component: ReviewInjectionScreenComponent, data: { state: 'review-injection-screen' } },

  // {path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppRouting = RouterModule.forRoot(routes, {
  useHash: true
});

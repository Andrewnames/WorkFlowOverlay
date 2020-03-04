import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartupScreenComponent } from './StartupScreen/startup-screen/startup-screen.component';
import { ModalityScreenComponent } from './modality-screen/modality-screen.component';
import { SelectProtocolScreenComponent } from './select-protocol-screen/select-protocol-screen.component';



const routes: Routes = [
  { path: '', redirectTo: 'startup-screen', pathMatch: 'full' },
  { path: 'startup-screen', component: StartupScreenComponent, data: { state: 'startup-screen' } },
  { path: 'modality-worklist', component: ModalityScreenComponent, data: { state: 'modality-worklist' } },
  { path: 'select-protocol-screen', component: SelectProtocolScreenComponent, data: { state: 'select-protocol-screen' } },

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

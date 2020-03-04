import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../DataService.service';

@Component({
  selector: 'app-startup-screen',
  templateUrl: './startup-screen.component.html',
  styleUrls: ['./startup-screen.component.css']
})
export class StartupScreenComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry,
    private dataService: DataServiceService,
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router) {
    iconRegistry.addSvgIcon(
      'info-leaf',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/infoLeaf.svg'));

  }

  ngOnInit() {
    // this.dataService.currentMessage.subscribe(message => this.processMessage(message));
  }



  navigateToPwl() {
    this.router.navigate(['modality-worklist']);
    console.log('navigate to pwl');
    this.dataService.changeMessage('modality screen'); // TODO send message to status bar
  }

}

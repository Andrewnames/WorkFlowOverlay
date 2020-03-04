import { Component } from '@angular/core';
import { fadeAnimation } from './animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})


export class AppComponent {
  title = 'Overlay';

  prepareRoute(outlet: RouterOutlet) {
    let animationstate = outlet.isActivated ? outlet.activatedRoute : '';
   // console.log('outlet state is ' + animationstate);
    return animationstate;
  }

}


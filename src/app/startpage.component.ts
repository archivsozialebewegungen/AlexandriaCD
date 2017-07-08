import { Component } from '@angular/core';
import { AlexandriaService } from './alexandria.service';


@Component({
  selector: 'start',
  templateUrl: './htmlpage.html'
})
export class StartPageComponent {

	pagecontent;

	constructor(private _alexandriaService: AlexandriaService) {

	  	this.pagecontent = _alexandriaService.getStartPageHtml();

    }
      
}

import { Component } from '@angular/core';
import { AlexandriaService } from './alexandria.service';

@Component({
  selector: 'imprint',
  templateUrl: './htmlpage.html'
})
export class ImprintPageComponent {

	pagecontent;

	constructor(private _alexandriaService: AlexandriaService) {

	  	this.pagecontent = _alexandriaService.getImprintPageHtml();

    }
  
}

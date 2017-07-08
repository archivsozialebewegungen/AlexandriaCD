import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
    

import { AlexandriaService } from './alexandria.service';
import { DocumentDisplayComponent } from './documentdisplay.component';
import { JQ_TOKEN } from './jQuery.service';

@Component({
  selector: 'document-details',
  templateUrl: 'documentdetails.component.html'
})
export class DocumentDetailsComponent implements OnDestroy {
  
	document: any;
	related_events: object[];
	document_file_rows: object[];
  
	private _subscription: any;
  
	constructor(@Inject(JQ_TOKEN) private $: any,
                private _alexandriaService: AlexandriaService,
                private _route: ActivatedRoute,
                private _dialogService: DialogService) {
                
	}
	
	showSomething() {
		alert("Something");
	}
	
	displayDocument(document_file_info) {
		this._alexandriaService.addDisplayFilePath(document_file_info);
		this._dialogService.addDialog(
			DocumentDisplayComponent,
			{selected_file_info: document_file_info, imagewidth: '100'});
	}
	
	ngOnInit(): void {
		this._subscription = this._route.params.subscribe(
  			params => {
       			this.document = this._alexandriaService.addPdfPath(this._alexandriaService.getDocument(params['id']));
       			this.related_events = this._alexandriaService.getRelatedEvents(this.document);
	    		this.document_file_rows = this._alexandriaService.buildRows(this.document.file_infos);
			}
		);
  	}
  
	ngOnDestroy() {
		this._subscription.unsubscribe();
  	}
}
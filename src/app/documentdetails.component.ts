import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { DialogService } from "ng2-bootstrap-modal";
    

import { AlexandriaService, Dokument, Event, FileInfo } from './alexandria.service';
import { JQ_TOKEN } from './jQuery.service';

@Component({
  selector: 'document-details',
  templateUrl: 'documentdetails.component.html'
})
export class DocumentDetailsComponent implements OnDestroy {
  
	document!: Dokument;
	current_document_file!: FileInfo;
	related_events: Event[] = [];
	document_file_rows: FileInfo[][] = [<FileInfo[]>[]];
  
	private _subscription: any;
  
	constructor(
		@Inject(JQ_TOKEN) private $: any,
        private _alexandriaService: AlexandriaService,
        private _route: ActivatedRoute,
        private modalService: NgbModal
        //,
        //private _dialogService: DialogService
        ) {
                
	}

	displayDocument(template: any, document_file: FileInfo) {
		this._alexandriaService.addDisplayFilePath(document_file);
		this.current_document_file = document_file;
	    this.modalService.open(template, { scrollable: true, windowClass : "documentDisplayClass" });
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
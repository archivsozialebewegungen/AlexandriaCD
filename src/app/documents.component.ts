import { Component, OnInit } from '@angular/core';
import { AlexandriaService } from './alexandria.service';
import { DatatablesService } from './datatables.service';

@Component({
  selector: 'documents',
  templateUrl: 'documents.component.html'
})
export class DocumentsComponent implements OnInit {
  
  dtOptions: DataTables.Settings;
  documents;
  
  constructor(
  	private _alexandriaService: AlexandriaService,
  	private _datatablesService: DatatablesService
  ) {}
  

  ngOnInit(): void {
  	let columnOptions: DataTables.ColumnSettings[] = [
		{
		},
		{
		},
		{
			orderable: false
		}
	];

    this.dtOptions = this._datatablesService.getDatatableOptions(columnOptions);
	this.documents = this._alexandriaService.getAllDocuments();
  }
}
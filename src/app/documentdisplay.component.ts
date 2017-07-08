import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface DocumentDisplayModel {
	selected_file_info: any;
  	imagewidth: string;
}
@Component({
	selector: 'document-display',
	templateUrl: 'documentdisplay.component.html'
})
export class DocumentDisplayComponent extends DialogComponent<DocumentDisplayModel, boolean> implements DocumentDisplayModel {
  selected_file_info: any;
  imagewidth: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
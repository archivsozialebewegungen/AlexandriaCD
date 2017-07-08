import { Injectable, Inject } from '@angular/core';
import * as _ from "lodash";

declare var alexandria: any;

@Injectable()

export class AlexandriaService {

	getStartPageHtml() {
		return alexandria.pagecontent.startpage;
	}

	getImprintPageHtml() {
		return alexandria.pagecontent.imprint;
	}
	
	getAllEvents() {
		return alexandria.data.events;
	}

	getAllDocuments() {
		return alexandria.data.documents;
	}
	
	getEvent(id) {
	
		for (let event of alexandria.data.events) {
			if (event._id == id) {
				return event;
			}
		}
		return null;
	}

	getDocument(id) {
	
		for (let document of alexandria.data.documents) {
			if (document._id == id) {
				return document;
			}
		}
		return null;
	}
	
	getDocuments(document_ids) {
	
		let documents = [];
		let index = -1;
		for (let document_id of document_ids) {
			documents[++index] = this.getDocument(document_id);
		}
		return documents;
	
	}
	
	addThumbnails(documents) {
		return _.map(
			documents, 
			(document) => {
				return this.addThumbnailPath(document);
			},
		);
	}
	
	buildRows(documents) {
	
		documents = this.addThumbnails(documents);
		
		let rows = _.reduce(
			documents,
			function(rows, document) {
				var current_row = rows[rows.length-1];
				if (current_row.length == 3) {
					rows.push([]);
					current_row = rows[rows.length-1]
				};
				current_row.push(document);
				return rows;
			},
			[[]]
		)
		return rows;	
	}
	
	getEvents(event_ids) {
	
		let events = [];
		let index = -1;
		for (let event_id of event_ids) {
			events[++index] = this.getEvent(event_id);
		}
		return events;
	}
	
	getRelatedDocuments(event) {
	
		return this.getDocuments(event.related_documents);
	}
	
	getRelatedEvents(document) {
	
		return this.getEvents(document.related_events);
	}
	
	getCrossReferences(event) {
	
		return this.getEvents(event.related_events);
	}

	addThumbnailPath(document) {
		let filename = this.createFilename(document, '.png');
		document.thumbnail = "assets/thumbnails/" + filename;
		return document;
	}
	
	addDisplayFilePath(document) {
		let filename = this.createFilename(document, '.png');
		document.display_file = "assets/screen/" + filename;
		return document;
	}
	
	addPdfPath(document) {
		let filename = this.createFilename(document, '.pdf');
		document.pdf = "assets/pdf/" + filename;
		return document;
	}
	
	private createFilename(document, extension) {
		let filename = document._id + '';
		while(filename.length < 8){
			filename = '0' + filename;
		}
		return filename + extension;
	}
	
}
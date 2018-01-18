import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'app';

	constructor(public messageService: MessageService) {

	}

	ngOnInit() {
		setTimeout(() => this.openClic(), 500);
	}

	openClic() {
		this.messageService.alert('Mensagem de teste');
	}
}

import { Injectable } from '@angular/core';
import { DialogService } from '../components/services/dialog.service';
import { MessageComponent } from './message.component';
import { DialogOptionsModel } from '../components/models';
import { MessageModel } from './message.model';
import { MessageTypeEnum } from './message-type.enum';

@Injectable()
export class MessageService {

	constructor(public dialog: DialogService) {

	}

	alert(message: string): Promise<any> {
		return this.open(MessageTypeEnum.Alert, message);
	}

	open(type: MessageTypeEnum, message: string): Promise<any> {
		const options = <DialogOptionsModel<MessageModel>> {
			data: <MessageModel>{
				message,
				type
			},
			top: '10vh'
		};

		return this.dialog.open<MessageModel>(MessageComponent, options).result;
	}

}

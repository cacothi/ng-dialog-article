import { MessageTypeEnum } from "./message-type.enum";

export class MessageModel {
	constructor(public type: MessageTypeEnum,
		public message: string) {

		}
}

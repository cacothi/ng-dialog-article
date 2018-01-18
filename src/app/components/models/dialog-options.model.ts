export class DialogOptionsModel<T = any> {

	public backdrop = true;

	public closeOutsideClick = true;

	public beforeDismiss: Function;

	public keyboard = true;

	public top?: string = '20vh';

	public windowClass?: string;

	public data: T;
}

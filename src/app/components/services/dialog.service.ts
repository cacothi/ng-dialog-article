import {
	Injectable, Injector, ComponentFactory, ComponentFactoryResolver, ApplicationRef, TemplateRef, ComponentRef,
	ReflectiveInjector
} from '@angular/core';
import { RenderComponentType } from '@angular/core';

import { DialogRefModel } from '../models/dialog-ref.model';
import { DialogOptionsModel } from '../models/dialog-options.model';
import { DialogComponent } from '../dialog/dialog.component';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { DialogActiveModel } from '../models/dialog-active.model';
import { DialogContentRefModel } from '../models/dialog-content-ref.model';

@Injectable()
export class DialogService {

	private _defaultOptions: DialogOptionsModel = new DialogOptionsModel();

	private _backdropComponent: ComponentFactory<BackdropComponent>;
	private _dialogComponent: ComponentFactory<DialogComponent>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
		private applicationRef: ApplicationRef,
		private injector: Injector) {

		this._backdropComponent = componentFactoryResolver.resolveComponentFactory(BackdropComponent);
		this._dialogComponent = componentFactoryResolver.resolveComponentFactory(DialogComponent);
	}

	private _append(component: ComponentRef<any>,
			factory: ComponentFactory<any>,
			contentRef: DialogContentRefModel,
			injector?: Injector): ComponentRef<any> {

		component = factory.create(injector || this.injector, contentRef.nodes);
		this.applicationRef.attachView(component.hostView);
		document.querySelector('body').appendChild(component.location.nativeElement);
		return component;
	}

	open<T = any, R = any>(content: any, options: DialogOptionsModel<T> = null): DialogRefModel {
		options = {  ...this._defaultOptions, ...options, };


		const dialogActive = new DialogActiveModel();
		const contentRef = this.getContentRef(content, dialogActive, options);

		let dialogComponent: ComponentRef<DialogComponent>;
		let backdropComponent: ComponentRef<BackdropComponent>;

		if (options.backdrop) {
			backdropComponent = this._append(backdropComponent, this._backdropComponent, contentRef);
		}

		const injector = ReflectiveInjector.resolveAndCreate([{
			provide: DialogOptionsModel,
			useValue: options
		}], this.injector);
		dialogComponent = this._append(dialogComponent, this._dialogComponent, contentRef, injector);

		const dialogRef = new DialogRefModel(dialogComponent, backdropComponent, contentRef, options.beforeDismiss);

		dialogActive.close = (result: any) => dialogRef.close(result);
		dialogActive.dismiss = (reason: any) => dialogRef.dismiss(reason);

		return dialogRef;
	}

	private getContentRef(content: any, context: DialogActiveModel, options: DialogOptionsModel): DialogContentRefModel {
		if (!content) {
			return new DialogContentRefModel([]);
		} else if (content instanceof TemplateRef) {
			const viewRef = content.createEmbeddedView(context);
			this.applicationRef.attachView(viewRef);
			return new DialogContentRefModel([viewRef.rootNodes], viewRef);
		} else if (typeof content === 'string') {
			return new DialogContentRefModel([[document.createTextNode(`${content}`)]]);
		} else {
			const factory = this.componentFactoryResolver.resolveComponentFactory(content);
			const injector = ReflectiveInjector.resolveAndCreate([{
				provide: DialogActiveModel,
				useValue: context
			}, {
				provide: DialogOptionsModel,
				useValue: options
			}], this.injector);

			const componentRef = factory.create(injector);
			this.applicationRef.attachView(componentRef.hostView);
			return new DialogContentRefModel([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
		}
	}
}

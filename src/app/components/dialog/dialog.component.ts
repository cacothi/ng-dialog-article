import { Component, Output, EventEmitter, Input, ElementRef, Renderer2, OnInit, AfterViewInit, OnDestroy,
	HostListener, HostBinding } from '@angular/core';

import { DialogOptionsModel } from '../models/dialog-options.model';

@Component({
	selector: 'app-shared-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {

	@Output('dismiss') dismiss = new EventEmitter();

	@HostBinding('tabindex') tabindex = '-1';

	private el: any;
	private elFocused: Element;
	private style: any = {};

	constructor(private elementRef: ElementRef, private renderer: Renderer2, private options: DialogOptionsModel) {
		this.el = elementRef.nativeElement;
		this.style.marginTop = options.top;
	}


	@HostListener('keyup.esc', ['$event'])
	escKey($event: any): void {
		if (this.options.keyboard && !$event.defaultPrevented) {
			this.cancel();
		}
	}

	@HostListener('click', ['$event'])
	backdropClick($event: any): void {
		if (this.options.closeOutsideClick && this.el === $event.target) {
			this.cancel();
		}
	}



	cancel(): void {
		this.dismiss.emit();
	}

	ngOnInit() {
		this.elFocused = document.activeElement;
		this.renderer.addClass(document.body, 'modal-open');
	}

	ngAfterViewInit() {
		if (!this.el.contains(document.activeElement)) {
			this.el['focus'].apply(this.el, []);
		}
	}

	ngOnDestroy() {
		const body = document.body;
		const elWithFocus = this.elFocused;

		let elementToFocus;
		if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
			elementToFocus = elWithFocus;
		} else {
			elementToFocus = body;
		}
		elementToFocus['focus'].apply(elementToFocus, []);

		this.elFocused = null;
		this.renderer.removeClass(body, 'modal-open');
	}
}

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './dialog/dialog.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { DialogService } from './services/dialog.service';

const components = [
	DialogComponent,
	BackdropComponent
];
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		...components
	],
	entryComponents: [
		...components
	]
})
export class DialogModule {
	constructor( @Optional() @SkipSelf() parentModule: DialogModule) {
		if (parentModule)
			throw Error('This module is already loaded on AppModule!');
	}

	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: DialogModule,
			providers: [
				DialogService
			]
		}
	}
}

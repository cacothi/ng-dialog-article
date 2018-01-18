import { NgModule, SkipSelf, Optional,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from './components/dialog.module';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message/message.service';

@NgModule({
	imports: [
		CommonModule,
		DialogModule.forRoot()
	],
	declarations: [
		MessageComponent
	],
	entryComponents: [
		MessageComponent
	]
})
export class CoreModule {

	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw Error('Core Module is already loaded on AppModule!');
		}
	}

	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule,
			providers: [MessageService]
		};
	}

}

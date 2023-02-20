import {NgModule} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {TuiActionModule} from '@taiga-ui/kit';

@NgModule({
  imports: [
    TuiActionModule
  ],
  exports: [HeaderComponent],
  declarations: [
    HeaderComponent
  ],
})

export class UiKitModule {}

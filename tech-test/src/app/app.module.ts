import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UiKitModule} from './ui-kit/ui-kit.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiActionModule, TuiCheckboxModule, TuiInputModule, TuiTextAreaModule} from '@taiga-ui/kit';
import {TuiButtonModule} from '@taiga-ui/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TuiActionModule,
    UiKitModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiCheckboxModule,
    TuiButtonModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}

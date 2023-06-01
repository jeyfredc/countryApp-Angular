import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from './shared/shared.module'
import { AppComponent } from './app.component';
import { AppRountingModule } from './app-rounting.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRountingModule,
    BrowserModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

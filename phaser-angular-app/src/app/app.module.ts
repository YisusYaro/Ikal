import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { Scene } from './game/scene';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Scene],
  bootstrap: [AppComponent]
})
export class AppModule { }

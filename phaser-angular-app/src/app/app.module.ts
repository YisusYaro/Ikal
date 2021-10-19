import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Title } from './game/scenes/title';
import { Independency } from './game/scenes/independency';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [Title, Independency],
  bootstrap: [AppComponent]
})
export class AppModule { }

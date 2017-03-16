import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule , JsonpModule } from '@angular/http';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';

import { AppComponent } from './component/rootcomp';
import { TodoComponent } from './component/todo.component';
import { EksiMenuBarComponent} from './component/menubarcomp';
import { EksiLeftsideComponent} from './component/leftcomp';
import { EksiSharedService } from './service/eksi-shared.service';



@NgModule({
  declarations: [
    AppComponent,EksiMenuBarComponent,EksiLeftsideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [EksiSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

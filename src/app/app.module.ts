import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule , JsonpModule } from '@angular/http';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';

import { AppComponent } from './component/rootcomp';
import { EksiMenuBarComponent} from './component/menubarcomp';
import { TopicListComponent} from './component/topiclistcomp';
import { EksiLeftsideComponent} from './component/leftcomp';
import { EksiSharedService } from './service/eksi-shared.service';
import { EksiciService } from './service/eksici-http-service';

import { RouterModule, Routes } from '@angular/router';

import { ResponsiveModule , ResponsiveConfig } from 'ng2-responsive'

 let config = {
    breakPoints: {
        xs: {max: 600},
        sm: {min: 601, max: 959},
        md: {min: 960, max: 1279},
        lg: {min: 1280, max: 1919},
        xl: {min: 1920}
    },
    debounceTime: 100 // allow to debounce checking timer
  };
 
  export function ResponsiveDefinition(){ 
          return new ResponsiveConfig(config);
  };

const appRoutes: Routes = [
  { 
    path: 'topic/entries/:topicHref'          , 
    component: EksiLeftsideComponent ,
    data: {
      type:  'topic'
    }
  },
  { 
    path: ''          , 
    component: EksiLeftsideComponent ,
    data: {
      type:  'see'
    }
  },
  { 
    path: 'entry/:entryId'          , 
    component: EksiLeftsideComponent ,
    data: {
      type:  'entry'
    }
  },
  { 
    path: 'today'          , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/today',
      title: 'bugün',
      type:  'classic'
    }
  },
  { 
    path: 'deserted'          , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/deserted',
      title: 'başıboşlar',
      type:  'classic'
    }
  },
  { 
    path: 'videos'          , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/videos',
      title: 'videolar',
      type:  'classic'
    }
  },
  { path: 'popular'        , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/popular',
      title: 'gündem',
      type:  'classic'
    }
  },
  { path: 'todayinhistory/:year'        , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/todayinhistory/',
      title: 'tarihte bugün',
      type:  'history'
    }
  },
  { path: 'channels/:channelname/topics'        , 
    component: EksiLeftsideComponent ,
    data: {
      type:  'channel'
    }
  }
  ,{ path: '**', redirectTo: '/today', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,EksiMenuBarComponent,EksiLeftsideComponent, TopicListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    DropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ResponsiveModule
  ],
  providers: [
    EksiSharedService,
    EksiciService,
    {
     provide: ResponsiveConfig, 
     useFactory: ResponsiveDefinition 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

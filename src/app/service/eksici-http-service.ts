import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Channel }                 from '../model/channel';
import { TopicPager}               from '../model/topicpager';
import { Topic }                   from '../model/topic';
import { AutoComplete }            from '../model/autocomplete';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class EksiciService {
  private apiBaseUrl_local  = 'http://localhost:8080/v1/';  
  private apiBaseUrl_domain = 'http://www.ekcisi.com/api/v1/';  
  private apiBaseUrl_heroku = 'https://eksici-api.herokuapp.com/api/v1/';
  private apiBaseUrl_ip     = 'http://139.162.163.241:8080/api/v1/';

  private apiBaseUrl        = this.apiBaseUrl_ip;
  
  constructor (private http: Http) {}

  getChannels (): Observable<Channel[]> {
    console.log('get channels baslar');
    let resp: Observable<Channel[]> = this.http.get(this.apiBaseUrl + 'channels')
                   // .map(this.extractData)
                    .map((response: Response) => <Channel[]>response.json())
                    .catch(this.handleError);
    console.log('get channels biter:' + resp);
    return resp;
  }

  autocomplete (pQueryString: String): Observable<Topic[]> {
    console.log('get autocomplete baslar');
    let resp: Observable<Topic[]> = this.http.get(this.apiBaseUrl + 'autocomplete?query=' + pQueryString)
                    .map((response: Response) => response.json().topicList as Topic[])
                    .catch(this.handleError);
    console.log('get autocomplete biter:' + resp);
    return resp;
  }

  getTopics (pTopicType: String): Observable<TopicPager> {
    console.log('get topics baslar');
    let resp: Observable<TopicPager> = this.http.get(this.apiBaseUrl + pTopicType)
                    .map((response: Response) => <TopicPager>response.json())
                    .catch(this.handleError);
    console.log('get topics biter');
    return resp;
  }

  getTopicEntries (pHref: String): Observable<Topic> {
    console.log('get topic entries baslar');
    let resp: Observable<Topic> = this.http.get(this.apiBaseUrl + 'topics/entries?topicsHref=' + pHref)
                    .map((response: Response) => <Topic>response.json())
                    .catch(this.handleError);
    console.log('get topic entries biter');
    return resp;
  }

  getEntry (pEntryId: String): Observable<Topic> {
    console.log('get entry baslar');
    let resp: Observable<Topic> = this.http.get(this.apiBaseUrl + 'entry/' + pEntryId)
                    .map((response: Response) => <Topic>response.json())
                    .catch(this.handleError);
    console.log('get entry biter');
    return resp;
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data ;
  }
  private handleError (error: Response | any) {
    
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('HTTP Service : ' + errMsg);
    return Observable.throw(errMsg);
  }
}
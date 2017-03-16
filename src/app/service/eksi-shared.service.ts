import { Injectable } from '@angular/core';
import { SessionBean } from '../bean/sessionbean';
import { Subject }    from 'rxjs/Subject';
import { EksiciService } from '../service/eksici-http-service';
import { Topic } from '../model/topic';

@Injectable()
export class EksiSharedService {

  sessionbean: SessionBean = new SessionBean();

  constructor(
    private eksiciService: EksiciService,
  ) {
    console.log('shared service constructed..');
  }

  loadTopicsAsync(ptopicsType: String, pTopicsTypeDescription: String) {
    console.log('loading topics');
    this.eksiciService.getTopics(ptopicsType).subscribe(
      data => this.sessionbean.topicsCurrentPage = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed " + this.sessionbean.topicsCurrentPage.contentList + " topics loaded..");
        this.sessionbean.topicsTypeDescription = pTopicsTypeDescription;
      }

    );
  }

/**
 * 
 * http://www.eksici.com/api/v1/topics/entries?topicsHref=
 */
  loadTopicEntriesAsync(pTopic: Topic) {
    console.log('loading topic entries');
    this.eksiciService.getTopicEntries(pTopic).subscribe(
      data => this.sessionbean.currentTopic = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed " + this.sessionbean.currentTopic.type);
        console.log("the subscription is completed " + this.sessionbean.currentTopic.topicText);
      }

    );
  }
}
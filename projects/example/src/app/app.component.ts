import { Component } from '@angular/core';
import { IMonoOptions, IEventOptions } from 'ngx-mono'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'example';
  options:IMonoOptions = {
    key: 'test_pk_mLq0XRo0dQkcaxlhNf5c',
    // reauthToken: 'code_tPL0FVbsFuCqrBfMV4Vh'
    // scope: 'payments',
    // data: {
    //   type: 'one-time-debit', // recurring-debit or one-time-debit
    //   amount: 150000, //amount in kobo
    //   description: "payment for electricity"
    // }
  }

  onClose(){
    console.log('closed')
  }

  onLoad(){
    console.log('loaded');
  }

  onSuccess(data:IEventOptions){
    console.log('successsss:  ', data);
  }

  onEvent(data:IEventOptions){
    console.log(data);
  }
}

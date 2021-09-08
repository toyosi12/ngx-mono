import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IMonoOptions } from './IMonoOptions';
import { NgxMonoService } from './ngx-mono.service';

@Component({
  selector: 'ngx-mono',
  template: `
    <button 
      [ngClass]="class"
      [ngStyle]="style" 
      (click)="action()"><ng-content></ng-content></button>
  `,
  styles: [
  ]
})
export class NgxMonoComponent implements OnInit {
  @Input() options!: IMonoOptions;
  @Input() class!:string;
  @Input() style!:object;

  @Output() onLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _NgxMonoService: NgxMonoService) { }

  ngOnInit(): void {
    this._NgxMonoService.setup(this.options);
  }

  validateOptions(){
    if(!this.options.key){
      return 'NGX-MONO: Public key is required';
    }

    if(!this.onSuccess.observers.length){
      return 'NGX-MONO: onSuccess callback is required';
    }
    return;
  }

  /**
   * This function connects to the Mono URL and gets the environment ready
   */
  async initialize(reauthToken?:string){
    const encodedKeys = ['data'];
    let source = new URL('https://connect.withmono.com');
    source.searchParams.set('key', this.options.key);
    source.searchParams.set('referrer', window.location.href);
    source.searchParams.set('version', '2021-09-06');

    
    if(reauthToken){
      this.options = {...this.options, reauth_token: reauthToken}
    }

    Object.keys(this.options).map(param => {
      if(encodedKeys.includes(param)){
        const encodedValue = encodeURIComponent(JSON.stringify(this.options[param]));
        return source.searchParams.set(param, encodedValue);
      }
      source.searchParams.set(param, this.options[param]);
    })

    let container = window.document.createElement('div');
    container.setAttribute('id', 'mono-connect--widget-div');
    container.setAttribute('style', this._NgxMonoService.containerStyle);
    window.document.body.insertBefore(container, window.document.body.childNodes[0]);

    let iframe = window.document.createElement('iframe');
    iframe.setAttribute('src', `${source.href}`);
    iframe.setAttribute('style', this._NgxMonoService.iframeStyle);
    iframe.setAttribute('id', 'mono-connect--frame-id')
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('title', 'Mono connect')
    iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups');

    let self = this;
    
    iframe.onload = function() {
    let loader = <HTMLIFrameElement>window.document.getElementById('mono-connect-app-loader');
      if(iframe.style.visibility === 'visible') {
        loader.style.display = 'none'
      }
      self.onLoad.emit()

      let event:any  = new Event('message');

      let eventData = {
        type: 'mono.connect.widget_loaded',
        data: { timestamp: Date.now() }
      };

      event['data'] = Object.assign({}, eventData);
      window.dispatchEvent(event);

      self.onEvent.emit({event: 'LOADED', data: event.data.data});
    }


    let loader = this._NgxMonoService.createLoader();
    container.appendChild(loader);
    container.appendChild(iframe);


  }

  
  /**
   * This function handles the various dispatch events
   */
  handleEvents = (event:any) =>{
    switch(event.data.type) {

      case 'mono.connect.widget.account_linked':
        this.onSuccess.emit({...event.data.data});
        this.onEvent.emit({event: 'SUCCESS', data: event.data.data});
        this.close();
        break;
      case 'mono.connect.widget.closed':
        this.close();
        break;



      case 'mono.connect.widget_opened':
        this.onEvent.emit({event: 'OPENED', data: event.data.data});
        break;
      case 'mono.connect.error_occured':
        this.onEvent.emit({event: 'ERROR', data: event.data.data});
        break;
      case 'mono.connect.institution_selected':
        this.onEvent.emit({event: 'INSTITUTION_SELECTED', data: event.data.data});
        break;
      case 'mono.connect.auth_method_switched':
        this.onEvent.emit({event: 'AUTH_METHOD_SWITCHED', data: event.data.data});
        break;
      case 'mono.connect.on_exit':
        this.onEvent.emit({event: 'EXIT', data: event.data.data});
        break;
      case 'mono.connect.login_attempt':
        this.onEvent.emit({event: 'SUBMIT_CREDENTIALS', data: event.data.data});
        break;
      case 'mono.connect.mfa_submitted':
        this.onEvent.emit({event: 'SUBMIT_MFA', data: event.data.data});
        break;
      case 'mono.connect.account_linked':
        this.onEvent.emit({event: 'ACCOUNT_LINKED', data: event.data.data});
        break;
      case 'mono.connect.account_selected':
        this.onEvent.emit({event: 'ACCOUNT_SELECTED', data: event.data.data});
        break;
    }
  }

  /**
   * This function opens the widget
   */
  open(){
    this._NgxMonoService.openWidget();
    window.addEventListener('message', this.handleEvents ,false);
  }

  /**
   * This function closes the widget
   */
  close(){
    window.removeEventListener('message', this.handleEvents, false);
    this._NgxMonoService.closeWidget();
    this.onClose.emit();
  }

  /**
   * 
   * This function decides whether to make a connect, reauthorization
   * or direct debit call
   */
  async action(){
    let errorMessage = this.validateOptions();
    if(errorMessage){
      console.error(errorMessage);
      return;
    }

    if(this.options.reauthToken){
      this.reauthorize(this.options.reauthToken);
      return;
    }

    this._NgxMonoService.loadStyles();
    await this.initialize();
    this.open();
  }

  async reauthorize(reauthToken: string){
    if(!reauthToken) throw new Error('Re-auth token is required');

    this._NgxMonoService.loadStyles();
    await this.initialize(reauthToken);
    this.open();
  }



}

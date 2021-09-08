import { Injectable } from '@angular/core';
import { IMonoOptions } from './IMonoOptions';

interface _Window extends Window{

}


declare var window: _Window;



@Injectable({
  providedIn: 'root'
})
export class NgxMonoService {

  constructor() { }



  public loaderStyles = `.app-loader {
    text-align: center;
    color: white;
    margin-right: -30px;
    width: 100%;
    position: fixed;
  }
  
  @-webkit-keyframes app-loader__spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  
  .app-loader__spinner {
    position: relative;
    display: inline-block;
    width: fit-content;
  }
  
  .app-loader__spinner div {
    position: absolute;
    -webkit-animation: app-loader__spinner linear 1s infinite;
    animation: app-loader__spinner linear 1s infinite;
    background: white;
    width: 10px;
    height: 30px;
    border-radius: 40%;
    -webkit-transform-origin: 5px 65px;
    transform-origin: 5px 65px;
  }
  
  .app-loader__spinner div:nth-child(1) {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-animation-delay: -0.916666666666667s;
    animation-delay: -0.916666666666667s;
  }
  
  .app-loader__spinner div:nth-child(2) {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-animation-delay: -0.833333333333333s;
    animation-delay: -0.833333333333333s;
  }
  
  .app-loader__spinner div:nth-child(3) {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
    -webkit-animation-delay: -0.75s;
    animation-delay: -0.75s;
  }
  
  .app-loader__spinner div:nth-child(4) {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: -0.666666666666667s;
    animation-delay: -0.666666666666667s;
  }
  
  .app-loader__spinner div:nth-child(5) {
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
    -webkit-animation-delay: -0.583333333333333s;
    animation-delay: -0.583333333333333s;
  }
  
  .app-loader__spinner div:nth-child(6) {
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg);
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  
  .app-loader__spinner div:nth-child(7) {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: -0.416666666666667s;
    animation-delay: -0.416666666666667s;
  }
  
  .app-loader__spinner div:nth-child(8) {
    -webkit-transform: rotate(210deg);
    transform: rotate(210deg);
    -webkit-animation-delay: -0.333333333333333s;
    animation-delay: -0.333333333333333s;
  }
  
  .app-loader__spinner div:nth-child(9) {
    -webkit-transform: rotate(240deg);
    transform: rotate(240deg);
    -webkit-animation-delay: -0.25s;
    animation-delay: -0.25s;
  }
  
  .app-loader__spinner div:nth-child(10) {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: -0.166666666666667s;
    animation-delay: -0.166666666666667s;
  }
  
  .app-loader__spinner div:nth-child(11) {
    -webkit-transform: rotate(300deg);
    transform: rotate(300deg);
    -webkit-animation-delay: -0.083333333333333s;
    animation-delay: -0.083333333333333s;
  }
  
  .app-loader__spinner div:nth-child(12) {
    -webkit-transform: rotate(330deg);
    transform: rotate(330deg);
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  
  .app-loader__spinner {
    -webkit-transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);
    transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);
  }
  `;

  public containerStyle = 'position:fixed;overflow: hidden;display: none;justify-content: center;align-items: center;z-index: 999999999;height: 100%;width: 100%;color: transparent;background: rgba(0, 0, 0, 0.6);visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;';
  public iframeStyle = 'position: fixed;display: none;overflow: hidden;z-index: 999999999;width: 100%;height: 100%;transition: opacity 0.3s ease 0s;visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;';

  public key!:string;

  public options!:IMonoOptions;

  setup(options:IMonoOptions){
    this.options = options;
    this.key = options.key
  }



  loadStyles(){
    let styles = window.document.createElement('style');
    styles.innerText = this.loaderStyles;
    window.document.head.appendChild(styles);
  }

  createLoader(){
    let loaderDiv = window.document.createElement('div');
    let childDiv = window.document.createElement('div');
    loaderDiv.setAttribute('id', 'mono-connect-app-loader')
    loaderDiv.classList.add('app-loader');
    childDiv.classList.add('app-loader__spinner');

    for(let i =0; i < 12; i++){
      let div = document.createElement('div');
      childDiv.appendChild(div);
    }
    loaderDiv.appendChild(childDiv);
    return loaderDiv;
  }




  openWidget(){
    let container = <HTMLDivElement>window.document.getElementById('mono-connect--widget-div');
    let loader = <HTMLDivElement>window.document.getElementById('mono-connect-app-loader');
    let frame = <HTMLIFrameElement>window.document.getElementById('mono-connect--frame-id');
    container.style.visibility = 'visible';
    container.style.display = 'flex';
    loader.style.display = 'block';


    setTimeout(() => {
      this.makeIframeVisible();
      frame.focus({preventScroll: false});
      container.focus({preventScroll: false});

      let event:any = new Event('message');
      let eventData = {
        type: 'mono.connect.widget_opened',
        data: { timestamp: Date.now() }
      }

      event['data'] = Object.assign({}, eventData);
      window.dispatchEvent(event);

    }, 2000);
  }

  closeWidget(){
      this.makeIframeInvisible();
  }

  makeIframeVisible(){
    let container = <HTMLDivElement>window.document.getElementById('mono-connect--widget-div');
    let frame = <HTMLIFrameElement>window.document.getElementById('mono-connect--frame-id');

    container.style.display = 'flex';
    frame.style.display = 'block';
    container.style.visibility = 'visible';
    frame.style.visibility = 'visible';
  }

  makeIframeInvisible(){
    let container = <HTMLDivElement>document.getElementById('mono-connect--widget-div');
    let frame = <HTMLIFrameElement>document.getElementById('mono-connect--frame-id');
    container.style.display = 'none';
    frame.style.display = 'none';
    container.style.visibility = 'hidden';
    frame.style.visibility = 'hidden';
  }





}

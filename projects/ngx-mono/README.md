# NGX-MONO
> ngx-mono is an angular library to securely and quickly link bank accounts to Mono from within your app. It is built around Mono Connect.js. 
Mono Connect is a drop-in framework that handles connecting a financial institution to your app.

Visit [Mono Docs](https://docs.mono.co/docs/intro-to-mono-connect-widget) for the detailed documentation.

### REQUIREMENTS
Node 10 or higher

### INSTALLATION
To install the latest version of ngx-mono, simply run the command
```bash
npm install --save ngx-mono
```

### USAGE
##### 1. Import the module
Import the library in your module:
```ts
import { NgxMonoModule } from 'ngx-mono'
```

##### 2. Implement in your project
```html
<ngx-mono
    [options]="options"
    (onSuccess)="onSuccess($event)"
>Connect</ngx-mono>
```
```ts
import { IMonoOptions } from 'ngx-mono'

  options:IMonoOptions = {
    key: <public_key>,
    data: {
      type: 'one-time-debit', // recurring-debit or one-time-debit
      amount: 150000, //amount in kobo
      description: "payment for light bill"
    }
  }

  onSuccess(data:any){
    console.log('successsss:  ', data);
  }
```

## OPTIONS
| S/N | Option           | Data Type | Required | Description                                                                                                       |   |
|-----|------------------|-----------|----------|-------------------------------------------------------------------------------------------------------------------|---|
| 1   | key              | string    | yes      | The public key of your app. It can be gotten from the Mono dashboard.                                             |   |
| 2   | reauthToken      | string    | no       | This is only applicable to token re-authentication. Once this is present, a token re-authentication is initiated. |   |
| 3   | scope            | string    | no       | This should be set to ‘payments’ when integrating to Direct Debit                                                 |   |
| 4   | data.type        | string    | no       | Used when integrating to Direct Debit. Possible values are ‘one-time-debit’ and ‘recurring-debit’.                |   |
| 5   | data.amount      | integer   | no       | Amount to be debited in kobo.                                                                                     |   |
| 6   | data.description | string    | no       | Details of what payment is being made for.                                                                        |   |

## CALLBACKS
|   | Callback     | Required | Description                                                                                                                                                                                                         |
|---|-----------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | onSuccess | yes      | Called after the successful onboarding of an account. It should take a single String argument containing the token that can be exchanged for an account id.                                                         |
| 2 | onLoad    | no       | Called when the widget has been mounted unto the DOM.                                                                                                                                                               |
| 3 | onClose   | no       | Called when a user has specifically exited the Mono Connect flow (i.e. the widget is not visible to the user). It does not take any arguments.                                                                      |
| 4 | onEvent   | no       | Called when certain events in the Mono Connect flow have occurred, for example, when the user selected an institution. This enables your application to gain further insight into the Mono Connect onboarding flow. |

## Events
Below are the possible events that can be raised by the onEvent callback:
|      Event Name      |                                              Description                                              |
|:--------------------:|:-----------------------------------------------------------------------------------------------------:|
| OPENED               | Triggered when the user opens the Connect Widget.                                                     |
| EXIT                 | Triggered when the user closes the Connect Widget.                                                    |
| INSTITUTION_SELECTED | Triggered when the user selects an institution.                                                       |
| AUTH_METHOD_SWITCHED | Triggered when the user changes authentication method from internet to mobile banking, or vice versa. |
| SUBMIT_CREDENTIALS   | Triggered when the user presses Log in.                                                               |
| ACCOUNT_LINKED       | Triggered when the user successfully links their account.                                             |
| ACCOUNT_SELECTED     | Triggered when the user selects a new account.                                                        |
| ERROR                | Triggered when the widget reports an error.                                                           |

## SAMPLE SNIPPETS
#### 1. Link Account
This is to link a user's account
```html
<ngx-mono
    [options]="options"
    (onSuccess)="onSuccess($event)"
>Connect</ngx-mono>
```

```ts
import { IMonoOptions, IEventOptions } from 'ngx-mono';
 options:IMonoOptions = {
   key: '<public_key>',
 }
onSuccess(data:IEventOptions){
    console.log(data);
}
```

#### 2. Reauthorization
```html
<ngx-mono
    [options]="options"
    (onSuccess)="onSuccess($event)"
>Re-authorize</ngx-mono>
```

```ts
options:IMonoOptions = {
key: '<public_key>',
reauthToken: 'code_tPL0FVbsFuCqrBfMV4Vh'
}
onSuccess(data:IEventOptions){
    console.log(data);
}
```

#### 3. Direct Debit
```html
<ngx-mono
    [options]="options"
    (onSuccess)="onSuccess($event)"
>Direct debit</ngx-mono>
```
```ts
  options:IMonoOptions = {
    key: '<public_key>',
    scope: 'payments',
    data: {
       type: 'one-time-debit', // recurring-debit or one-time-debit
       amount: 150000, //amount in kobo
       description: "payment for electricity"
     }
  }
```
### CONTRIBUTING
Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.

### Star
 I'd love you star this repo. Also [follow me on twitter](https://twitter.com/dev_toyosi)
 
### License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

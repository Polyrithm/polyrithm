# click-prevent

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test click-prevent` to execute the unit tests.
# click-prevent

A click event with stopPropagation;

# Install

```bash

$ npm install @polyrithm/click-prevent --save

```

or

```bash
yarn add @polyrithm/click-prevent
```

## Usage

```ts

// app.module or any module

import {ClickPreventModule} from '@polyrithm/click-prevent';

@NgModule({
  ...
  imports: [ClickPreventModule]
  ...
})

class MyModule {

}

// Example Component

<button class="btn" (click.prevent)="onClick($event, data)">
   Click me
</button>

```

# React Universal Dialog

Makes it easy to create dialogs with React components that have content which you don't have full knowledge of beforehand.

- Dialog is always centered, no matter the width/height, and responds to size changes at any moment
- Content is is always pixel-perfect aligned to prevent blurry subpixel rendering
- Can open multiple dialogs at once

Tested on a wide range of browsers:

- Chrome - latest stable
- Firefox - latest stable
- iOS Safari - latest stable
- IE - 9/10/11
- ~~Edge - latest stable~~ (*Not yet, but IE works, so should be safe*)

Actual support is even wider, but no testing is done. Feel free to send bug reports.

# Usage

```javascript
import rud = require("react-universal-dialog");

let dialog = new rud.Dialog(<div>Hello, World!</div>);
dialog.open();
```

# API

### let d = new Dialog(reactElement, options)

- **reactElement** - Anything that can be passed to ReactDOM.render(). Can be a simple JSX `<p>Hello</p>`, can be your custom React component `<MyComponent />`, can be the result of `React.createElement()`.
- **options** - Object (see defaults below) - **store**: Redux store, **destroyOnClose**: destroys dialog upon first close, **showClose**: show a MDL close button, **onOpen**: event handler for open, **onClose**: event handler for close

**Note:** The provided **reactElement** will be cloned with `React.cloneElement()` and a new `_dialog` property will be set to the same pointer that gets returned by `new Dialog()`. This allows you to easily operate on the dialog from inside the React class, e.g. to close the dialog due to some event.

**Note:** When the `store` option is set to a Redux store, then whatever you pass as `reactElement` will get surrounded with react-redux's `<Provider store={store} />` component.

### Dialog.defaults = {store: undefined, destroyOnClose: true, showClose: true, onOpen: undefined, onClose: undefined}

The default options object. Feel free to modify its properties to change the default behavior. This can be especially convenient with Redux, as you can specifcy `store` only once and no need to have a reference to it when actually creating dialogs.

### d.options - Object

The instance options object. Read-only.

### d.isOpen - number

0 - Closed, 1 - Modal

### d.ref - any

Reference returned by ReactDOM.render().

### d.destroy()

Does a proper cleanup of the instance.

### d.open(modal = true)

Open the dialog.

### d.close()

Close the dialog.

**Note:** Depending on the destroyOnClose option (true by default), the `close()` method will also immediately call the `destroy()` method.

# Requirements

- React (including ReactDOM)
- Redux & react-redux - only if the `store` option is used
- The current close button depends on [MDL](https://getmdl.io/) being present on the page.

# About

© Copyright 2016 [OÜ Nevermore](https://www.nevermore.ee)

Licensed under the [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0)
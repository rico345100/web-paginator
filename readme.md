# web-paginator
Super easy to use paginator for common websites.

## Installation
Install via npm.
> $ npm install --save web-paginator


## Usage
You have to use Browserify or Webpack for load this module.

```javascript
import Paginator from 'web-paginator';
// or
var Paginator = require('web-paginator');
```

And you should also load style too. If you are using Browserify, you need to add addtional browserify plugin such as browserify-css.

```javascript
import 'web-paginator/style.css';
```


## Example

```html
<html>
<head>
	<meta charset="UTF-8">
	<title>web-paginator test</title>
</head>
<body>
	<div id="target"></div>
	<script src="./bundle.js"></script>
</body>
</html>
```

```javascript
import Paginator from 'web-paginator';
import 'web-paginator/style.css';

let paginator = new Paginator({
	totalPages: 17
});
paginator.appendTo('#target');
paginator.on('pageclicked', (page) => {
	console.log('Page:' + page);
	paginator.setCurrentPage(page);
});
paginator.render();
```

Result:

![web-paginator](http://photon.modernator.me:/album/rico345100@gmail.com/blog/web-paginator/web-paginator.png)


## API
### constructor Paginator(options)
Create new paginator object. options are:
- number currentPage: Number of initial page.
- number totalPages: Number of total pages.

Note that you can access internal paginator element directly with Paginator.el:

```javascript
let paginator = new Paginator();
let paginatorEl = paginator.el;

paginatorEl.fadeIn(300);
```

It using jQuery inside, so you can every jQuery method you want.

### Paginator.show()
Set paginator visible.

### Paginator.hide()
Set paginator invisible. 

### Paginator.appendTo(string querySelector)
Append paginator element to specified element.

### Paginator.on(string eventName, function handler)
Add event handler. Currently availables are:
- pageclicked: Fires when clicked page.

### Paginator.emit(string name, ...args)
Fires event. You can attach custom events and fire it manually.

### Paginator.setCurrentPage(number newPage)
Set current page to new page and re-render component.

### Paginator.setTotalPages(number newTotalPages)
Set new total pages and re-render.

### Paginator.render()
Render the component. Basically, paginator object that just creates doesn't have childrens, so you have to call this manually.
This method also will executed automatically when using setCurrentPage and setTotalPages.

### Paginator.reset()
Remove childrens.

### Paginator.destroy()
Destroy paginator. Remove whole childrens, so paginator will just empty. Also remove all event listeners.


## Optimizations
When you calling setCurrentPage and setTotalPages, component will re-render entirely.
If you don't want to do that, you can just update paginator.currentPage and paginator.totalPages directly.
Changed values will not affected on the component unless you call render method.

```javascript
let paginator = new Paginator({ totalPages: 17 });
paginator.totalPages = 25;    // don't update yet.

... do something stuffs ...

paginator.render();				// time to update.

``` 



## License
MIT. Free to use.
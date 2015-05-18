# script-onload  [![CI][ci-badge]][ci-link]

Invoke a function when a given `<script>` loads.

## Installation

```bash
$ component install segmentio/script-onload
```

## API

#### onLoad(element, callback)

When the given `element` loads, invoke `callback` with `error, element`.

```js
var onLoad = require('script-onload');
var element = document.createElement('script');
element.src = '/my-script.js';
onLoad(element, function(error, element) {
  // ...
});
```

## License

MIT

[ci-link]: https://circleci.com/gh/segmentio/script-onload
[ci-badge]: https://circleci.com/gh/segmentio/script-onload.svg?style=svg

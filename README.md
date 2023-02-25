## about

Parametric solutions for common polar equations worth drawing with, [superformula](https://en.wikipedia.org/wiki/Superformula) included.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `geometrics` -->
<script src="https://thewhodidthis.github.io/geometrics/geometrics.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/geometrics": "https://thewhodidthis.github.io/geometrics/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install thewhodidthis/geometrics
```

## usage

Expect pure functions as named exports returning arrays of points represented as `{ x, y }` object literals. For example,

```js
import { poly } from "@thewhodidthis/geometrics"

const canvas = document.createElement("canvas")
const target = canvas.getContext("2d")
const center = { x: canvas.width * 0.5, y: canvas.height * 0.5 }

// Draw an evil pentagram.
const points = poly(center.y, 5)

target.translate(center.x + 0.5, center.y + 0.5)
target.rotate(Math.PI * 0.5)
target.beginPath()

points.forEach((p, i) => {
  const s = (i + 3) % points.length
  const n = points[s]

  target.moveTo(p.x, p.y)
  target.lineTo(n.x, n.y)
})

target.stroke()

document.body.appendChild(canvas)
```

Degree to radian and polar to cartesian converters are also available:

```js
import * as math from "@thewhodidthis/geometrics/helper"

console.assert(math.deg(math.TAU), 360)
console.assert(math.rad(180), Math.PI)
```

## see also

- [@thewhodidthis/arithmetics](https://github.com/thewhodidthis/arithmetics/)

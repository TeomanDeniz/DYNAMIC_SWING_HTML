# Dynamic Swing Cursor

A JavaScript module for creating custom animated HTML cursors with optional swing physics based on mouse movement.

## Features

* Fully customizable image-based cursors.
* Supports multiple cursor styles via CSS `cursor` values.
* Optional swing animation simulating cursor inertia.
* Works with existing HTML/DOM elements.
* Easy integration with just one function call.

## Usage

1. Include files

```html
<LINK REL="STYLESHEET" HREF="DYNAMIC_CURSOR.css"/>
<SCRIPT SRC="DYNAMIC_CURSOR.js"></SCRIPT>
```

2. Initialize with cursor definitions

```js
DYNAMIC_CURSOR.RUN(
	{
		"default": {
			SRC: "cursor_default.png", // image path/url
			X: 2,                    // pivot X
			Y: 3,                    // pivot Y
			W: 20,                   // width (px)
			H: 30,                   // height (px)
			SWING: true              // enable swing physics
		},
		"pointer": {
			SRC: "cursor_pointer.png",
			X: 5,
			Y: 5,
			W: 24,
			H: 24,
			SWING: false
		}
	}
);
```

3. Assign cursor style in CSS

```css
.my-button
{
	cursor: pointer;
}
```

4. Optional: Element-specific overrides

Use element's own CSS cursor attributes:

```css
.custom-element
{
	cursor: url("custom_cursor.png");
	transform-origin: 8px 8px;
}
```

5. Optional: Element-specific overrides

Set turn on and off swinging from element CSS via using `--swing`:

```css
.custom-element
{
	cursor: url("custom_cursor.png");
	transform-origin: 8px 8px;
	--swing: false;
}
```

## Notes

* Swing behavior simulates torque based on movement delta and pivot offset.
* Cursor visibility fades in/out on mouse enter/leave.
* Only one global dynamic cursor element is created and reused.

# Input Tester

This examples serves as a quick way to test game inputs,
both keyboard ones and gamepads. The latter are especially important
here, since the key mapping varies between game controllers,
therefore it is good to have a simple app which allows to check
whether the keys of the gamepad you own are mapped as expected or not.

The dashed line at the edge of the canvas indicates which game input type
(a keyboard or a gamepad) was detected the last. The way it could be 
leveraged in a real game would be to show either keyboard or gamepad
controls to the player depending on what do they use to play the game.

When in debug mode (entered with a semicolon on the keyboard),
the alternative screen appears. What it presents are detected gamepad
buttons. First, two rows of regular buttons (with a colored square
indicating the full press was detected and a cross/plus indicated 
a half-press). Next, 7 axis of precise "buttons" like D-pad or 
triggers.

There is also an indication of a detected gamepad type,
as well as a detected web browser (and whether it's Windows or not,
when it comes to Firefox). Those are dictated by differences between
gamepad mappings I experienced so far.

## Quick Start

```
npm install
npm start
```

## Commands

### `npm start`

Runs the project in dev mode, serves it, and opens it in a web browser.
The watch mode is enabled, meaning any change to the source code or assets
will make the webpage reload.

### `npm run build`

Creates a production build of the project.

### `npm run prod`

Creates a production build of the project, serves it, and opens
it in a web browser.

### `npm run zip`

Creates a production build fo the project, then creates a zip
archive out of its files. Such package is ready to be used e.g. on https://itch.io .


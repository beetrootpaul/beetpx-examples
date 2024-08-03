import {$} from "@beetpx/beetpx";
import {DebugView} from "./DebugView";
import {StandardView} from "./StandardView";

let standardView: StandardView | null = null;
let debugView: DebugView | null = null;
let showDebug: boolean = false;

let prevDebugToggleState: boolean = false;
let nextDebugToggleState: boolean = false;

$.setOnStarted(() => {
    standardView = new StandardView();
    debugView = new DebugView();
    showDebug = $.debug;

    prevDebugToggleState = false;
    nextDebugToggleState = false;

    $.startPlaybackLooped("music_base.flac")
});

$.setOnUpdate(() => {
    if (showDebug) {
        debugView?.update();
    } else {
        standardView?.update();
    }

    // This whole work with detecting debug toggle button release is here only
    //   because we want to see debug toggle button pressed in standard view
    //   before (on the button release) the view switches to the debug one.
    // If not for that, we could just use `$.debug` as a condition for
    //   which view to update/draw.
    prevDebugToggleState = nextDebugToggleState;
    nextDebugToggleState =
        $.getEventsCapturedInLastUpdate().has("debug_toggle");
    if (prevDebugToggleState && !nextDebugToggleState) {
        showDebug = !showDebug;
    }
});

$.setOnDraw(() => {
    if (showDebug) {
        debugView?.draw();
    } else {
        standardView?.draw();
    }
});

$.start({
    gameId: "@beetpx/example-input-tester",
    canvasSize: "128x128",
    fixedTimestep: "60fps",
    screenshots: {available: true},
    debugMode: {available: true},
    frameByFrame: {available: true},
    assets: [
        "music_base.flac",
        "spritesheet.png",
    ],
});

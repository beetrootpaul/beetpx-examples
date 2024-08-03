import {$, $d, $rgb, $u, $v, BpxCanvasSnapshotColorMapping, BpxRgbColor,} from "@beetpx/beetpx";
import {Fire} from "./Fire";
import {Room} from "./Room";

let room: Room;
let fire1: Fire;
let fire2: Fire;

let lightRadius = 0;

const colorMapperLighten = (color: BpxRgbColor | null): BpxRgbColor | null =>
    color
        ? $rgb((50 + color.r) * 1.25, (30 + color.g) * 1.2, (10 + color.b) * 1.05)
        : null;

const colorMapperReachableOnly = (
    color: BpxRgbColor | null,
    x: number,
    y: number,
): BpxRgbColor | null => (room.isReachableByLight(x, y) ? color : null);

$.setOnStarted(() => {
    room = new Room();
    fire1 = new Fire();
    fire2 = new Fire();
    fire1.setPosition($v(32));
    fire2.setPosition($v(64));
});

$.setOnUpdate(() => {
    fire1.setPosition(fire1.position.add($.getPressedDirection()).clamp($v(12), $v(116)));
    lightRadius = 30 + $u.trigCos($.frameNumber / 40);
});

$.setOnDraw(() => {
    room.draw();

    $d.takeCanvasSnapshot();
    drawLightAround(fire1);
    drawLightAround(fire2);

    fire1.draw();
    fire2.draw();
});

function drawLightAround(fire: Fire): void {
    $d.ellipseFilled(
        fire.position.sub(lightRadius),
        $v(lightRadius * 2),
        BpxCanvasSnapshotColorMapping.of(
            (color, x, y) => colorMapperLighten(colorMapperReachableOnly(color, x, y)),
        ),
    );
}

$.start({
    gameId: "@beetpx/example-canvas-snapshot",
    canvasSize: "128x128",
    fixedTimestep: "60fps",
    assets: ["tiles.png", "fire.png"],
    screenshots: {available: true},
    debugMode: {available: true},
});
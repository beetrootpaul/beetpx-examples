import {$x, $d, $rgb, $spr, $u, $v, $v_0_0, BpxGamepadType, BpxGamepadTypeDetector,} from "@beetpx/beetpx";

const orange = $rgb("#ffa300");
const blue = $rgb("#29adff");
const lime = $rgb("#00e436");
const pink = $rgb("#ff77a8");

export class DebugView {
    private readonly gamepadsN = 3;

    private readonly gamepadTypes: (null | BpxGamepadType)[] = $u
        .range(this.gamepadsN)
        .map(() => null);

    private readonly buttonsN = 20;
    private readonly buttons: (null | "touched" | "pressed")[][] = $u
        .range(this.buttonsN)
        .map(() => $u.range(this.gamepadsN).map(() => null));

    private readonly axesN = 7;
    private readonly axes: (null | number)[][] = $u
        .range(this.axesN)
        .map(() => $u.range(this.gamepadsN).map(() => null));

    constructor() {
        document.addEventListener("keydown", (keyboardEvent: KeyboardEvent) => {
            console.table({
                table: "KEYBOARD EVENT",
                type: "keydown",
                code: keyboardEvent.code,
                ctrlKey: keyboardEvent.ctrlKey,
                isComposing: keyboardEvent.isComposing,
                key: keyboardEvent.key,
                location: keyboardEvent.location,
                metaKey: keyboardEvent.metaKey,
                repeat: keyboardEvent.repeat,
                shiftKey: keyboardEvent.shiftKey,
            });
        });
        document.addEventListener("keyup", (keyboardEvent: KeyboardEvent) => {
            console.table({
                table: "KEYBOARD EVENT",
                type: "keyup",
                code: keyboardEvent.code,
                ctrlKey: keyboardEvent.ctrlKey,
                isComposing: keyboardEvent.isComposing,
                key: keyboardEvent.key,
                location: keyboardEvent.location,
                metaKey: keyboardEvent.metaKey,
                repeat: keyboardEvent.repeat,
                shiftKey: keyboardEvent.shiftKey,
            });
        });

        window.addEventListener("gamepadconnected", (gamepadEvent) => {
            if (gamepadEvent.gamepad.index < this.gamepadsN) {
                this.gamepadTypes[gamepadEvent.gamepad.index] =
                    BpxGamepadTypeDetector.detect(gamepadEvent.gamepad);
            }
            console.table({
                table: "GAMEPAD EVENT",
                type: "gamepadconnected",
                id: gamepadEvent.gamepad.id,
                index: gamepadEvent.gamepad.index,
                connected: gamepadEvent.gamepad.connected,
                "#axes": gamepadEvent.gamepad.axes.length,
                "#buttons": gamepadEvent.gamepad.buttons.length,
                timestamp: gamepadEvent.gamepad.timestamp,
            });
        });
        window.addEventListener("gamepaddisconnected", (gamepadEvent) => {
            if (gamepadEvent.gamepad.index < this.gamepadsN) {
                this.gamepadTypes[gamepadEvent.gamepad.index] = null;
            }
            console.table({
                table: "GAMEPAD EVENT",
                type: "gamepaddisconnected",
                id: gamepadEvent.gamepad.id,
                index: gamepadEvent.gamepad.index,
                connected: gamepadEvent.gamepad.connected,
                "#axes": gamepadEvent.gamepad.axes.length,
                "#buttons": gamepadEvent.gamepad.buttons.length,
                timestamp: gamepadEvent.gamepad.timestamp,
            });
        });
    }

    update(): void {
        navigator.getGamepads().forEach((gamepad) => {
            if (gamepad && gamepad.index < this.gamepadsN) {
                $u.range(this.buttonsN).forEach((i) => {
                    this.buttons[i]![gamepad.index] = gamepad.buttons[i]?.pressed
                        ? "pressed"
                        : gamepad.buttons[i]?.touched
                            ? "touched"
                            : null;
                });
                $u.range(this.axesN).forEach((i) => {
                    this.axes[i]![gamepad.index] = gamepad.axes[i] ?? null;
                });
            }
        });
    }

    draw() {
        // background
        $d.sprite($spr("spritesheet.png")(128, 128, 160, 0), $v_0_0);

        // buttons
        this.buttons.forEach((buttonXGamepads, buttonIndex) => {
            buttonXGamepads.forEach((button, gamepadIndex) => {
                if (button === "pressed") {
                    $d.rectFilled(
                        $v(
                            17 + (buttonIndex % 10) * 10,
                            12 + Math.floor(buttonIndex / 10) * 20 + gamepadIndex * 3,
                        ),
                        $v(3, 3),
                        gamepadIndex === 0 ? orange : gamepadIndex === 1 ? blue : lime,
                    );
                } else if (button === "touched") {
                    $d.ellipseFilled(
                        $v(
                            17 + (buttonIndex % 10) * 10,
                            12 + Math.floor(buttonIndex / 10) * 20 + gamepadIndex * 3,
                        ),
                        $v(3, 3),
                        gamepadIndex === 0 ? orange : gamepadIndex === 1 ? blue : lime,
                    );
                }
            });
        });

        // axes
        this.axes.forEach((axisXGamepad, axisIndex) => {
            axisXGamepad.forEach((axis, gamepadIndex) => {
                if (axis != null) {
                    const offset = 20 * axis;
                    $d.rectFilled(
                        $v(48 + offset, 51 + axisIndex * 11 + gamepadIndex * 3),
                        $v(3, 3),
                        gamepadIndex === 0 ? orange : gamepadIndex === 1 ? blue : lime,
                    );
                }
            });
        });

        // gamepad types
        $u.range(this.gamepadsN).forEach((gamepadIndex) => {
            const gamepadType = this.gamepadTypes[gamepadIndex];
            if (gamepadType) {
                $d.rectFilled(
                    $v(
                        91 +
                        (gamepadType === "xbox"
                            ? 0
                            : gamepadType === "dualsense"
                                ? 10
                                : gamepadType === "8bitdo"
                                    ? 20
                                    : 30),
                        60 + gamepadIndex * 3,
                    ),
                    $v(3, 3),
                    gamepadIndex === 0 ? orange : gamepadIndex === 1 ? blue : lime,
                );
            }
        });

        // browser type
        $d.rectFilled(
            $v(
                116,
                80 +
                ($x.detectedBrowserType === "chromium"
                    ? 0
                    : $x.detectedBrowserType === "safari"
                        ? 10
                        : $x.detectedBrowserType === "firefox_windows"
                            ? 20
                            : $x.detectedBrowserType === "firefox_other"
                                ? 30
                                : 40),
            ),
            $v(3, 3),
            pink,
        );
    }
}

import {$, $d, $rgb_p8, $rgb_red, $v} from "@beetpx/beetpx";

declare global {
    interface Window {
        PREV_COMMIT: string;
        envType: "prod" | "dev" | undefined;
    }
}

$.init().then(async ({startGame}) => {
    $.setOnStarted(() => {
        $d.setTextColorMarkers({
            grey: $rgb_p8.dusk,
            red: $rgb_p8.ember,
        });
    });

    $.setOnDraw(() => {
        $d.clearCanvas(window.envType === "prod" ? $rgb_p8.wine : $rgb_p8.storm);
        $d.text(`PREV_COMMIT=[grey]${window.PREV_COMMIT}`, $v(1, 1), $rgb_p8.silver);
        $d.text(`envType=[red]${window.envType}`, $v(1, 8), $rgb_p8.silver);
    });

    await startGame();
});

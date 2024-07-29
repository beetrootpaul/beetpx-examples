import {$, $d, $rgb, $rgb_p8, $v, $v_1_1} from "@beetpx/beetpx";
import {ColorSequence} from "./ColorSequence";
import {Counter} from "./Counter";

$.init({canvasSize: "64x64", fixedTimestep: "60fps"}).then(
    async ({startGame}) => {
        const cs1 = new ColorSequence($rgb("#000000"));
        const cs2 = new ColorSequence($rgb("#ffffff"));
        const counter = new Counter(60);

        $.setOnUpdate(() => {
            cs1.next();
            cs2.next();
        });

        $.setOnDraw(() => {
            $d.clearCanvas($rgb_p8.slate);
            $d.ellipse($v(8), $v(48), cs1.current);
            $d.ellipse($v(16), $v(32), cs2.current);
            $d.text(counter.left.toFixed().padStart(2, "0"), $v_1_1, $rgb_p8.silver);
        });

        await startGame();
    },
);

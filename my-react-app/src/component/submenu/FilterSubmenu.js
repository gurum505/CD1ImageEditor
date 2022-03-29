import { fabric } from "fabric";
import { useEffect } from "react";

export default function FilterSubmenu(props) {
    const canvas = props.canvas;

    useEffect(() => {
        document.getElementById('opacity').value = 5;
        document.getElementById('blur').value = 0;
    }
    ,);

    var start = 0
    function blur(e) {
        const object = canvas.backgroundImage;
        if (!object) {
            return;
        }
        if (start < e.target.value) {
            start = e.target.value;
            var filter = new fabric.Image.filters.Blur({
                blur: `${e.target.value * 0.2} `
            });
            object.filters.push(filter);
            object.applyFilters();
        } else {
            start = e.target.value;
            var filter = new fabric.Image.filters.Blur({
                blur: '0',
            });
            fabric.util.removeFromArray(object.filters, object.filters[object.filters.length - 1]);
            object.applyFilters();
        }
        canvas.renderAll();
    }

    function opacity(e) {
        const object = canvas.backgroundImage;
        if (!object) {
            return;
        }
        object.set({opacity: e.target.value * 0.2});
        canvas.renderAll();
    }

    return (
        <>
            <ul>
                <li>
                    <div className="effect">
                        <div> <label htmlFor="blur">blur</label>
                            <input id="blur" type="range" min="0" max="5" defaultValue="0" step="1" onChange={blur} />
                        </div>
                        <div> <label htmlFor="opacity">opacity</label>
                            <input id="opacity" type="range" min="0" max="5" defaultValue="5" step="1" onChange={opacity} />
                        </div>

                    </div>
                    <div>
                        <input type="checkbox" id="scales" name="scales" />
                        <label htmlFor="scales">블러</label>
                        <input type="checkbox" id="scales" name="scales" />
                        <label htmlFor="scales">선명</label>
                    </div>
                </li>
            </ul>


        </>

    )
}
import { fabric } from "fabric";
import { useEffect } from "react";

export default function FilterSubmenu(props) {
    const canvas = props.canvas;
    console.log("렌더링");
    useEffect(() => {
        //새로운 이미지 렌더링 시 effect 값들 초기값으로 변경 
        document.getElementById('opacity').value = 5;
        document.getElementById('blur').value = 0;
        document.getElementById('brightness').value = 0;
        document.getElementById('pixelate').value = 0;
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

    var startBrightness = 0 ;

    function brightness(e){
        const object = canvas.backgroundImage;
        if (!object) {
            return;
        }
        if (startBrightness < e.target.value) {
            startBrightness = e.target.value;
            var filter = new fabric.Image.filters.Brightness({
                brightness: `${e.target.value * 0.2} `
            });
            object.filters.push(filter);
            object.applyFilters();
        } else {
            startBrightness = e.target.value;
            var filter = new fabric.Image.filters.Blur({
                blur: '0',
            });
            fabric.util.removeFromArray(object.filters, object.filters[object.filters.length - 1]);
            object.applyFilters();
        }
        canvas.renderAll();
    }
    var startPixel =0;
    function pixelate(e){
        const object = canvas.backgroundImage;
        if (!object) {
            return;
        }
       
        if (startPixel < e.target.value) {
            startPixel = e.target.value;
            var filter = new fabric.Image.filters.Pixelate({
                blocksize: `${e.target.value*2}`,
            });
            object.filters.push(filter);
            object.applyFilters();
        } else {
            startPixel = e.target.value;
            fabric.util.removeFromArray(object.filters, object.filters[object.filters.length - 1]);
            object.applyFilters();

        }
        canvas.renderAll();
    }
    

    return (
        <div id ='filter-list'>
            <ul style={{width:'100px', listStyle:"none"}}>
                <li>
                    <div className="effect">
                        <div> <label htmlFor="blur">blur</label>
                            <input id="blur" type="range" min="0" max="5" defaultValue="0" step="1" onChange={blur} />
                        </div>
                        <div> <label htmlFor="opacity">opacity</label>
                            <input id="opacity" type="range" min="0" max="5" defaultValue="5" step="1" onChange={opacity} />
                        </div>
                        <div> <label htmlFor="brightness">brightness</label>
                            <input id="brightness" type="range" min="-3" max="3" defaultValue="0" step="1" onChange={brightness} />
                        </div>
                        <div> <label htmlFor="pixelate">pixelate</label>
                            <input id="pixelate" type="range" min="0" max="5" defaultValue="0" step="1" onChange={pixelate} />
                        </div>

                    </div>

                </li>
            </ul>


        </div>

    )
}
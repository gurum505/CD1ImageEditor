import { fabric } from "fabric";
import { useEffect } from "react";

export default function FilterSubmenu(props) {
    // var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
    //     'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
    //     'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
    //     'polaroid', 'blend-color', 'gamma', 'kodachrome',
    //     'blackwhite', 'blend-image', 'hue', 'resize'];

    var canvas2dBackend = new fabric.Canvas2dFilterBackend()
    fabric.filterBackend = fabric.initFilterBackend();
    fabric.Object.prototype.transparentCorners = false;
    const canvas = props.canvas;
    const f = fabric.Image.filters;


    canvas.on('object:modified', () => { console.log("d") })

    // for (var i = 0; i < filters.length; i++) {
    //     (document.getElementById(filters[i])) && (
    //         (document.getElementById(filters[i])).checked = !!canvas.getActiveObject().filters[i]);
    // }


    function applyFilter(index, filter) { //필터 적용
        const obj = canvas.backgroundImage;
        obj.filters[index] = filter;
        var timeStart = +new Date();
        obj.applyFilters();
        var timeEnd = +new Date();
        var dimString = canvas.backgroundImage.width + ' x ' +
            canvas.backgroundImage.height;
        document.getElementById('bench').innerHTML = dimString + 'px ' +
            parseFloat(timeEnd - timeStart) + 'ms';
        canvas.renderAll();
    }

    function getFilter(index) { //어떤 필터인지 
        var obj = canvas.backgroundImage;
        return obj.filters[index];
    }

    function applyFilterValue(index, prop, value) {
        var obj = canvas.backgroundImage;
        if (obj.filters[index]) {
            obj.filters[index][prop] = value;
            var timeStart = +new Date();
            obj.applyFilters();
            var timeEnd = +new Date();
            var dimString = canvas.backgroundImage.width + ' x ' +
                canvas.backgroundImage.height;
            document.getElementById('bench').innerHTML = dimString + 'px ' +
                parseFloat(timeEnd - timeStart) + 'ms';
            canvas.renderAll();
        }
    }

    function invert(e) {
        applyFilter(1, e.target.checked && new f.Invert());
    }

    function brightness() {
        applyFilter(5, document.getElementById('brightness').checked && new f.Brightness({
            brightness: document.getElementById('brightness-value').value
        }));
    }

    function brightnessValue(e) {
        applyFilterValue(5, 'brightness', parseFloat(e.target.value));
    }

    function gamma(e){
        var v1 = parseFloat(document.getElementById('gamma-red').value);
        var v2 = parseFloat(document.getElementById('gamma-green').value);
        var v3 = parseFloat(document.getElementById('gamma-blue').value);
        applyFilter(17, e.target.checked && new f.Gamma({
          gamma: [v1, v2, v3]
        }));
    }

    function gammaRed(e){
        var current = getFilter(17).gamma;
        current[0] = parseFloat(e.target.value);
        applyFilterValue(17, 'gamma', current);
    }
    function gammaGreen(e){
        var current = getFilter(17).gamma;
        current[0] = parseFloat(e.target.value);
        applyFilterValue(17, 'gamma', current);
    }
    function gammaBlue(e){
        var current = getFilter(17).gamma;
        current[0] = parseFloat(e.target.value);
        applyFilterValue(17, 'gamma', current);
    }
    
    function contrast(e){
        applyFilter(6, e.target.checked && new f.Contrast({
            contrast: parseFloat(document.getElementById('contrast-value').value)
          }));
    }

    function contrastValue(e){
        applyFilterValue(6, 'contrast', parseFloat(e.target.value));

    }

    function noise(e){
        applyFilter(9, e.target.checked && new f.Noise({
            noise: parseInt(document.getElementById('noise-value').value, 10)
          }));
    }
    function noiseValue(e){
        applyFilterValue(9, 'noise', parseInt(e.target.value, 10));

    }

    function pixelate(e){
        applyFilter(10, e.target.checked && new f.Pixelate({
            blocksize: parseInt(document.getElementById('pixelate-value').value, 10)
          }));
    }
    function pixelateValue(e){
        applyFilterValue(10, 'blocksize', parseInt(e.target.value, 10));
    }

    function blur(e){
        applyFilter(11, e.target.checked && new f.Blur({
            value: parseFloat(document.getElementById('blur-value').value)
          }));
    }
    function blurValue(e){
        applyFilterValue(11, 'blur', parseFloat(e.target.value, 10));
    }
    return (

        <div id='filter-list'>
            <div id='bench'></div>

            <p>
                <label htmlFor="invert"><span>Invert:</span>
                    <input type="checkbox" id='invert' value='인버트' onClick={invert} />
                </label>
            </p>

            <p>
                <label><span>Brightness:</span> <input type="checkbox" id="brightness" onClick={brightness} /></label>
                <br />
                <label>Value: <input type="range" id="brightness-value" defaultValue="0.1" min="-1" max="1" step="0.003921" onChange={brightnessValue} /></label>
            </p>

            <p>
                <label><span>Gamma:</span> <input type="checkbox" id="gamma" onClick={gamma} /></label>
                <br />
                <label>Red: <input type="range" id="gamma-red" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaRed} /></label>
                <br />
                <label>Green: <input type="range" id="gamma-green" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaGreen} /></label>
                <br />
                <label>Blue: <input type="range" id="gamma-blue" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaBlue} /></label>
            </p>
            <p>
                <label><span>Contrast:</span> <input type="checkbox" id="contrast" onClick={contrast} /></label>
                <br />
                <label>Value: <input type="range" id="contrast-value" defaultValue="0" min="-1" max="1" step="0.003921" onChange={contrastValue} /></label>
            </p>     
            <p>
                <label><span>Noise:</span> <input type="checkbox" id="noise" onClick={noise} /></label>
                <br />
                <label>Value: <input type="range" id="noise-value" defaultValue="0" min="0" max="600" step="50" onChange={noiseValue} /></label>
            </p>
            <p>
                <label><span>Pixelate:</span> <input type="checkbox" id="pixelate" onClick={pixelate} /></label>
                <br />
                <label>Value: <input type="range" id="pixelate-value" defaultValue="1" min="1" max="20" step="3" onChange={pixelateValue} /></label>
            </p>
            <p>
                <label><span>Blur:</span> <input type="checkbox" id="blur" onClick={blur} /></label>
                <br />
                <label>Value: <input type="range" id="blur-value" defaultValue="0" min="0" max="1" step="0.1" onChange={blurValue} /></label>
            </p>
        </div>

                    )
}


//http://fabricjs.com/image-filters 
//https://codepen.io/shabnamacademy/pen/WNvZjEz
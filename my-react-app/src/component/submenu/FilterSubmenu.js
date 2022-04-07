import { fabric } from "fabric";
import { useEffect } from "react";

export default function FilterSubmenu(props) {
    var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
        'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
        'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
        'polaroid', 'blend-color', 'gamma', 'kodachrome',
        'blackwhite', 'blend-image', 'hue', 'resize'];

    useEffect(()=>{
        //이미지가 없을 때는 필터 기능 disabled
        if(canvas.backgroundImage===null){
            var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
            for(var i = 0; i<inputNodes.length; i++){
                inputNodes[i].disabled = true;
            }
        }   
        canvas.filterListState = getRangeState();
        // updateModifications(true);
    })

    
    var canvas2dBackend = new fabric.Canvas2dFilterBackend()
    fabric.filterBackend = fabric.initFilterBackend();
    fabric.Object.prototype.transparentCorners = false;
    const canvas = props.canvas;
    const f = fabric.Image.filters;


    function getRangeState() {
        var list = [];
        var checkbox = {};
        var range = {};
        var button = {};

        var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
        for (var i = 0; i < inputNodes.length; i++) {
            var id = inputNodes[i].id;
            var isChecked = inputNodes[i].checked;
            var value = inputNodes[i].value;

            if (inputNodes[i].type === 'checkbox') {
                checkbox[id] =isChecked;
            } else if (inputNodes[i].type === 'range'){
                range[id] = value;
            }else{
                button[id]=value;
            }

        }
        list.push(checkbox);
        list.push(range)
        list.push(button);
        return list; 
    }

    function resetFilter(){ //필터 초기화 
        const obj = canvas.backgroundImage;
        var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
        for(var i = 0; i<inputNodes.length; i++){
            inputNodes[i].value = inputNodes[i].defaultValue;
            inputNodes[i].checked = false; 
        }
        obj.filters = []
        obj.applyFilters();
        updateModifications(true);
        canvas.renderAll()
    }
    function applyFilter(index, filter) { //필터 적용
        const obj = canvas.backgroundImage;
        obj.filters[index] = filter;
        obj.applyFilters();
        canvas.renderAll();
        updateModifications(true);
    }

    function getFilter(index) { 
        var obj = canvas.backgroundImage;
        return obj.filters[index];
    }

    function applyFilterValue(index, prop, value) {
        var obj = canvas.backgroundImage;
        if (obj.filters[index]) {
            obj.filters[index][prop] = value;
            obj.applyFilters();
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
        applyFilter(19, e.target.checked && new f.Gamma({
          gamma: [v1, v2, v3]
        }));
    }

    function gammaRed(e){
        var current = getFilter(19).gamma;
        current[0] = parseFloat(e.target.value);
        applyFilterValue(19, 'gamma', current);
    }
    function gammaGreen(e){
        var current = getFilter(19).gamma;
        current[1] = parseFloat(e.target.value);
        applyFilterValue(19, 'gamma', current);
    }
    function gammaBlue(e){
        var current = getFilter(19).gamma;
        current[2] = parseFloat(e.target.value);
        applyFilterValue(19, 'gamma', current);
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
    function updateModifications(savehistory) {
        if (savehistory === true) {
            canvas.filterListState = getRangeState();
            var myjson = canvas.toDatalessJSON(['width', 'height', 'id','filterListState']);
            stateRef.current.push(myjson);        
        }

    }

    const stateRef = props.stateRef;
    var beforeValue;
    function mouseDown(e){
        beforeValue = e.target.value;
    }
    function mouseUp(e){
        var currentValue = e.target.value;
        var checkbox = document.getElementById(e.target.id.split('-')[0]);

        if(beforeValue!==currentValue && checkbox.checked==true){
            updateModifications(true);
       }
    }

 
    return (

        <div id='filter-list'>
            <div id='bench'></div>
            
            <input type="button" id="reset" value="reset" onClick={resetFilter} />
            <p>
                <label htmlFor="invert"><span>Invert:</span>
                    <input type="checkbox" id='invert' value='인버트' onClick={invert} />
                </label>
            </p>

            <p>
                <label><span>Brightness:</span> <input type="checkbox" id="brightness" onClick={brightness} /></label>
                <br />
                <label>Value: <input type="range" id="brightness-value" defaultValue="0" min="-1" max="1" step="0.003921" onChange={brightnessValue} onMouseDown={mouseDown} onMouseUp={mouseUp}/></label>
            </p>

            <p>
                <label><span>Gamma:</span> <input type="checkbox" id="gamma" onClick={gamma} /></label>
                <br />
                <label>Red: <input type="range" id="gamma-red" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaRed} onMouseDown={mouseDown} onMouseUp={mouseUp}/></label>
                <br />
                <label>Green: <input type="range" id="gamma-green" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaGreen} onMouseDown={mouseDown} onMouseUp={mouseUp}/></label>
                <br />
                <label>Blue: <input type="range" id="gamma-blue" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaBlue}onMouseDown={mouseDown} onMouseUp={mouseUp} /></label>
            </p>
            <p>
                <label><span>Contrast:</span> <input type="checkbox" id="contrast" onClick={contrast} /></label>
                <br />
                <label>Value: <input type="range" id="contrast-value" defaultValue="0" min="-1" max="1" step="0.003921" onChange={contrastValue} onMouseDown={mouseDown} onMouseUp={mouseUp}/></label>
            </p>     
            <p>
                <label><span>Noise:</span> <input type="checkbox" id="noise" onClick={noise} /></label>
                <br />
                <label>Value: <input type="range" id="noise-value" defaultValue="0" min="0" max="600" step="50" onChange={noiseValue} onMouseDown={mouseDown} onMouseUp={mouseUp}/></label>
            </p>
            <p>
                <label><span>Pixelate:</span> <input type="checkbox" id="pixelate" onClick={pixelate} /></label>
                <br />
                <label>Value: <input type="range" id="pixelate-value" defaultValue="1" min="1" max="20" step="3" onChange={pixelateValue} onMouseDown={mouseDown} onMouseUp={mouseUp}/></label>
            </p>
            <p>
                <label><span>Blur:</span> <input type="checkbox" id="blur" onClick={blur} /></label>
                <br />
                <label>Value: <input type="range" id="blur-value" defaultValue="0" min="0" max="1" step="0.1" onChange={blurValue} onMouseDown={mouseDown} onMouseUp={mouseUp}/></label>
            </p>
        </div>

                    )
}


//http://fabricjs.com/image-filters 
//https://codepen.io/shabnamacademy/pen/WNvZjEz
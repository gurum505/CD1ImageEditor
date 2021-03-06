import { fabric } from "fabric";
import { useEffect } from "react";
import * as common from './common'
// import styles from "./LeftSidebarSubmenu.module.css"
import styles from "../../Layout/LeftSidebar.module.css"

export default function FilterSubmenu(props) {
    var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
        'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
        'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
        'polaroid', 'blend-color', 'gamma', 'kodachrome',
        'blackwhite', 'blend-image', 'hue', 'resize'];

    useEffect(() => {
        //이미지가 없을 때는 필터 기능 disabled
        if (common.getMainImage(canvas) === null) {
            const divElem = document.getElementById('filter-menu');

            const inputElements = divElem.querySelectorAll("input[type=range], input[type=checkbox], button")
            for (var i = 0; i < inputElements.length; i++) {
                inputElements[i].disabled = true;
            }
        }
    })

    useEffect(() => {
        const divElem = document.getElementById('filter-menu');
        const inputElements = divElem.querySelectorAll("input,range, checkbox")
        inputElements.forEach((input) => {
            input.addEventListener('change', (e) => {
                canvas.filterValues = common.getRangeState();
                common.updateStates(canvas);
            })
        })
    }, [])


    var canvas2dBackend = new fabric.Canvas2dFilterBackend()
    fabric.filterBackend = fabric.initFilterBackend();
    fabric.Object.prototype.transparentCorners = false;
    const canvas = props.canvas;
    const f = fabric.Image.filters;


    function resetFilter() { //필터 초기화 
        const obj = common.getMainImage(canvas);
        var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
        for (var i = 0; i < inputNodes.length; i++) {
            inputNodes[i].value = inputNodes[i].defaultValue;
            inputNodes[i].checked = false;
        }
        obj.filters = []
        obj.applyFilters();
        canvas.renderAll();
    }
    function applyFilter(index, filter) { //필터 적용
        const obj = common.getMainImage(canvas);
        obj.filters[index] = filter;
        obj.applyFilters();
        canvas.renderAll();
        canvas.filterValues = common.getRangeState();
    }

    function getFilter(index) {
        const obj = common.getMainImage(canvas);
        return obj.filters[index];
    }

    function applyFilterValue(index, prop, value) {
        const obj = common.getMainImage(canvas);
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

    function gamma(e) {
        var v1 = parseFloat(document.getElementById('gamma-red').value);
        var v2 = parseFloat(document.getElementById('gamma-green').value);
        var v3 = parseFloat(document.getElementById('gamma-blue').value);
        applyFilter(19, e.target.checked && new f.Gamma({
            gamma: [v1, v2, v3]
        }));
    }

    function gammaRed(e) {
        var current = getFilter(19).gamma;
        current[0] = parseFloat(e.target.value);
        applyFilterValue(19, 'gamma', current);
    }
    function gammaGreen(e) {
        var current = getFilter(19).gamma;
        current[1] = parseFloat(e.target.value);
        applyFilterValue(19, 'gamma', current);
    }
    function gammaBlue(e) {
        var current = getFilter(19).gamma;
        current[2] = parseFloat(e.target.value);
        applyFilterValue(19, 'gamma', current);
    }

    function contrast(e) {
        applyFilter(6, e.target.checked && new f.Contrast({
            contrast: parseFloat(document.getElementById('contrast-value').value)
        }));
    }

    function contrastValue(e) {
        applyFilterValue(6, 'contrast', parseFloat(e.target.value));

    }

    function noise(e) {
        applyFilter(9, e.target.checked && new f.Noise({
            noise: parseInt(document.getElementById('noise-value').value, 10)
        }));
    }
    function noiseValue(e) {
        applyFilterValue(9, 'noise', parseInt(e.target.value, 10));

    }

    function pixelate(e) {
        applyFilter(10, e.target.checked && new f.Pixelate({
            blocksize: parseInt(document.getElementById('pixelate-value').value, 10)
        }));
    }
    function pixelateValue(e) {
        applyFilterValue(10, 'blocksize', parseInt(e.target.value, 10));
    }

    function blur(e) {
        applyFilter(11, e.target.checked && new f.Blur({
            value: parseFloat(document.getElementById('blur-value').value)
        }));
    }
    function blurValue(e) {
        applyFilterValue(11, 'blur', parseFloat(e.target.value, 10));
    }

    function setCanvasWidth(e){
        var value;
        if (!e.target.value) value = 100 //값이 없을 때 객체가 사라지는 것을 방지
        else value = parseInt(e.target.value);
        canvas.setWidth(value);
        common.getMainImage(canvas).set({
            scaleX: canvas.width/ common.getMainImage(canvas).width,
        })
        canvas.initialWidth = value;
        common.setCanvasCenter(canvas);
        canvas.renderAll();
    }

    function setCanvasHeight(e){
        var value;
        if (!e.target.value) value = 100 //값이 없을 때 객체가 사라지는 것을 방지
        else value = parseInt(e.target.value);
        canvas.setHeight(value);
        common.getMainImage(canvas).set({
            scaleY: canvas.height/ common.getMainImage(canvas).height,
        })
        canvas.initialHeight = value;
        common.setCanvasCenter(canvas);
        canvas.renderAll();

    }   

    function setCanvasSize(){
        var width = document.getElementById('canvas-width').value;
        var height = document.getElementById('canvas-height').value;
        canvas.setWidth(width)
        canvas.setHeight(height)
        console.log(common.getMainImage(canvas))
        common.getMainImage(canvas).set({
            scaleX: canvas.width/ common.getMainImage(canvas).width,
            scaleY: canvas.height/ common.getMainImage(canvas).height,
        })
        // common.getMainImage(canvas).scaleToWidth(width);
        // common.getMainImage(canvas).scaleToHeight(height);

        common.setCanvasCenter(canvas);
      
    }


    return (

        <div id='filter-menu' className={styles.Submenu}>
            <div className={styles.Title}>Filter</div>
            <p><label> width</label> <input type="text" id='canvas-width' onChange={setCanvasWidth}/></p>
            <p><label> height</label> <input type="text" id='canvas-height' onChange={setCanvasHeight} /></p>
            {/* <p><button onClick={setCanvasSize}>apply</button></p> */}
            <p>
                {/* reset버튼을 오른쪽으로 가게하기위한 빈 span*/}
                <span></span>
                <span></span>

            </p>
            <div className={styles.effectContainer} id='filter-list'>
                <button type="button" id="reset" value="reset" onClick={resetFilter}>
                    reset
                </button>
                {/* <input type="button" id="reset" value="reset" onClick={resetFilter} /> */}

                <label htmlFor="invert">Invert <input type="checkbox" id='invert' value='인버트' onClick={invert} /> </label>
                {/* <button id="invert" onClick={invert} > Invert</button> */}

                <label>Brightness <input type="checkbox" id="brightness" onClick={brightness} /> </label>
                <input type="range" id="brightness-value" defaultValue="0" min="-1" max="1" step="0.003921" onChange={brightnessValue} />


                <label>Gamma <input type="checkbox" id="gamma" onClick={gamma} /></label>
                Red <input type="range" id="gamma-red" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaRed} style={{ 'width': '100px' }} />
                Green <input type="range" id="gamma-green" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaGreen} />
                Blue <input type="range" id="gamma-blue" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaBlue} />

                <label>Contrast <input type="checkbox" id="contrast" onClick={contrast} /></label>
                <input type="range" id="contrast-value" defaultValue="0" min="-1" max="1" step="0.003921" onChange={contrastValue} />

                <label>Noise <input type="checkbox" id="noise" onClick={noise} /></label>
                <input type="range" id="noise-value" defaultValue="0" min="0" max="600" step="50" onChange={noiseValue} />

                <label>Pixelate <input type="checkbox" id="pixelate" onClick={pixelate} /></label>
                <input type="range" id="pixelate-value" defaultValue="1" min="1" max="20" step="3" onChange={pixelateValue} />

                <label>Blur <input type="checkbox" id="blur" onClick={blur} /></label>
                <input type="range" id="blur-value" defaultValue="0" min="0" max="1" step="0.1" onChange={blurValue} />
            </div>
        </div>



        // <div className={styles.effectContainer}>

        //     {/* e.target.checked */}
        //     <button id="invert" onClick={invert} > Invert</button>

        //     {/* document.getElementById('brightness').checked */}
        //     <button id="brightness" onClick={brightness}> Brightness</button>
        //     <input type="range" id="brightness-value" defaultValue="0" min="-1" max="1" step="0.003921" onChange={brightnessValue} />

        //     {/* e.target.checked */}
        //     <button id="gamma" onClick={gamma}> Gamma</button>
        //     Red <input type="range" id="gamma-red" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaRed}/>
        //     Green <input type="range" id="gamma-green" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaGreen} />
        //     Blue <input type="range" id="gamma-blue" defaultValue="1" min="0.2" max="2.2" step="0.003921" onChange={gammaBlue} />

        //     {/* e.target.checked */}
        //     <button id="contrast" onClick={contrast}> Contrast</button>
        //     <input type="range" id="contrast-value" defaultValue="0" min="-1" max="1" step="0.003921" onChange={contrastValue} />

        //     {/* e.target.checked */}
        //     <button id="noise" onClick={noise}> Noise</button>
        //     <input type="range" id="noise-value" defaultValue="0" min="0" max="600" step="50" onChange={noiseValue} />

        //     {/* e.target.checked */}
        //     <button id="pixelate" onClick={pixelate}>Pixelate</button>
        //     <input type="range" id="pixelate-value" defaultValue="1" min="1" max="20" step="3" onChange={pixelateValue} />

        //     {/* e.target.checked */}
        //     <button id="blur" onClick={blur}>Blur</button>
        //     <input type="range" id="blur-value" defaultValue="0" min="0" max="1" step="0.1" onChange={blurValue} />
        // </div>
        // </div>

    )
}


//http://fabricjs.com/image-filters
//https://codepen.io/shabnamacademy/pen/WNvZjEz
import { fabric } from "fabric";
import { useEffect } from "react";

export default function FilterSubmenu(props) {

    var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
        'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
        'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
        'polaroid', 'blend-color', 'gamma', 'kodachrome',
        'blackwhite', 'blend-image', 'hue', 'resize'];

    var canvas2dBackend = new fabric.Canvas2dFilterBackend()
    fabric.filterBackend = fabric.initFilterBackend();
    fabric.Object.prototype.transparentCorners = false;
    const canvas = props.canvas;
    const f = fabric.Image.filters;


    for (var i = 0; i < filters.length; i++) {
        (document.getElementById(filters[i])) && (
            (document.getElementById(filters[i])).checked = !!canvas.getActiveObject().filters[i]);
    }


    function applyFilter(index, filter) { //필터 적용
        const obj = canvas.backgroundImage;
        obj.filters[index] = filter;
        var timeStart = +new Date();
        console.log(timeStart)
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
            var dimString = canvas.getActiveObject().width + ' x ' +
                canvas.getActiveObject().height;
            document.getElementById('bench').innerHTML = dimString + 'px ' +
                parseFloat(timeEnd - timeStart) + 'ms';
            canvas.renderAll();
        }
    }

    function invert() {
        applyFilter(1, document.getElementById('invert').checked && new f.Invert());
    }
    return (

        <div id='filter-list'>
            <div id='bench'></div>

            <label htmlFor=""><span>Invert:</span>
                <input type="checkbox" id='invert' value='인버트' onClick={invert} />
            </label>
        </div>

    )
}
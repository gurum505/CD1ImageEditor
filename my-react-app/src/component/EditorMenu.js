import { fabric } from "fabric";

export default function EditorMenu(props) {
    const canvas = props.canvas.current;

    //선 그리기 
    function drawLine() {
        console.log(canvas);
        canvas.isDrawingMode = true;
        if (canvas.isDrawingMode == true) {
            console.log("켜짐");
        }
        canvas.on('mouse:up', function () {
            canvas.isDrawingMode = false;
        });
    }


    function addRectangle() {
        canvas.add(new fabric.Rect({
            left: Math.floor(Math.random() * 101),
            top: Math.floor(Math.random() * 101),
            fill: '#f55',
            width: 50,
            height: 50
        }));

    }

    function addCircle() {
        canvas.add(new fabric.Circle({
            radius: 30, fill: '#f55',
            top: Math.floor(Math.random() * 101),
            left: Math.floor(Math.random() * 101)
        }));
    }

    function addTextBox() {
        var text = new fabric.Textbox('text box',
            {
                left: Math.floor(Math.random() * 101),
                top: Math.floor(Math.random() * 101),
                width: 200
            });
        canvas.add(text);
    }


    //개체 삭제 
    function removeObject() {
        console.log(canvas.getActiveObject());
        canvas.remove(canvas.getActiveObject());

    }

    return (
        <div className="Editor-menu">
            <button className="a" onClick={drawLine}>그리기</button>
            <button className="a" onClick={addRectangle}>사각형</button>
            <button className="a" onClick={addCircle}>원</button>
            <button className="a" onClick={addTextBox}>텍스트</button>
            <button className="a" disabled id="remove-object" onClick={removeObject}>삭제</button>
            {/* <button className="a" onClick="test()">실험</button>
            <button id="undo" className="a" onClick="undo()">취소</button>
            <button id="redo" className="a" onClick="redo()">되돌리기</button> */}
        </div>
    )
}


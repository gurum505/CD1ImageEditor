

export default function Test(props) {
    const canvas = props.canvas;
    console.log(canvas);
    var text = new fabric.Textbox('text box',
        {
            left: Math.floor(Math.random() * 101),
            top: Math.floor(Math.random() * 101),
            width: 200,
            type :"text"  //객체 유형 구분하기 위해 추가

        });
    canvas.add(text);
}
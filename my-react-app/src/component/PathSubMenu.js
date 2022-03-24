export default function PathSubMenu(props) {
    const canvas = props.canvas;
    function straight() {
        canvas.isDrawingMode = true;

        canvas.on('object:added', () => {
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1)); //객체 생성 시 setActive
        });
        canvas.on('mouse:up', function () {
            canvas.isDrawingMode = false;
        });

    }
    return (<>
        <div>
            <button disabled>
                곡선
            </button>
            <button onClick={straight}>
                직선
            </button>
            <button disabled>
                색상
            </button>

        </div>
    </>)
}
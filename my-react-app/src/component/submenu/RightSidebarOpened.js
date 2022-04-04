import styles from "./RightSidebarOpened.module.css"
//속성들-정렬은 header에 가는게 맞을수도 있다.

export default function RightSidebarOpened({canvasRef}){
    //함수조작 여기서
    const canvas=canvasRef.current;

    function resizeCanvasWidth(e){
      canvas.setWidth(e.target.value);
      console.log(e.target.value);
    }
    function resizeCanvasHeight(e){
        canvas.setHeight(e.target.value);
        console.log(e.target.value);
    }
    
    return(
        <div>
          <details className={styles.detail}>
            <summary>Canvas</summary>
            <p>width<input type="text"  onChange = {resizeCanvasWidth} placeholder="600" /></p>
            <p>height<input type="text"  onChange={resizeCanvasHeight} placeholder="400" /></p>            
          </details>
          <details className={styles.detail}>
            <summary>Figure</summary>
            <p>width</p>
            <p>height</p>    
            <p>Color</p>         
          </details>
          <details className={styles.detail}> 
            <summary>Text</summary>
            <p>Color</p>
            <p>Size or fontSize</p>
            <p>Bold</p>
            <p>Italic</p>
            <p>Underline</p>
            <p>Align-Left</p>
            <p>Align-Center</p>
            <p>Align-Right</p>
          </details>
          <details className={styles.detail}>
            <summary>Drawing</summary>
            <p>width</p>
            <p>Color</p>         
          </details>
          <details className={styles.detail}>
            <summary>Image</summary>
            <p>width</p>
            <p>height</p>
            <p>blur</p>   
            <p>opacity</p>
            <p>brightness</p>
            <p>pixelate</p>         
          </details>
        </div>
    );
}

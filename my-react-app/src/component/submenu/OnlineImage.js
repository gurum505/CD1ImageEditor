
import styles from "./OnlineImage.module.css"
import { fabric } from "fabric";
import {SearchOutlined, SearchOutlinedIcon} from  "../icons/icons";
import * as common from './common'
//FIXME: 이미지 불러오면 div가 스크롤 되게 하고 싶은데 overflow 설정해도 적용이 안됨 
//TODO: 드래그 후 드랍할 때 마우스 위치를 어떻게 ??
export default function OnelineImage(props) {
    const canvas = props.canvas;

    const apikey = "26628044-6a51b2056c4c10fd1fccc159d";
    const lang = 'ko' //검색 지역 
    const colors = 'transparent'


    let page_num = 1;
    let search = false;
    let query = "";

    function loadImage() {
        if (query = '') return
        query = document.getElementById('query').value;
        console.log(query)
        async function CuratedPhotos(page_num) {
            document.querySelector(".gallery").innerHTML = "";

            const data = await fetch(`https://pixabay.com/api?q=${query}&key=${apikey}&lang=${lang}&colors=${colors}`);

            const result = await data.json();   //await : 처리 될 때까지 기다림 
            // console.log(response);
            result.hits.forEach((photo) => {
                var pic = document.createElement('div');
                var imgtag = document.createElement('img');
                var span = document.createElement('p');

                span.innerHTML= 'by : '+photo.user;
                imgtag.src = photo.webformatURL;
                imgtag.crossOrigin='anonymous';
                imgtag.onclick = () => {
                    console.log(canvas)
                    console.log(photo.webformatURL)
                    var img = new fabric.Image.fromURL(photo.webformatURL, image => {
                        image.src = photo.webformatURL;
                        image.crossOrigin='*';
                        image.id = ++canvas.objectNum;
                        image.left = Math.floor(Math.random() * 101);
                        image.top = Math.floor(Math.random() * 101);
                        image.scaleToWidth(200, false);
                        image.scaleToHeight(200, false);
                        image.transparentCorners = false;
                        canvas.add(image);
                        console.log(image)
                        canvas.renderAll();
                        common.updateStates(canvas)
                        common.addLayer(canvas,image);
                    });

                };
                //드래그 드랍 했을 때 추가는 되는데 캔버스 기준 마우스 좌표를 얻을 방법이 없는 거 같음. 
                // imgTag.ondragend = (e) => { 
                //     console.log(window.event.pageX);
                //     var img = new fabric.Image.fromURL(photo.webformatURL, image => {
                        
                //         image.id = ++objectNumRef.current;
                //         image.scaleToWidth(200, false);
                //         image.scaleToHeight(200, false)
                //         image.left = canvas.width/2 
                //         image.top = canvas.height/2 
                //         canvas.add(image);
                //         canvas.renderAll();
                //         updateModifications(true);
                //         addLayer(image);
                //         colorActiveLayer()
                //     });
                // };
                imgtag.ondragstart=()=>{console.log('드래그시작')}
                pic.appendChild(imgtag);
                pic.appendChild(span);
                document.querySelector(".gallery").appendChild(pic);
            });
        }
        CuratedPhotos(page_num);
    }
    return (
        <div>
            <div className="search">
                <p><label htmlFor="">이미지 검색</label></p>
                <p>
                    <input id='query' type="text" style={{'width':'120px', 'height':'30px'}} />
                    <SearchOutlinedIcon onClick={loadImage} className="searchbutton" style={{fontSize:'10%'}} />
                </p>
            
            </div>
            <div className="gallery">

            </div>

        </div>
    )
}
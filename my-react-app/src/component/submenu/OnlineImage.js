
import styles from "./OnlineImage.module.css"
import { fabric } from "fabric";
import {SearchOutlined, SearchOutlinedIcon} from  "../icons/icons";

//FIXME: 이미지 불러오면 div가 스크롤 되게 하고 싶은데 overflow 설정해도 적용이 안됨 
//TODO: 드래그 후 드랍할 때 마우스 위치를 어떻게 ??
export default function OnelineImage(props) {
    const canvas = props.canvas;
    const stateRef = props.stateRef;
    const objectNumRef = props.objectNumRef;

    const apikey = "26628044-6a51b2056c4c10fd1fccc159d";
    const lang = 'ko' //검색 지역 
    const colors = 'transparent'


    let page_num = 1;
    let search = false;
    let query = "";

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toJSON();
            stateRef.current.push(myjson);
        }
    }

    function addLayer(object) {  //레이어에 객체 추가 
        const div = document.createElement('div');
        div.id = objectNumRef.current
        div.style.border = ' solid #0000FF';
        div.style.width = '130px';
        const el = document.getElementById('layer');

        const objectBtn = document.createElement('button');
        objectBtn.innerHTML = object.type;
        objectBtn.className = "layer-object";
        objectBtn.onclick = () => {
            canvas.setActiveObject(object);
            canvas.renderAll();
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            canvas.remove(object);
            document.getElementById(object.id).remove();
            updateModifications(true);
        }


        div.appendChild(objectBtn);
        div.appendChild(deleteBtn);
        el.insertBefore(div, el.firstChild);  //스택처럼 쌓이게 
    }

    function colorActiveLayer() {
        var layerElements = document.getElementById('layer');
        for (let i = 0; i < layerElements.children.length; i++) {
            layerElements.children[i].style.border = 'solid blue';
        }
        var objects = canvas.getActiveObjects();
        objects.forEach((object) => {
            document.getElementById(object.id).style.border = 'solid red'
        })
    }

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
                var imgTag = document.createElement('img');
                var span = document.createElement('p');
                span.innerHTML= 'by : '+photo.user;
                imgTag.src = photo.webformatURL;
                imgTag.onclick = () => {
                    var img = new fabric.Image.fromURL(photo.webformatURL, image => {
                        image.id = ++objectNumRef.current;
                        image.left = Math.floor(Math.random() * 101);
                        image.top = Math.floor(Math.random() * 101);
                        image.scaleToWidth(200, false);
                        image.scaleToHeight(200, false);
                        image.transparentCorners = false;
                        canvas.add(image);
                        canvas.renderAll();
                        updateModifications(true);
                        addLayer(image);
                        colorActiveLayer()
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
                imgTag.ondragstart=()=>{console.log('드래그시작')}
                pic.appendChild(imgTag);
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
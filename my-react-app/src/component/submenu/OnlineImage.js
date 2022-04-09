
import styles from "./OnlineImage.module.css"
export default function OnelineImage() {

    const apikey = "563492ad6f917000010000014e0d1ce4832d4ae8b1f88a493c844c6f";
    // const next = document.querySelector('.next');
    // const input = document.querySelector('input');
    // const searchbutton = document.querySelector(".searchbutton");

    let page_num = 1;
    let search = false;
    let query = "";

    // input.addEventListener("input", (e) => {
    //     e.preventDefault();
    //     query = e.target.value; //검색어 
    // });

    // searchbutton.addEventListener("")
 

    function loadImage(){
        if(query='') return 
        query=document.getElementById('query').value;
        console.log(query)
        async function CuratedPhotos(page_num) {
            document.querySelector(".gallery").innerHTML="";

            const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: apikey,     //use the apikey you have generated
                    },
                });
            const result = await data.json();   //await : 처리 될 때까지 기다림 
            // console.log(response);
            result.photos.forEach(photo => {
                const pic = document.createElement('div');
                pic.innerHTML = `<img src =${photo.src.large}>
                <p>Photo : ${photo.photographer}</p>
                <a href =${photo.src.large}>Download</a>
                `
                document.querySelector(".gallery").appendChild(pic);
            })
            console.log(data);
        }
        CuratedPhotos(page_num);
    }
    return (
        <div>
            <div className="search">
                <input id='query' type="text"/>
                <button onClick={loadImage} className="searchbutton">search</button>
            </div>
            <div className="gallery">

            </div>

        </div>
    )
}
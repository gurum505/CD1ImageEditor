# fabric-image-editor
(국문) HTML5 Canvas 기반 오픈소스 이미지 에디터 라이브러리 개발
(영문) Opensource Image Editor Library Development based on HTML5 Canvas
본 프로젝트는 2022-1학기 경희대학교 캡스톤 디자인 1 - 산업체 주제(모바일 앱개발 협동조합)를 바탕으로 개발했습니다

# Members
정세호<gurum505@khu.ac.kr>  
한봉훈<bng4535@khu.ac.kr>  
# Installation
Run ```npm install fabric-image-editor```

# Getting Started
1. Clone this Project with ```git clone https://github.com/gurum505/CD1ImageEditor/```
2. Install dependencies with ```npm install```
3. Run the App with ```npm start```
4. Open your web browser to```http://localhost:3000```

# Demo
https://gurum505.github.io/CD1ImageEditor/

# Motivation
산학 협력 프로젝트로 기존의 배포된 이미지 편집 라이브러리를 바탕으로 한 웹 애플리케이션을 개발하기로 했습니다 . 하지만 이미 구현된 라이브러리를 단순히 이용하는 것은 큰 의미가 없다고 생각하여 canvas API를 활용하여 직접 이미지 에디터를 제작해 보기로 했습니다. canvas API 자체는 추상성이 낮고 객체 단위의 처리가 어려워서 cavnas API를 기반으로 한 fabric js 라이브러리를 바탕으로 온라인 이미지 편집기를 만들고 이를 라이브러리화 하는 것을 최종 목표로 삼았습니다.
# Considerations
<ul>
<li>
  추상화: Canvas API에서 제공하는 기본 추상화 단계가 낮아, 실제 애플리케이션 레벨에서 기능을 쓰기에는 생산성이 낮습니다. 따라서 2D 그래픽에 대한 기본 추상화를 제공하는 라이  브러리 Konva.js를 활용하였습니다.
</li>
<li>
  연속성: 직렬화 및 역직렬화를 통해 작업의 연속성을 제공합니다. 캔버스 위의 모든 작업 내용은 직렬화를 통해 JSON형태로 저장되었다가 이를 불러오면 이전의 작업을 이어서 수행할 수 있습니다. 
</li>
</ul>

# Features

3.1.1   객체의 layer 

![그림1](https://user-images.githubusercontent.com/33712528/172047275-019d6523-6f9a-456e-bc64-819f0606dccf.png)
사용자는 객체를 생성하고 상호작용한다. 새 객체를 만들면 그 객체 고유의 layer와 ID가 생성되고 React의 state를 사용해 전역적으로 객체ID를 관리한다. 이 때 사용자의 객체에 대한 상호작용은  레이어에 즉각적으로 반영이 된다. 또한 레이어의 순서를 뒤바꿀시 그에 따라 각 객체의 z-index는 재정렬된다.
3.1.2   undo/redo 

![그림2](https://user-images.githubusercontent.com/33712528/172047300-1ffcd38a-d952-47e7-89ef-432b8830a7df.png)
     fabric.js 라이브러리가 제공하는 메서드를 사용하면 특정 시점의 canvas 객체를 JSON 형태로 저장하거나 불러오는 것이 가능하다. 하지만 부분적으로 필요한 내용이 아닌 캔버스 상태 전체 내용을 불러오고 저장하므로 필요 이상의 무거운 작업을 하게된다. 이를 개선하기 위해 undoStack, redoStack 배열을 각각 할당하여 이벤트가 발생했을 때 undoStack 배열에 부분적으로 필요한 내용(객체, 필터 내용 등)만을 추가한다. 이 상태에서 이전(undo)을 했을 때는 undoStack에서 가장 최근에 추가된 요소를 redoStack에 추가하고 undoStack에서 가장 나중의 index에 해당하는 캔버스 상태 정보를 캔버스에 반영한다. 되돌리기(redo)를 했을 때는 가장 나중의 index에 해당하는 요소를 undoStack에 추가하고 캔버스에 반영하는 형태로 성능을 개선하였다.  [그림2]에서 초록색 undo를 누르면 1만 남고 2는 지워지며 파란색 redo를 누르면 사라졌던 2가 다시 나타난다.                                                   
3.1.3   zoom,  미리보기 

![그림3](https://user-images.githubusercontent.com/33712528/172047301-6b2f7ee5-1daa-4db4-a951-440d39250e2b.png)
![그림4](https://user-images.githubusercontent.com/33712528/172047302-03d9f0f8-5ad5-49f4-bb21-d0aa02e2abff.png)
zoom기능은 사용자의 세세한 작업을 지원함으로써 결과물 완성도에 직결된다. 마우스 휠과 버튼을 통해 canvas의 크기를 유동적으로 조절함 사용자는 직관적으로 zoom기능을 사용할 수 있다. 또한 미리보기 기능을 통해 작업물 외의 다른 UI를  제거하여 사용자의 결과물을 객관적으로 어떻게 저장될 것인지 볼 수 있다.  [그림3]에서 파란색으로 표시된 부분은 zoom의 확대도를 표시하고 버튼으로도 확대를 조절할 수 있게 구현하였다. 초록색은 미리보기 버튼으로, 클릭시 하단의 UI만 남기고 나머지 UI는 사라진다.



3.1.5   저장 및 복구 

![그림5](https://user-images.githubusercontent.com/33712528/172047306-539126b9-1714-4b17-b7ff-1fbae19d896f.png)
![그림6](https://user-images.githubusercontent.com/33712528/172047307-3504af97-4921-42cf-bc7f-79013ff21ee7.png)
  fabric js 내 toJSON() 과 loadFromJSON() 메서드를 활용하면 캔버스 객체를 JSON 포맷으로 직렬화하고, 직렬화한 JSON 파일을 다시 역 직렬화하는 것이 가능하다. 캔버스 자체에 정의된 이벤트뿐만 아니라, 각 객체의 위치, 크기, 객체 단위의 이벤트 등의 모든 내용을 그대로 저장하고 불러올 수 있다. 사용자가 캔버스나 객체에 추가로 정의한 attribute 또한 직렬화 및 역 직렬화 과정에서 사라지지 않고 유지되므로, 이전의 캔버스를 불러오고 작업을 이어나갈 때 충돌이 발생하지 않는다. [그림 5]에서  캔버스의 위에  두 객체가 있을 때 이를 직렬화하면 [그림  6]과 같이 캔버스와 관련한 모든 내용이 JSON파일로 저장됨을 확인할 수 있다. 
     3.1.6  온라인 이미지 요소 추가

![그림7](https://user-images.githubusercontent.com/33712528/172047309-23c1c0ca-4ef8-4fc8-b472-80da9fbc567a.png)
![그림8](https://user-images.githubusercontent.com/33712528/172047310-97f10872-a7e6-455d-816a-de06b7c8da98.png)
  온라인상에서 실시간으로 이미지를 불러오는 기능을 구현하였다. Pixabay API를 활용하면 해당 사이트가 제공하는 이미지 파일을 JSON 형태로 받을 수 있다. [그림 7]과 같이 좌측 메뉴바에서 이미지 검색어를 입력했을 때 Pixabay에서 제공하는 이미지 파일 중 배경이 없는 PNG 형태의 파일 목록을 스크롤이 가능한 형태로 좌측 메뉴에 표시하였다. 그리고, 특정 객체를 클릭했을 때 캔 캔버스 위의  요소로 추가해 사용자가 활용할 수 있게 하였다(그림 8).


# References


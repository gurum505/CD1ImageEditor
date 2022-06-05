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

# References


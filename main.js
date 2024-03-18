const API_KEY = `a7b6acacf5f744089843abcad888acb8`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));

let url = new URL(
  `https://eunji-news-api.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`
);
//https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}
//https://eunji-news-api.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try{
    url.searchParams.set("page",page); // &page=page
    url.searchParams.set("pageSize",pageSize);
    const response = await fetch(url);
    const data = await response.json();

    if(response.status===200){
      if(data.articles.length === 0){
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();

    }else{
      throw new Error(data.message)
    }
   
  }catch(error){
    errorRender(error.message);
  };
    
  };

const getLatestNews = async () =>{
   url = new URL( `https://eunji-news-api.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  );   
    getNews();
  };

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://eunji-news-api.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://eunji-news-api.netlify.app/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
};

const render = () => {
  const newsHTML = newsList.map(news => {
    const imageSrc = news.urlToImage ? news.urlToImage : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg'; // 대체 이미지 주소 설정
    return `
      <div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size" src="${imageSrc}" />
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${news.description}</p>
          <div>${news.source.name} * ${news.publishedAt}</div>
        </div>
      </div>`;
  }).join("");  

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage)=>{
  const errorHTML = `<div class="alert alert-danger" role="alert">
 ${errorMessage}
</div>`

document.getElementById("news-board").innerHTML = errorHTML;
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};


const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const paginationRender = () =>{
  //totalResult.
  //page
  //pagesize
  //totalPages
  const totalPages = Math.ceil(totalResults/pageSize);

  //pageGroup
  const pageGroup = Math.ceil(page / groupSize);

  //lastPage
  let lastPage = pageGroup * groupSize;
  if(lastPage > totalPages){
    lastPage=totalPages;
  }

  //firstPage
  const firstPage = 
    lastPage - (groupSize-1) <=0 ? 1 :  lastPage - (groupSize-1);

  let paginationHTML = ` <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" href="#"><</a></li>`;

  for(let i=firstPage; i<=lastPage; i++){
    paginationHTML += `<li class="page-item ${i===page? "active":''}" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
  }
  paginationHTML += `<li class="page-item" onclick="moveToPage(page+1)"><a class="page-link" href="#">></a></li>`;
  
  let last = pageGroup * 5;
  if (last > totalPages) {
    // 마지막 그룹이 5개 이하이면
    last = totalPages;
    let first = last - 4 <= 0 ? 1 : last - 4; // 첫그룹이 5이하이면
  }
  
  document.querySelector(".pagination").innerHTML = paginationHTML;
  
};


const moveToPage = (pageNum) => {
  console.log("movetopage",pageNum);
  page = pageNum;
  getNews();
};
getLatestNews();


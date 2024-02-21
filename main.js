const API_KEY=`a7b6acacf5f744089843abcad888acb8`;
let newsList=[];
const getLatestNews = async () => {
    const url = new URL(
        `https://eunji-news-api.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("eunji",newsList);
};

const render = () => {
    const newsHTML = newsList.map(
    (news) => ` <div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" 
            src=${news.urlToImage}/>
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>${news.source.name} * ${news.publishedAt}</div>
</div>`
).join('');
    
    document.getElementById("news-board").innerHTML = newsHTML; 
};

getLatestNews();
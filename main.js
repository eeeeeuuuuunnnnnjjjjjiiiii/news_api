const API_KEY=`a7b6acacf5f744089843abcad888acb8`;
let news=[];
const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("eunji",response);
};


getLatestNews();
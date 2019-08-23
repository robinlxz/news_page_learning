var btn = document.getElementById('btn');
// var animalContainer = document.getElementById("animal-info");
var newsListContainer = document.getElementById("news-list-container");
let countPage = 1;

window.onload = function(){
    let ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/robinlxz/news_page_learning/master/json/web.json');
    
    if (countPage>1) {
        btn.classList.add("hide-me");
    }

    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText)
            console.log("first element in response data is:", ourData[0]);
            renderHTML(ourData);
        }
        else {
            newsListContainer.insertAdjacentHTML('beforeend', "Ops, server returned error code: "+ourRequest.status)
        }
    };

    ourRequest.onerror = function () {
        newsListContainer.insertAdjacentHTML('beforeend', "Ops, connection error")
    }

    ourRequest.send();
}

btn.addEventListener("click", function(){
   /*As chrome forbid load local file, json is GET from github*/
    let ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/robinlxz/news_page_learning/master/json/web2.json');
    countPage += 1;
    
    if (countPage>1) {
        btn.classList.add("hide-me");
    }

    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText)
            console.log("first element in response data is:", ourData[0]);
            renderHTML(ourData);
        }
        else {
            newsListContainer.insertAdjacentHTML('beforeend', "Ops, server returned error code: "+ourRequest.status)
        }
    };

    ourRequest.onerror = function () {
        newsListContainer.insertAdjacentHTML('beforeend', "Ops, connection error")
    }

    ourRequest.send();
    
    // console.log(ourData)
});

var renderHTML = function(data){
    // let htmlString = "<strong>I'm a html string!</strong><br>";
    let htmlString = '';
    for (let i=0; i<data.length; i++) {
        htmlString += '<div class="horizontal-news-box">';
            htmlString += '<a href="#">';
            htmlString += '<img class="image-link" src="' + data[i].imgUrl + '" alt="news image">';
            htmlString += '</a>';
            //Above is picture, below is text.
            htmlString += '<div class="newsinfo">';
            htmlString += '<p class="category">' + data[i].category + '</p>';
            // htmlString += '<p class="category">{{data[i].category}}</p>';
            htmlString += '<a href="#" class="news-title">' + data[i].title + '</a>';
            htmlString += '<p class="date">' + data[i].date + '</p>';
            htmlString += '</div>'
        htmlString += '</div>'
    }
    newsListContainer.insertAdjacentHTML('beforeend', htmlString)    
};


/*
https://raw.githubusercontent.com/robinlxz/news_page_learning/master/json/web.json
*/

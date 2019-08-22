var btn = document.getElementById('btn');
var animalContainer = document.getElementById("animal-info")
let jsonPage = 1;
btn.addEventListener("click", function(){
    // var ourRequest = new XMLHttpRequest();
    // ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+jsonPage+'.json');

    /*As chrome forbid load local file, json is GET from github*/
    let ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/robinlxz/news_page_learning/master/json/test.json')
    
    jsonPage<=3 ? jsonPage++ : console.log("It's done.");
    if (jsonPage>3) {
        btn.classList.add("hide-me");
    }
    animalContainer.insertAdjacentHTML('beforeend', "<br><br>")  

    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText)
            console.log("first element in response data is:", ourData[0]);
            renderHTML(ourData);
        }
        else {
            animalContainer.insertAdjacentHTML('beforeend', "Ops, server returned error code: "+ourRequest.status)
        }
    };

    ourRequest.onerror = function () {
        animalContainer.insertAdjacentHTML('beforeend', "Ops, connection error")
    }

    ourRequest.send();
    
    // console.log(ourData)
});

var renderHTML = function(data){
    // let htmlString = "<strong>I'm a html string!</strong><br>";
    let htmlString = '';
    for (let i=0; i<data.length; i++) {
        htmlString +="<div>"
        // htmlString += "<li>" + data[i].name + " is a " + data[i].species + "</li>";
        // htmlString += "<li>" + data[i].name + " likes " + data[i].foods.likes[0] + "</li>";
        // htmlString += "<br>";
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + "that likes to eat ";
        for (let p=0; p<data[i].foods.likes.length; p++) {
            htmlString += "<li>" + data[i].foods.likes[p] + "</li>"
        }
        
        htmlString += "</p>" + "</div>";
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString)    
};


let modal = document.getElementById("results-modal");
let span = document.getElementsByClassName("close")[0];
let resultsContent = document.getElementById("results-list");
const searchInput = document.getElementById("blog-search-box");

searchInput.addEventListener("keydown", function(event) {
  if(event.key === "Enter") {
    event.preventDefault();

    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "/api/blog-search?query="+searchInput.value);
    oReq.send();

  }
});

span.onclick = function() {
  modal.style.display = "none";
  resultsContent.innerHTML = "";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function reqListener() {
  let resultList = JSON.parse(this.responseText).results;
  let resultsText = "";
  if(resultList.length === 0) {
    resultsText = `No results found for "${searchInput.value}"`;
  }
  for(var i=0; i<resultList.length; i++) {
    let r = resultList[i];
    let text = `
      <h4><a href=${r.url}>${r.title}</a></h4>
      <p>${r.content.substring(0,100)}...</p>
    `;
    resultsText += text;
  }
  resultsContent.innerHTML = resultsText;

  modal.style.display = "block";

}
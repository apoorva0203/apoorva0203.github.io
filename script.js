
var firstLink = "https://yahoo.com";
var createLinks = [];
for(i=0; i<20; i++){
  createLinks.push(firstLink);
}
function load(newLink){
  var initialLinks = createLinks;
    if(newLink !== ""){
      var newSet = [];
      var storedLinks = JSON.parse(localStorage.getItem("storedLinks"));
      if(storedLinks !== null){
        storedLinks.push(newLink);
        localStorage.setItem("url", newLink);
        localStorage.setItem("storedLinks", JSON.stringify(storedLinks));
        pushedLink();
      } else {
        initialLinks.push(newLink);
        localStorage.setItem("storedLinks", JSON.stringify(initialLinks));
        pushedLink();
      }
      
    }else {
      
      unpushedLink();
    }
    
    makeList();
    loadList();
    
}
function unpushedLink(){
  var initialLinks = createLinks;
  var local = localStorage.getItem("storedLinks");
  if(local !== null){
    updateList(JSON.parse(local));
  }else{
    updateList(initialLinks);
  }
  
    
}

function pushedLink(){
  var link = localStorage.getItem("storedLinks");
    updateList(JSON.parse(link));
}
function updateList(list){
  var updatedLinks = list;
    
    var buffer=[];
      for(var i=0; i < updatedLinks.length; i++){ 
        var item = updatedLinks[i]; 
        if(item !== undefined){
          buffer+=" <li class='urls'><a href='"+item+"' target='_blank'>"+item+"</a></li>"; 
      
        }
      } 
      $('#myList').html(buffer);
      
      
  }



function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function checkURL(){
  var bla = $('#overview').val();
  const url = document.getElementById("overview");
    if(validURL(bla) && isValidHttpUrl(bla)){
      
      $('#overview').addClass('success');
      $("#errorMessage").removeClass('displayMessage');
      $("#errorMessage").addClass('hideMessage');
      url.setCustomValidity("");
      document.getElementById("myForm").action = "./review.html";
      
      update();
    }else{
      $('#overview').addClass('error');

      $("#errorMessage").removeClass('hideMessage');
      $("#errorMessage").addClass('displayMessage');
      url.setCustomValidity("I am expecting an e-mail address!");
    }
}
function review(){
  var returnedUrl =localStorage.getItem('url');
  document.getElementById("reviewUrl").innerHTML = returnedUrl;
}
function returnButton(){
  window.history.back();
}
function update(){
    var bla = $('#overview').val();
    load(bla)
}
    var list = new Array();
    var pageList = new Array();
    var currentPage = 1;
    var numberPerPage = 20;
    var numberOfPages = 0;

function makeList() {
    var initialLinks = createLinks;
  var local = localStorage.getItem("storedLinks");
  if(local !== null){
    list = JSON.parse(local);
  }else{
    list = initialLinks;
  }
    numberOfPages = getNumberOfPages();
}
    
function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();
    check();
}
    
function drawList() {
    document.getElementById("myList").innerHTML = "";
    for (r = 0; r < pageList.length; r++) {
        document.getElementById("myList").innerHTML += "<li class='urls'><a href='"+pageList[r]+"' target='_blank'>"+pageList[r]+"</a></li> ";
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}


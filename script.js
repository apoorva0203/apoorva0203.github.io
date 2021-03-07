
var firstLink = "https://yahoo.com";
var createLinks = [];
var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 20;
var numberOfPages = 0;
// create a default array with 20 links
for(i=0; i<20; i++){
  createLinks.push(firstLink);
}

//This function checks for the localStorage for any data and if not loads the default array
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
// This function creates the first storage 
function unpushedLink(){
  var initialLinks = createLinks;
  var local = localStorage.getItem("storedLinks");
  if(local !== null){
    updateList(JSON.parse(local));
  }else{
    updateList(initialLinks);
  }
  
    
}
// This function loads the storage
function pushedLink(){
  var link = localStorage.getItem("storedLinks");
    updateList(JSON.parse(link));
}
// This function creates the lists dynamically
function updateList(list){
  var updatedLinks = list;
    
    var buffer=[];
      for(var i=0; i < updatedLinks.length; i++){ 
        var item = updatedLinks[i]; 
        if(item !== undefined){
          buffer+="<li class='urls'><span class='material-icons md-16 edit' data-toggle='modal' data-target='#myModal' onClick='editUrl("+i+")'>edit</span><a href='"+item+"' target='_blank'>"+item+"</a><span class='material-icons md-16 edit' data-toggle='modal' data-target='#myModal1' onClick='deleteUrl("+i+")'>delete</span></li>";
        }
      } 
      $('#myList').html(buffer);
      
      
  }
// regex pattern to check URl
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
// check if URL exists
function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
//Load Url from input and check validity, validation.
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
      url.setCustomValidity("I am expecting an URL!");
    }
}
//Set the entered Url to the Thank you page
function review(){
  var returnedUrl =localStorage.getItem('url');
  document.getElementById("reviewUrl").innerHTML = returnedUrl;
}
// Back to main
function returnButton(){
  window.history.back();
}
// Function to run when page loads
function update(){
    var bla = $('#overview').val();
    load(bla)
}

function edit(){

}
    
//Pagination
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
        document.getElementById("myList").innerHTML += "<li class='urls'><span class='material-icons md-16 edit' data-toggle='modal' data-target='#myModal' onClick='editUrl("+r+")'>edit</span><a href='"+pageList[r]+"' id='link"+r+"' target='_blank'>"+pageList[r]+"</a><span class='material-icons md-16 edit' data-toggle='modal' data-target='#myModal1' onClick='deleteUrl("+r+")'>delete</span></li> ";
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

function editUrl(r) { 
    var id = "#link" + r;
    var inputUrl = $(id).prop('href');
    sessionStorage.setItem('id',r);
    setTimeout(function(){$("#editUrl").val(inputUrl);}, 1000);
};
function deleteUrl(r){
    var id = "#link" + r;
    var inputUrl = $(id).prop('href');
    sessionStorage.setItem('deleteId',r);
    setTimeout(function(){$("#deleteUrls").text(inputUrl);}, 1000);
}
function deleteAndUpdateUrl(){
  var oldUrls = JSON.parse(localStorage.getItem("storedLinks"));
  var position = parseInt(sessionStorage.getItem('deleteId'));
  if(oldUrls !== null){
    for (var i = 0; i < oldUrls.length; i++) {
      if (i === position) {
        oldUrls.splice(i, 1);
        localStorage.setItem("storedLinks", JSON.stringify(oldUrls));
        update();
        break;
      }
    }
  } else{
    for (var i = 0; i < createLinks.length; i++) {
      if (i === position) {
        createLinks.splice(index, i);
        localStorage.setItem("storedLinks", JSON.stringify(createLinks));
        update();
        break;
      }
  }
}
}

function updateUrl(){
  var oldUrls = JSON.parse(localStorage.getItem("storedLinks"));
  var position = parseInt(sessionStorage.getItem('id'));
  var newUrl = $("#editUrl").val();
  if(oldUrls !== null){
    for (var i = 0; i < oldUrls.length; i++) {
      if (i === position) {
        oldUrls[i] = newUrl;
        localStorage.setItem("storedLinks", JSON.stringify(oldUrls));
        break;
      }
    }
  } else{
    for (var i = 0; i < createLinks.length; i++) {
      if (i === position) {
        createLinks[i] = newUrl;
        localStorage.setItem("storedLinks", JSON.stringify(createLinks));
        break;
      }
  }
  
}

  pushedLink();
}


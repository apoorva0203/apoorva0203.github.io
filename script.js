

function load(newLink){
  var initialLinks = ["yahoo.com","yahoo.com","yahoo.com", "yahoo.com","yahoo.com" ];
    if(newLink !== ""){
      var newSet = [];
      var storedLinks = JSON.parse(localStorage.getItem("storedLinks"));
      if(storedLinks !== null){
        storedLinks.push(newLink);
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
    
    
    
}
function unpushedLink(){
  var initialLinks = ["yahoo.com","yahoo.com","yahoo.com", "yahoo.com","yahoo.com" ];
  var local = localStorage.getItem("storedLinks");
  if(local !== null){
    updateList(JSON.parse(local));
  }else{
    updateList(initialLinks);
  }
  
    
}

function pushedLink(){
  var link = localstorage.getItem("storedLinks");
    updateList(JSON.parse(link));
}
function updateList(list){
  var updatedLinks = list;
    
    var buffer=[];
      for(var i=0; i < updatedLinks.length; i++){ 
        var item = updatedLinks[i]; 
        if(item !== undefined){
          buffer+=" <li><a href='"+item+"' target='_blank'>"+item+"</a></li>"; 
      
        }
      } 
      $('ul').html(buffer);
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
      update();
    }else{
      $('#overview').addClass('error');

      $("#errorMessage").removeClass('hideMessage');
      $("#errorMessage").addClass('displayMessage');
      url.setCustomValidity("I am expecting an e-mail address!");
    }
}

function update(){
    var bla = $('#overview').val();
    load(bla)
}
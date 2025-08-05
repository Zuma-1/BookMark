var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addSite");
var regexOfUrl = /^(http:\/\/|https:\/\/)(www\.|)[A-Za-z0-9]{5,}(.com\/|.app\/|.org\/|.net\/)$/;
var alertDn = document.querySelector(".alert-danger");
var alertSc = document.querySelector(".alert-success");
var dark = document.querySelector("i");
var sitesList;

if(localStorage.getItem("siteList")){
sitesList = JSON.parse(localStorage.getItem("siteList"));
displayOfSite();
}else{
sitesList = [];
}

var counter = 0;
function addSite(){
if(regexOfUrl.test(siteUrl.value) == true){
var site = {
websiteName : siteName.value ,
websiteUrl : siteUrl.value ,
count : ++counter,
}

sitesList.push(site);
console.log(sitesList);
alertDn.classList.replace("d-block" , "d-none");
alertSc.classList.replace("d-none","d-block");
saveToLocalStorage();
}else{
alertDn.classList.replace("d-none" , "d-block");
alertSc.classList.replace("d-block","d-none");
}


}


addBtn.addEventListener("click" ,function(){
addSite();
 displayOfSite();
siteName.value = null;
siteUrl.value = null;
})


function displayOfSite(){
var cartona = "";
for(let iter in sitesList){
cartona += `
  <tr>
                <td>${sitesList[iter].count}</td>
                <td>${sitesList[iter].websiteName}</td>
                <td><button class="btn btn-success" onclick="visitSite(${iter})">Visit</button></td>
                <td><button class="btn btn-danger" onclick="deleteSite(${iter})">Delete</button></td>
            </tr>
`;
}
document.querySelector("tbody").innerHTML = cartona;
saveToLocalStorage();

}


function visitSite(i){
window.open(sitesList[i].websiteUrl,"_blank");
}


function deleteSite(i){
sitesList.splice(i,1);
displayOfSite();
saveToLocalStorage()
}

// localStorage.clear()

function saveToLocalStorage(){
localStorage.setItem("siteList",JSON.stringify(sitesList));
}





dark.addEventListener("click" , function(){
if(!document.body.classList.contains("bg-secondary")){
document.body.classList.remove("bg-white");
document.body.classList.add("bg-secondary");
localStorage.setItem("theme" , "dark")
}else if(document.body.classList.contains("bg-secondary")){
document.body.classList.add("bg-white");
document.body.classList.remove("bg-secondary");
localStorage.setItem("theme","light");
}
})


if(localStorage.getItem("theme")=="light"){
document.body.classList.add("bg-white");
}else if(localStorage.getItem("theme") == "dark"){
document.body.classList.add("bg-secondary")
}



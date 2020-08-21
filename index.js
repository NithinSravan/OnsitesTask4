let nameInp=document.getElementsByClassName("nameInp");
let rollNumInp=document.getElementsByClassName("rollNumInp");
let updateInp=document.getElementById("updateInp");
let searchInp=document.getElementById("searchInp");

window.addEventListener("load",getStudents)

function create(){
    let xhttp = new XMLHttpRequest();

    xhttp.onload=function(){
        nameInp[0].value="";
        rollNumInp[0].value="";
        getStudents()
    }
    
    const name=nameInp[0].value;
    const rollNum=rollNumInp[0].value;
    const data={
        name,
        rollNum
    }
    xhttp.open("POST", "/create", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}
function getStudents(){
    let xhttp = new XMLHttpRequest();
    let parsedRes;
     xhttp.onreadystatechange = function() {
    
          if (this.readyState == 4 && this.status == 201) {
              parsedRes=JSON.parse(this.responseText)
              studList(parsedRes)
          }
        };
    xhttp.open("GET", "/students", true);
    xhttp.send();
}
function deleteStud(rollNum){
    let xhttp = new XMLHttpRequest();
    console.log("front")
     xhttp.onreadystatechange = function() {
    
          if (this.readyState == 4 && this.status == 201) {
              console.log(this.responseText)
              getStudents()
          }
          
        };
    xhttp.open("DELETE", "/delete/"+rollNum, true);
    xhttp.send();
}
let tempRoll;
function getUpdateForm(){
    document.getElementById("update").style.display="flex";
    let xhttp = new XMLHttpRequest();
    let parsedRes;
     xhttp.onreadystatechange = function() {
         updateInp.value="";
          if (this.readyState == 4 && this.status == 201) {
              parsedRes=JSON.parse(this.responseText)
              nameInp[1].value=parsedRes.name;
              rollNumInp[1].value=parsedRes.rollNum;
          }
        };
    tempRoll=updateInp.value;
    xhttp.open("GET", "/student/"+updateInp.value, true);
    xhttp.send();
}
function update(){
    let xhttp = new XMLHttpRequest();
   
     xhttp.onload= function() { 
            document.getElementById("update").style.display="none";
            getStudents()
        };
        const name=nameInp[1].value;
        const rollNum=rollNumInp[1].value;
        const data={
            name,
            rollNum
        }
        console.log(data)
    xhttp.open("PUT", "/update/"+tempRoll, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}
function studList(arr){
    if(document.getElementById('box').innerHTML!==null){
        document.getElementById('box').innerHTML=""
    }
    for(let i=0;i<arr.length;i++){
        const Div=document.createElement('div');
        const nameSpan=document.createElement('div');
        const rollNumSpan=document.createElement('div');
        const deletebtn=document.createElement('button');
        document.getElementById('box').appendChild(Div);
        Div.appendChild(nameSpan);
        Div.appendChild(rollNumSpan);
        Div.appendChild(deletebtn);
        nameSpan.innerText =arr[i].name;
        rollNumSpan.innerText =arr[i].rollNum;
        deletebtn.innerText="Delete";
        deletebtn.addEventListener("click",()=>{
            let roll=arr[i].rollNum;
            deleteStud(roll)
        });
    }
}
function autoComplete(){
    let xhttp = new XMLHttpRequest();
    xhttp.onload=function(){
        parsedRes=JSON.parse(this.responseText)
        studList(parsedRes)
    }
    const data=searchInp.value;
    const searchData={
        data
    }
    xhttp.open("POST", "/autocomplete", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(searchData));
}
// function search(){

// }
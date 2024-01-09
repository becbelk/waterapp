

// console.log('page', page, 'save', index);

//const { relative } = require("path");

//alert('helloo')
const baseUrl = 'http://localhost:6734';
// @ip of the server
//const baseUrl = 'http://192.168.1.185:6734';



// //===============
// document.addEventListener('DOMContentLoader',()=>{
//     document.querySelector('body').addEventListener('click',removeRow);
// });
const saveElement = (e) => {
    //display(e);
    console.log('e.parentElement=',e.parentElement,)
    setButoonGreen(e);
//    removeRow(e);

    const _consumer = {
        "periode": "2022",//todo: the year should be gotten from ui
        "no": e.parentElement.children[0].children[0].innerHTML.trim(),
        "name": e.parentElement.children[0].children[1].value.trim(),
        "address": e.parentElement.children[0].children[3].value.trim(),
        "watermeterId": e.parentElement.children[0].children[5].value.trim(),
        "oldConsumption": e.parentElement.children[1].children[1].value.trim(),
        "newConsumption": e.parentElement.children[1].children[3].value.trim(),
        "isFlatRated": e.parentElement.children[1].children[5].checked,
    }
    console.log('_consumer=',_consumer,)
    if (_consumer.isFlatRated) {
        _consumer.oldConsumption = 0;
        _consumer.newConsumption = 0;

    }

    let xhr = new XMLHttpRequest();

    let req = xhr.open('POST', baseUrl + '/saveRow', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    //    console.log('try to sending element to save in db:', _consumer);
    xhr.send(JSON.stringify(_consumer));

    //let confirmation = xhr.open('POST', baseUrl + '/saveRow', true);
}

const setButoonGreen = (elt) => {
    console.log(elt.parentElement.parentElement)
    elt.setAttribute("class", "col-1  btn btn-success fw-bold");
    elt.setAttribute("icon","fa fa-home");
  //  e.setAttribute("value","&#9745;");
}
const display = (e) => {
    console.log('this =', e)
    console.log('this.getAttribute(id)', e.getAttribute(id))
    console.log('saveElement');
    console.log('0=', e.parentElement.children[0].children[0].children[0].innerHTML)
    console.log('1=', e.parentElement.children[0].children[0].children[1].value)
    console.log('3=', e.parentElement.children[0].children[0].children[3].value)
    console.log('3-- =', e.parentElement.children[1].children[0].children[1].value)
    console.log('4=', e.parentElement.children[1].children[0].children[3].value)
    console.log('4=', e.parentElement.children[1].children[0].children[5].checked)
}
function removeRow(event){
    console.log('remove=========================',event);
    let body=event.currentTarget;
    let row=event.target.closest(".p-1");
    console.log('++++++ row=',row)
    row?.remove()
}



const setPage = (index) => {
    setCookie("page", index)
    console.log(document.cookie)
    //  document.getElementById("pageNo").value = index;

    let btn = document.getElementById("sender");
    console.log('bt=n', btn)
    btn.click()
}

const saveSearchZone = () => {
    let searchTerm = document.getElementById("searchTerm").value;
    if (searchTerm) {
        console.log('set cookies')
        console.log('saveSearchZone', document.getElementById("searchTerm").value)
        setCookie("searchTerm", document.getElementById("searchTerm").value, 2)//2 days
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(cName, cValue, expDays) {

    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + encodeURIComponent(cValue) + "; " + expires + "; path=/";
    if (!cValue) { document.getElementById("sender").click(); }
}
























/*
const onNext = (e, page,searchTerm) => {
    let xhr = new XMLHttpRequest();
    let req = xhr.open('POST', baseUrl + '/editList', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    console.log('next page :',  page,searchTerm);
    xhr.send(JSON.stringify({page,searchTerm}));
}

const onPrevious = (e, page,searchTerm) => {
    let xhr = new XMLHttpRequest();
    let req = xhr.open('POST', baseUrl + '/editList', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    console.log('previous page :', page,searchTerm);
    xhr.send(JSON.stringify({page,searchTerm}));
}
*/


//this function get page from the html page edit list
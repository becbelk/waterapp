
/**
 * هذه الدالة تقوم بتحميل عناصر البحث الاتية من السيرفر
 */


;$(window).on('load',function(event){
    let queryString=this.location.search;
    let urlParams=new URLSearchParams(queryString)
    console.log('queryString =',queryString)
    console.log('urlParams =',urlParams)
    let searchTerm=urlParams.get('searchTerm')
    let isSaved=urlParams.get('isSaved')
    console.log('searchTerm =',searchTerm)
    console.log('isSaved =',isSaved)
 $('#searchTerm').prop('value',searchTerm);
 $('#checkBoxIsSaved').prop('checked',isSaved==='saved');
 $('#checkBoxIsSavedLabel').prop('innerText',isSaved==='saved'? 'المحينين' :'في الانتظار');
//console.log('inputSearch =',inputSearch)
});





const baseUrl = 'http://localhost:6734';
$('#view-one-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var stringData = button.data('consumer') // Extract info from data-* attributes
    updatedStringData = stringData.replace(/'/g, '"')
    console.log('string =', updatedStringData)
    let jsonData = JSON.parse(updatedStringData)
    console.log('_jsonData=', jsonData)
    //let fields=_json.split('@');
    var modal = $(this)
    let bg = jsonData.isFlatRated ? "modal-content bg-warning" : "modal-content bg-info";
    console.log('bg=', bg)
    modal.find('#content-modal').prop('class', bg)

    modal.find('input[name="no"]').prop('value', jsonData.no);
    modal.find('input[name="name"]').prop('value', jsonData.name);
    modal.find('input[name="address"]').prop('value', jsonData.address);
    modal.find('input[name="oldConsumption"]').prop('value', jsonData.oldConsumption);
    modal.find('input[name="newConsumption"]').prop('value', jsonData.newConsumption);
    modal.find('input[name="isFlatRated"]').prop('checked', jsonData.isFlatRated);
    modal.find('input[name="watermeterId"]').prop('value', jsonData.watermeterId);
    //modal.find('.modal-body input').val(_json)
});
$('#save-btn').on('click', function (event) {
    var modal = $(this.parentElement.parentElement)

    let consumer = {
        no: modal.find('input[name="no"]').val(),
        name: modal.find('input[name="name"]').val(),
        address: modal.find('input[name="address"]').val(),
        oldConsumption: modal.find('input[name="oldConsumption"]').val(),
        newConsumption: modal.find('input[name="newConsumption"]').val(),
        watermeterId: modal.find('input[name="watermeterId"]').val(),
        isFlatRated: modal.find('input[name="isFlatRated"]').is(':checked'),
    }
    console.log('consumer=', consumer)
    let xhr = new XMLHttpRequest();

    let req = xhr.open('POST', baseUrl + '/save-row', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    // //    console.log('try to sending element to save in db:', _consumer);
    xhr.send(JSON.stringify(consumer));
    $('#view-one-modal').modal('toggle');
    location.reload()

})
$('#delete-btn').on('click', function (event) {
    var modal = $(this.parentElement.parentElement)
    let _no = modal.find('input[name="no"]').val();
    console.log("no=", _no)
    let jqxhr = $.post(baseUrl + '/delete', { no: _no }, () => { console.log('sent') }, "json");
    $('#delete-one-modal').modal('toggle');
    location.reload()

})
$('#checkBoxIsSaved').on('change', function (event) {
    let chkbx = $(this);
    let parent = $(this.parentElement).find('#checkBoxIsSavedLabel');
    parent.text(chkbx.is(':checked') ? 'المحينين' : 'في الانتظار')
    this.value = chkbx.is(':checked') ? 'saved' : 'not-saved';
    //let searchTerm = parent.find('#searchTerm');
});

$('#new-one-modal').on('show.bs.modal', function (event) {
    var modal = $(this.parentElement.parentElement)
    modal.find('input[name="name"]').prop('value', "");
    modal.find('input[name="address"]').prop('value', "");
    modal.find('input[name="oldConsumption"]').prop('value', "");
    modal.find('input[name="newConsumption"]').prop('value', "");
    modal.find('input[name="watermeterId"]').prop('value', "");
    var button = $(event.relatedTarget) // Button that triggered the modal
    var stringData = button.data('consumer') // Extract info from data-* attributes
    updatedStringData = stringData.replace(/'/g, '"')
    let jqxhr = $.get(baseUrl + '/get-counter', (data) => {
        modal.find('input[name="no"]').prop('value', Number(data.no) + 1);

    })
    console.log('string =', updatedStringData)
});


$('#delete-one-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var stringData = button.data('consumer') // Extract info from data-* attributes
    updatedStringData = stringData.replace(/'/g, '"')
    console.log('string =', updatedStringData)
    let jsonData = JSON.parse(updatedStringData)
    console.log('_jsonData=', jsonData)

    var modal = $(this)


    modal.find("#no-delete").prop('value', jsonData.no);
    modal.find('input[name="name"]').prop('value', jsonData.name);
    modal.find('input[name="address"]').prop('value', jsonData.address);
    modal.find('input[name="oldConsumption"]').prop('value', jsonData.oldConsumption);
    modal.find('input[name="newConsumption"]').prop('value', jsonData.newConsumption);

    modal.find('input[name="watermeterId"]').prop('value', jsonData.watermeterId);
});

$('#new-btn').on('click', function (event) {
    var modal = $(this.parentElement.parentElement)
    let consumer = {
        no: modal.find('input[name="no"]').val(),
        name: modal.find('input[name="name"]').val(),
        address: modal.find('input[name="address"]').val(),
        oldConsumption: modal.find('input[name="oldConsumption"]').val(),
        newConsumption: modal.find('input[name="newConsumption"]').val(),
        watermeterId: modal.find('input[name="watermeterId"]').val(),
        isFlatRated: modal.find('input[name="isFlatRated"]').is(':checked'),
    }
    let xhr = new XMLHttpRequest();
    let req = xhr.open('GET', baseUrl + '/get-counter', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send();//get the autoinc counter  //todo : double travail


    console.log('consumer=', consumer)

    req = xhr.open('POST', baseUrl + '/new', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    // //    console.log('try to sending element to save in db:', _consumer);
    xhr.send(JSON.stringify(consumer));
    $('#new-one-modal').modal('toggle');
    location.reload()
})



/*
$('#sender').on('click', function (event) {
    let form = $(this.parentElement)
    console.log('sender grand parent find searchterm =====***',form.find('input[name="searchTerm"]'))
    console.log('sender grand parent find isFlatRated =====***',form.find('input[name="isFlatRated"]'))
    let body={
        searchTerm:form.find('input[name="no"]').val(),
        isSaved:form.find ('input[name="isFlatRated"]').is(':checked'),
    }
    let xhr = new XMLHttpRequest();

    let req = xhr.open('POST', baseUrl + '/search', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    console.log('try to sending element to save in db:', body);
    xhr.send(JSON.stringify(body));
    console.log("submitted")
})






*/


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





//const baseUrl = 'http://192.168.1.185:6734';
// document.addEventListener('DOMContentLoader',()=>{
//     document.querySelector('body').addEventListener('click',removeRow);
// });
// const saveElement = (e) => {
//     setButoonGreen(e);
//     //    removeRow(e);

//     const _consumer = {
//         "periode": "2022",//todo: the year should be gotten from ui
//         "no": e.parentElement.children[0].children[0].innerHTML.trim(),
//         "name": e.parentElement.children[0].children[1].value.trim(),
//         "address": e.parentElement.children[0].children[3].value.trim(),
//         "watermeterId": e.parentElement.children[0].children[5].value.trim(),
//         "oldConsumption": e.parentElement.children[1].children[1].value.trim(),
//         "newConsumption": e.parentElement.children[1].children[3].value.trim(),
//         "isFlatRated": e.parentElement.children[1].children[5].checked,
//     }
//     console.log('_consumer=', _consumer,)
//     if (_consumer.isFlatRated) {
//         _consumer.oldConsumption = 0;
//         _consumer.newConsumption = 0;

//     }

//     let xhr = new XMLHttpRequest();

//     let req = xhr.open('POST', baseUrl + '/save-row', true);
//     xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
//     //    console.log('try to sending element to save in db:', _consumer);
//     xhr.send(JSON.stringify(_consumer));

//     //let confirmation = xhr.open('POST', baseUrl + '/saveRow', true);
// }

// const setButoonGreen = (elt) => {
//     console.log(elt.parentElement.parentElement)
//     elt.setAttribute("class", "col-1  btn btn-success fw-bold");
//     elt.setAttribute("icon", "fa fa-home");
//     //  e.setAttribute("value","&#9745;");
// }
// const display = (e) => {
//     console.log('this =', e)
//     console.log('this.getAttribute(id)', e.getAttribute(id))
//     console.log('saveElement');
//     console.log('0=', e.parentElement.children[0].children[0].children[0].innerHTML)
//     console.log('1=', e.parentElement.children[0].children[0].children[1].value)
//     console.log('3=', e.parentElement.children[0].children[0].children[3].value)
//     console.log('3-- =', e.parentElement.children[1].children[0].children[1].value)
//     console.log('4=', e.parentElement.children[1].children[0].children[3].value)
//     console.log('4=', e.parentElement.children[1].children[0].children[5].checked)
// }
// function removeRow(event) {
//     console.log('remove=========================', event);
//     let body = event.currentTarget;
//     let row = event.target.closest(".p-1");
//     console.log('++++++ row=', row)
//     row?.remove()
// }



// const setPage = (index) => {
//     setCookie("page", index)
//     console.log(document.cookie)
//     //  document.getElementById("pageNo").value = index;

//     let btn = document.getElementById("sender");
//     console.log('bt=n', btn)
//     btn.click()
// }

// const saveSearchZone = () => {
//     let searchTerm = document.getElementById("searchTerm").value;
//     if (searchTerm) {
//         console.log('set cookies')
//         console.log('saveSearchZone', document.getElementById("searchTerm").value)
//         setCookie("searchTerm", document.getElementById("searchTerm").value, 2)//2 days
//     }
// }

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }

// function setCookie(cName, cValue, expDays) {

//     let date = new Date();
//     date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + date.toUTCString();
//     document.cookie = cName + "=" + encodeURIComponent(cValue) + "; " + expires + "; path=/";
//     if (!cValue) { document.getElementById("sender").click(); }
// }
// function confirm() {
//     let password = prompt("سيتم الحذف، هل أنت متأكد؟")
//     if (password == 'yes') {//todo: password confirmation
//         let xhr = new XMLHttpRequest();
//         let no = document.getElementById("no").innerHTML;//no عنصر من عناصر الصفحة
//         let req = xhr.open('POST', baseUrl + '/delete', true);
//         xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
//         // //    console.log('try to sending element to save in db:', _consumer);
//         xhr.send(JSON.stringify({ no: no }));

//         console.log("delete")
//     }
//     else {
//         console.log('cancel')
//     }
// }

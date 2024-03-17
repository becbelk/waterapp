
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
    updatedStringData = stringData.replace(/'/g, '"').replace(/\s+/g, ' ')
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
    modal.find('input[name="isTaxed"]').prop('checked', jsonData.isTaxed);
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
        isTaxed: modal.find('input[name="isTaxed"]').is(':checked'),
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
        isTaxed: modal.find('input[name="isTaxed"]').is(':checked'),
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


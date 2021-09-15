function generateUserTable(data){
    let idx = 0;
    let tbody = document.getElementById('users').querySelector('tbody');
    tbody.innerHTML = '';
    for(idx = 0; idx < data.length; idx++){ //membuat row ke table html sebanyak jumlah data yang diperoleh
        let colID = '<td>'+data[idx].id+'</td>'; // membuat kolom ID
        let colName = '<td>' +data[idx].name+'</td>'; //membuat kolom nama
        let colEmail = '<td>' +data[idx].email+'</td>'; //membuat kolom email
        let colCompanyName = '<td>' +data[idx].company.name+'</td>'; //membuat kolom nama perusahaan
        let btnShowPost = '<td><button class="button-post" userId=' +data[idx].id
                        +' onclick ="loadPosts('+data[idx].id
                        +')">show Posts</button></td>'; // membuat tombol untuk menampilkan post user
        // membuat row sejumlah kolom yang ingin ditampilkan
        let newRow = '<tr>'+colID+colName+colEmail+colCompanyName+btnShowPost+'</tr>';
        tbody.innerHTML += newRow; // meng-append row ke dalam tbody
    }
}
function loadUserData(){
    let request = new XMLHttpRequest(); // membuat objek XMLHttpRequest
    let url = 'https://jsonplaceholder.typicode.com/users'; // URL berisi data users berbentuk JSON
    request.open('GET', url, true); // Open request dengan method GET ke server secara asinkron

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){ // memastikan status request "OK"
            // mem-parse data menjadi Javascript object dan ditampung ke variabel dengan nama 'data'
            let data = JSON.parse(request.responseText);
            //console.log(data); // menampilkan data yang didapat
            generateUserTable(data);
        }
        else{
            alert('Page Not Found');
        }
    }
    request.onerror = function(){
        alert('Request Failed! Check your internet connection');
    }
    request.send();
}
function onDocumentFinish(){
    loadUserData();
}
function showPosts(data){
    let idx = 0;
    let tbody = document.getElementById('user-posts').querySelector('tbody');
    tbody.innerHTML = '';
    for(idx = 0; idx < data.length; idx++){ // membuat row dengan kolom yang diinginkan
        let colID = '<td>'+data[idx].id+'</td>';
        let colbody = '<td>'+data[idx].body+'</td>';
        let btnShowComments = '<td><button class="button-comments" postId='+data[idx].id
        +' on click= "loadComments('+data[idx].id 
        + ')">Show Comments</button></td>'; // tombol untuk menampilkan comment pada post yang dipilih
        let newRow = '<tr>'+colID+colTitle+colBody+btnShowComments+'</tr>';
        tbody.innerHTML += newRow; // append row ke tbody
    }
}
function loadPosts(id){
    let request = new XMLHttpRequest();
    let url = 'https://jsonplaceholder.typicode.com/posts/?userId='+id; // url dengan parameter userId
    request.open('GET', url, true); // Open Request

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let data = JSON.parse(request.responseText); // parse JSON menjadi Object
            showPosts(data);
        }
        else{
            alert('Page Not Found');
        }
    }
    request.onerror = function(){
        alert('Request Failed! Check your internet connection');
    }
    request.send(); //mengirim request
}
function generateUserTable(data){
    let idx = 0;
    let tbody = document.getElementById('users').querySelector('tbody');
    tbody.innerHTML = '';
    for(idx = 0; idx < data.length; idx++){ //membuat row ke table html sebanyak jumlah data yang diperoleh
        let colID = '<td>'+data[idx].id+'</td>'; // membuat kolom ID
        let colName = '<td>' +data[idx].name+'</td>'; //membuat kolom nama
        let colEmail = '<td>' +data[idx].email+'</td>'; //membuat kolom email
        let colCompanyName = '<td>' +data[idx].company.name+'</td>'; //membuat kolom nama perusahaan
        let btnShowPost = '<td><button class="button-posts" userId='+data[idx].id+' onclick ="loadPosts('+data[idx].id+')">Show Posts</button></td>'; // membuat tombol untuk menampilkan post user
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
    let div = document.getElementById('user-posts').querySelector('div');
    div.innerHTML = '';
    for(idx = 0; idx < data.length; idx++){ // membuat row dengan kolom yang diinginkan
        let colTitle = '<h2> Title : '+data[idx].title+'</h2>';
        let colBody = '<p>...'+data[idx].body+'</p>';
        let btnShowComments = '<div><button class="button-comments" id="btncomments'+data[idx].id+'" postId='+data[idx].id+' onclick= "loadComments('+data[idx].id+')">Show Comments</button></div>'; // tombol untuk menampilkan comment pada post yang dipilih
        let newRow = '<div class="card">'+colTitle+colBody+btnShowComments+'</div>';
        div.innerHTML += newRow; // append row ke div
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
function showComments(data){
    let idx = 0;
    let x = data[idx].postId;
    let div = document.getElementById('user-posts').querySelector("[postId='"+x+"']");
    div.innerHTML = '';
    for(idx = 0; idx < data.length; idx++){
        let colName = '<b>'+data[idx].name+'</b>';
        let colEmail = '('+data[idx].email+')';
        let colBody = 'commented :"<i>'+data[idx].body+'</i>"';
        let newRow = '<div class="cards comments">'+colName+' '+colEmail+' '+colBody+'</div>';
        div.innerHTML += newRow;
    }
}
function loadComments(id){
    let request = new XMLHttpRequest();
    let url= 'https://jsonplaceholder.typicode.com/comments/?postId='+id;
    request.open('GET', url, true);

    request.onload = function(){
        if(request.status >= 200 && request.status <400){
            let data = JSON.parse(request.responseText);
            showComments(data);
        }
        else{
            alert('Page Not Found');
        }
    }
    request.onerror = function(){
        alert('Request Failed! Check your internet connection');
    }

    var x = document.getElementById("btncomments"+id);
	x.style.backgroundColor = "white";
	x.style.color = "black";
	x.style.outlineStyle = "none";
	x.style.cursor = "default";

    request.send();
}
// link input
let btn_live_walllpaper = document.querySelector('#submit-live-wallpaper'); 
let inputWallpaper = document.getElementById('input-link');
// database
let btn_database = document.querySelector('#database-button');
let list_database = document.querySelector('#database');

function menambahGambar() {
    const gambar = inputWallpaper.value.trim();

    if (gambar) {
        buatGambarElement(gambar);
        inputWallpaper.value = ' ';
    } else {
        alert("please enter url");
    }
}

function  buatGambarElement(gambar) {
    const listGambar = document.createElement('li');
    const tagGambar = document.createElement('img'); 

    tagGambar.src = gambar;                       
    tagGambar.alt = "Wallpaper";                     
    tagGambar.style.width = "100px";                 

    listGambar.appendChild(tagGambar);               
    list_database.appendChild(listGambar);           
}

btn_live_walllpaper.addEventListener('click',() => {
    let imageUrl = inputWallpaper.value;
    if (imageUrl) {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    } else {
        alert("cari walpaper terlebih dahulu")
    }
});

btn_database.addEventListener('click', menambahGambar)


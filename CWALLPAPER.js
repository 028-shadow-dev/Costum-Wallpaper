let btn_database = document.querySelector('#database');
let btn_live_walllpaper = document.querySelector('#submit-live-wallpaper'); 
let live_wallpaper = document.getElementById('input-link');

btn_live_walllpaper.addEventListener('click',() => {
    let imageUrl = live_wallpaper.value;
    if (imageUrl) {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    } else {
        alert("cari walpaper terlebih dahulu")
    }
});
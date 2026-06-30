// link input
const btn_live_walllpaper = document.querySelector('#submit-live-wallpaper'); 
const inputWallpaper = document.getElementById('input-link');
// database
const btn_database = document.querySelector('#database-button');
const list_database = document.querySelector('#database');
const search_database = document.getElementById('search-database');
// setting
const setting = document.getElementById('setting');


setting.addEventListener('click', () => { 
    let visibleFooterSetting = document.getElementById('footerhide');
    if (visibleFooterSetting.style.visibility === "hidden" || visibleFooterSetting.style.visibility === "") {
        visibleFooterSetting.style.visibility = "visible";
    } else {
        visibleFooterSetting.style.visibility = "hidden";
    }
});

let keyNumbers = 1;
btn_database.addEventListener('click', () => {
    const linkSave = inputWallpaper.value.trim();
    if (!linkSave) {
        alert("cari walpaper terlebih dahulu");
        return;
    }

    keyNumbers += 1;
    let newKey = `link_${keyNumbers}`;
    localStorage.setItem(newKey, linkSave);
    alert(`link sudah tersave sebagai no ${newKey}`);
});

let numberOFdatabase = "";
search_database.addEventListener('click', () => {
    let userInputWallpaper = prompt("pilih no brp wallpapermu");
    let targetKey = `link_${userInputWallpaper}`; 
    let savedWallpaperUrl = localStorage.getItem(targetKey);

    if (savedWallpaperUrl) {
        localStorage.setItem("userWallpaper", targetKey);
        document.body.style.backgroundImage = `url(${savedWallpaperUrl})`;
    } else {
        alert("Nomor wallpaper tidak ditemukan!");
    }
});

let activeKey = localStorage.getItem("userWallpaper"); 

let bgNoRefresh = localStorage.getItem(activeKey);
if (bgNoRefresh) {
    document.body.style.backgroundImage = `url('${bgNoRefresh}')`;
}

btn_live_walllpaper.addEventListener('click',() => {
    let linkGambar = inputWallpaper.value.trim();

    if (linkGambar) {
        document.body.style.backgroundImage = `url('${linkGambar}')`;
    } else {
        alert("cari walpaper terlebih dahulu")
    }
});



// Date (year, month, day, hour, minute, ms)
function UpdateJam() {
    const monthH = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

    const jam = document.getElementById('jam-sekarang');
    const date = new Date();
    date.toLocaleDateString('id-ID');
    const year = date.getFullYear();
    const monthN = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ms = date.getSeconds();

    const htmlKonten = `
        <h1>${hour}:${minute}</h1>
        <h3>${year},${monthH[monthN]} ${day} </h3>
    `
    jam.innerHTML = htmlKonten;
}
setInterval(UpdateJam, 1000);
UpdateJam();
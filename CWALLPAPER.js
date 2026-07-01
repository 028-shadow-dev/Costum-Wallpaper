// link input
const btn_live_walllpaper = document.querySelector('#submit-live-wallpaper'); 
const inputWallpaper = document.getElementById('input-link');
// database
const btn_database = document.querySelector('#database-button');
const list_database = document.querySelector('#database');
const search_database = document.getElementById('search-database');
// setting
const setting = document.getElementById('setting');
const footer_setting = document.getElementById('footer-setting');
const setting_blur = document.getElementById('setting-blur');
const setting_cover_fit = document.getElementById('setting-cover-fit');


setting.addEventListener('click', () => { 
    let visibleSetting = document.getElementById('footerhide');
    if (visibleSetting.style.visibility === "hidden" || visibleSetting.style.visibility === "") {
        visibleSetting.style.visibility = "visible";
    } else {
        visibleSetting.style.visibility = "hidden";
    }
});

footer_setting.addEventListener('click',() => {
    let visibleFoterSetting = document.getElementById('setting-ui-list');
    if (visibleFoterSetting.style.display === 'none'){
        visibleFoterSetting.style.display = "flex";
    } else {
        visibleFoterSetting.style.display = "none";
    }
});

setting_blur.addEventListener('click', () => {
    let blur_body = document.getElementById('live-wallpaper');
    if (blur_body.style.backdropFilter === "blur(1px)") {
        blur_body.style.backdropFilter = "blur(0px)";
        blur_body = "blur(0px)";
    } else {
        blur_body.style.backdropFilter = "blur(1px)";
        blur_body = "blur(1px)";
    }
    localStorage.setItem("settingBlur", blur_body)
});

setting_cover_fit.addEventListener('click', () => {
    let cover_fit = document.getElementById('live-wallpaper');
    if (cover_fit.style.backgroundSize === "cover") {
        cover_fit.style.backgroundSize = "contain";
        cover_fit = "contain";
    } else {
        cover_fit.style.backgroundSize = "cover";
        cover_fit = "cover";
    }
    localStorage.setItem("settingCover", cover_fit);
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

let blur_setting = localStorage.getItem("settingBlur");
if (blur_setting) {
    document.body.style.backdropFilter = blur_setting;
}

let cover_setting = localStorage.getItem("settingCover");
if (cover_setting) {
    document.body.style.backgroundSize = cover_setting;
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
        <div style="display: flex; gap:5px">
            <h1>${hour}:${minute}</h1><h4>${ms}</h4>
        </div>
        <h3 style="margin: 0; height">${year},${monthH[monthN]} ${day} </h3>
    `
    jam.innerHTML = htmlKonten;
}
setInterval(UpdateJam, 1000);
UpdateJam();
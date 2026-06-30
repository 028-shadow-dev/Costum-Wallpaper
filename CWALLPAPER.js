// link input
const btn_live_walllpaper = document.querySelector('#submit-live-wallpaper'); 
const inputWallpaper = document.getElementById('input-link');
// database
const btn_database = document.querySelector('#database-button');
const list_database = document.querySelector('#database');
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

btn_live_walllpaper.addEventListener('click',() => {
    let linkGambar = inputWallpaper.value;
    if (linkGambar) {
        document.body.style.backgroundImage = `url('${linkGambar}')`;
        return linkGambar;
    } else {
        alert("cari walpaper terlebih dahulu")
    }
});

let bgNoRefresh = localStorage.getItem('link');
if (bgNoRefresh) {
    document.body.style.backgroundImage = `url('${bgNoRefresh}')`;
}

btn_database.addEventListener('click', () => {
    const linkSave = inputWallpaper.value;
    localStorage.setItem('link', linkSave);
})

// Date (year, month, day, hour, minute, ms)
function UpdateJam() {
    const monthH = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

    const jam = document.getElementById('jam-sekarang');
    const date = new Date();
    const year = date.getFullYear();
    const monthN = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const htmlKonten = `
        <h1>${hour}:${minute}</h1>
        <h3>${year}, ${monthH[monthN]} ${day} </h3>
    `


    jam.innerHTML = htmlKonten;
}

UpdateJam();
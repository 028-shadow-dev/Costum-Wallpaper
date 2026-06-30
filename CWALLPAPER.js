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

let keyNumbers = 0;
btn_database.addEventListener('click', () => {
    const linkSave = inputWallpaper.value;
    keyNumbers += 1;
    let newKey = `link_${keyNumbers}`;
    localStorage.setItem(newKey, linkSave);
    alert(`link sudah tersave sebagai no ${newKey}`);
    return newKey;
});


// search_database.addEventListener('click', (newKey) => {
//     const database = localStorage.getItem(link_1);
//     let searchDatabase = prompt("pilih no database:");
//         if (searchDatabase == database) {
//             document.body.style.backgroundImage = `url('${searchDatabase}')`;
//         } else if (searchDatabase == 0) {
//             document.body.style.backgroundImage = `url('${searchDatabase}')`;
//         }
// });

let bgNoRefresh = localStorage.getItem('link_1');
if (bgNoRefresh) {
    document.body.style.backgroundImage = `url('${bgNoRefresh}')`;
}

btn_live_walllpaper.addEventListener('click',() => {
    let linkGambar = inputWallpaper.value;
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

    const htmlKonten = `
        <h1>${hour}:${minute}</h1>
        <h3>${year},${monthH[monthN]} ${day} </h3>
    `


    jam.innerHTML = htmlKonten;
}

UpdateJam();
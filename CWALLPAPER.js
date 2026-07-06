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
//shortcut
const shortcutlist = document.getElementById('shortcutlist');


setting.addEventListener('click', () => { 
    let visibleSetting = document.getElementById('footerhide');
    if (visibleSetting.style.visibility === "hidden" || visibleSetting.style.visibility === "") {
        visibleSetting.style.visibility = "visible";
    } else {
        visibleSetting.style.visibility = "hidden";
    }4
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

btn_database.addEventListener('click', () => {
    const linkSave = inputWallpaper.value.trim();
    if (!linkSave) {
        alert("cari walpaper terlebih dahulu");
        return;
    }
    const linkWallpapersave = JSON.parse(localStorage.getItem('linkWallpaper')) || [];
    const nomor = linkWallpapersave.length + 1;
    linkWallpapersave.push({nomor, linkSave});
    localStorage.setItem('linkWallpaper', JSON.stringify(linkWallpapersave));
    alert(`link sudah tersave sebagai nomor ${nomor}`);
});

search_database.addEventListener('click', () => {
    let userInputWallpaper = prompt("pilih no brp wallpapermu");
    let savedWallpaperUrl = JSON.parse(localStorage.getItem('linkWallpaper'));
    if(savedWallpaperUrl){
        let searchFInd = savedWallpaperUrl.find(item => item.nomor == userInputWallpaper);
        if (searchFInd) {
            let urlWallpaper = searchFInd.linkSave;
            
            // Pasang sebagai background body
            document.body.style.backgroundImage = `url('${urlWallpaper}')`;
            
            // Simpan URL yang sedang aktif ini agar tidak hilang saat di-refresh
            localStorage.setItem('activeWallpaper', urlWallpaper);
        } else {
            alert(`Nomor ${userInputWallpaper} tidak ditemukan!`);
        }
    } else {
        alert("Belum ada wallpaper yang tersimpan di database!");
    }
});


let bgNoRefresh = localStorage.getItem('activeWallpaper');
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

function addShortcut() {
    let name;
    let url;
    while (true) {
        name = prompt("Masukkan nama shortcut");
        if (name === null) return; 
        url = prompt("masukan urlnya");
        if (url === null) return; 
        if(name.trim() === "") {
            alert("Nama tidak boleh kosong!");
        }
        if(url.trim() === "") {
            alert("url tidak boleh kosong!");
        }
        break;
    }
    
    if(!url.startsWith('http')) url = 'https://' + url; 
    const shortcuts = JSON.parse(localStorage.getItem('myShortcuts')) || [];
    shortcuts.push({ name, url });
    localStorage.setItem('myShortcuts', JSON.stringify(shortcuts));
    displayShortcuts();
}

function displayShortcuts() {
    const container = document.getElementById('shortcutlist');
    container.innerHTML = '';
    const shortcuts = JSON.parse(localStorage.getItem('myShortcuts')) || [];

    shortcuts.forEach((item, index) => {
        container.innerHTML += `
        <br>
        <!-- Ubah id menjadi class agar tidak duplikat -->
        <div class="shortcut-item" style="border-radius: 10px; display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: black; border: 1px solid black; background: white; padding: 0.5rem;">
            <a id="shortcut-link-${index}" href="${item.url}" target="_blank" rel="noopener noreferrer" style="margin: 0; padding: 0.5rem; color: black; text-decoration: none;">${item.name}</a>
            
            <!-- Kirim item.name langsung ke dalam fungsi editshortcut -->
            <button onclick="editshortcut('${item.name}')" type="button" style="padding: 0.3rem 0.5rem;">Hapus</button>
        </div>
        `;
    });

}

function editshortcut(name) {
    const yakin = confirm(`Apakah Anda yakin ingin menghapus shortcut "${name}"?`);
    if (!name) return alert("Nama tidak boleh kosong!");
    const indexShortcut = JSON.parse(localStorage.getItem('myShortcuts')) || [];

    let dataBaru = indexShortcut.filter(user => user.name.toLowerCase() !== name.toLowerCase());
    localStorage.setItem("myShortcuts", JSON.stringify(dataBaru));

    location.reload(); 
}

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
displayShortcuts();
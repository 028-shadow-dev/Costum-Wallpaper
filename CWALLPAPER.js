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
//list
const ToDoList = document.getElementById('todo-button');
// mode color
const btn_modecolor = document.getElementById('toggle-btn');
// local image input
const inputLocalImage = document.getElementById('input-local-image');
// vidio bg
const videoSource = document.getElementById('videoSource');
const videoInput = document.getElementById('videoInput');
const videoPlayer = document.getElementById('myVideo');


let bgNoRefresh = localStorage.getItem('activeWallpaper');
let bgNoRefreshType = localStorage.getItem('activeWallpaperType') || 'image';
function setVideoSourceUrl(url) {
    document.body.style.backgroundImage = 'none';
    videoPlayer.style.display = 'block';
    videoPlayer.pause();
    videoSource.src = url;
    videoPlayer.load();
    videoPlayer.onloadeddata = () => {
        const playPromise = videoPlayer.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {});
        }
    };
}
if (bgNoRefresh) {
    if (bgNoRefreshType === 'video') {
        setVideoSourceUrl(bgNoRefresh);
    } else {
        videoPlayer.style.display = 'none';
        document.body.style.backgroundImage = `url('${bgNoRefresh}')`;
    }
}

function addJob (){
    let pekerjaan = prompt("masukan pekerjaan yg akan di selesaikan");
    // console.log(pekerjaan);
    if (!pekerjaan) {
        alert("tolong isi");
        return;
    }
    let selesai = false;
    let listPekerjaan = JSON.parse(localStorage.getItem('MytoDoList')) || [];
    let nomer = listPekerjaan.length + 1;
    listPekerjaan.push({nomer, pekerjaan, selesai});
    localStorage.setItem('MytoDoList', JSON.stringify(listPekerjaan));
    displayToDoList();
}

function displayToDoList(){
    // display todolist
    const toDoList = document.getElementById('list-pekerjaan');
    toDoList.innerHTML = '';
    let listPekerjaan = JSON.parse(localStorage.getItem('MytoDoList')) || [];
    listPekerjaan.forEach((item, index) => {
        const styleStrike = item.selesai ? 'text-decoration: line-through;' : 'text-decoration: none;';
        toDoList.innerHTML += `
            <li class="liToDoList" id="liToDoList${item.nomer}" style="color: black;text-shadow: none; ${styleStrike} list-style:x;">${item.pekerjaan} <button onclick="selesaiPekerjaan(${item.nomer}, ${item.selesai})">selesai</button>  </li>
        `
    });
}

function selesaiPekerjaan(nomer, selesai){
    if (!nomer) {
        return alert("nomor tidak ada");
    }
    
    let selesaiPekerjaanli = document.getElementById(`liToDoList${nomer}`);
    let sdhselesai = JSON.parse(localStorage.getItem('MytoDoList')) || [];

    if (!selesai) {
        selesaiPekerjaanli.style.textDecoration = "line-through";
        let itemIndex = sdhselesai.findIndex(item => item.nomer === nomer);
        if (itemIndex !== -1) {
            sdhselesai[itemIndex].selesai = true;
        }
        localStorage.setItem('MytoDoList', JSON.stringify(sdhselesai));
    }
}

btn_modecolor.addEventListener('click', () => {
    let lightMode = document.getElementById('live-wallpaper');
    let lightModeJam = document.getElementById('jam-sekarang');
    let ToDoList = document.getElementById('todo-button');
    if (lightMode.style.color === 'var(--warna-teks-1)') {
        lightMode.style.color = 'var(--warna-teks-2)';
        lightMode.style.backgroundColor = 'var(--warna-teks-2)';
        lightModeJam.style.color = 'var(--warna-teks-1)';
        ToDoList.style.color = 'var(--warna-teks-1)';
    } else {
        lightMode.style.color = 'var(--warna-teks-1)';
        lightMode.style.backgroundColor = 'var(--warna-teks-1)';
        lightModeJam.style.color = 'var(--warna-teks-2)';
        ToDoList.style.color = 'var(--warna-teks-2)';
    }
})

ToDoList.addEventListener('click', () => {
    let visibleToDoList = document.getElementById('list-pekerjaan');
    if (visibleToDoList.style.visibility === "hidden") {
        visibleToDoList.style.visibility = "visible";
    } else {
        visibleToDoList.style.visibility = "hidden";
    }
})

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

btn_database.addEventListener('click', () => {
    const fileimage = inputLocalImage && inputLocalImage.files && inputLocalImage.files[0];
    const filevideo = videoInput && videoInput.files && videoInput.files[0];
    if (fileimage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            const linkWallpapersave = JSON.parse(localStorage.getItem('linkWallpaper')) || [];
            const nomor = linkWallpapersave.length + 1;
            linkWallpapersave.push({nomor, linkSave: dataUrl, local: true});
            try {
                localStorage.setItem('linkWallpaper', JSON.stringify(linkWallpapersave));
                alert(`Wallpaper lokal sudah tersave sebagai nomor ${nomor}`);
            } catch (err) {
                console.error(err);
                alert('Gagal menyimpan wallpaper. Ruang penyimpanan browser penuh.');
            }
        };
        reader.readAsDataURL(fileimage);
        return;
    }

    if (filevideo) {
        if (filevideo.size > 1.5 * 1024 * 1024) {
            alert('Video terlalu besar untuk disimpan di localStorage. Pilih file yang lebih kecil atau gunakan URL.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            const linkWallpapersave = JSON.parse(localStorage.getItem('linkWallpaper')) || [];
            const nomor = linkWallpapersave.length + 1;
            linkWallpapersave.push({nomor, linkSave: dataUrl, local: true, type: 'video'});
            try {
                localStorage.setItem('linkWallpaper', JSON.stringify(linkWallpapersave));
                alert(`Wallpaper video sudah tersave sebagai nomor ${nomor}`);
            } catch (err) {
                console.error(err);
                alert('Gagal menyimpan video. Ruang penyimpanan browser penuh atau file terlalu besar.');
            }
        };
        reader.readAsDataURL(filevideo);
        return;
    }

    let linkSave = inputWallpaper.value.trim();
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
    if (savedWallpaperUrl) {
        let searchFInd = savedWallpaperUrl.find(item => item.nomor == userInputWallpaper);
        if (searchFInd) {
            let urlWallpaper = searchFInd.linkSave;
            if (searchFInd.type === 'video') {
                setVideoSourceUrl(urlWallpaper);
                localStorage.setItem('activeWallpaper', urlWallpaper);
                localStorage.setItem('activeWallpaperType', 'video');
            } else {
                document.body.style.backgroundImage = `url('${urlWallpaper}')`;
                videoPlayer.style.display = 'none';
                localStorage.setItem('activeWallpaper', urlWallpaper);
                localStorage.setItem('activeWallpaperType', 'image');
            }
        } else if(userInputWallpaper === null) {
            alert(`Tidak ada Wallpaper yg di pilih`);
        } else {
            alert(`tidak ada wallpaper no: ${userInputWallpaper}`)
        }
    } else {
        alert("Belum ada wallpaper yang tersimpan di database!");
    }
});

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
    let fileImageLocal = inputLocalImage && inputLocalImage.files && inputLocalImage.files[0];
    let filevideo = videoInput && videoInput.files && videoInput.files[0];

    if (filevideo) {
        const fileURL = URL.createObjectURL(filevideo);
        setVideoSourceUrl(fileURL);
        return;
    }

    if (fileImageLocal) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            if (linkGambar || dataUrl) {
                if (linkGambar) {
                    document.body.style.backgroundImage = `url('${linkGambar}')`;
                } else {
                    document.body.style.backgroundImage = `url('${dataUrl}')`;
                }
            } else {
                alert("cari walpaper terlebih dahulu")
            }
        }
        reader.readAsDataURL(fileImageLocal);
        return;
    }

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
            continue;
        }
        if(url.trim() === "") {
            alert("url tidak boleh kosong!");
        }
        break;
    }
    
    if(!url.startsWith('http')) url = 'https://' + url; 
    const shortcuts = JSON.parse(localStorage.getItem('myShortcuts')) || [];
    let key = Date.now();
    shortcuts.push({ name, url, key});
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
        <div class="shortcut-item" style="border-radius: 10px; display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: black; border: 1px solid black; background: white; padding: 0.5rem;">
            <a id="shortcut-link-${index}" href="${item.url}" target="_blank" rel="noopener noreferrer" style="margin: 0; padding: 0.5rem; color: black; text-decoration: none;">${item.name}</a>
            
            <button onclick="editshortcut(${item.key}, '${item.name}')" type="button" style="padding: 0.3rem 0.5rem;">Hapus</button>
        </div>
        `;
    });

}

function editshortcut(key, name) {
    const yakin = confirm(`Apakah Anda yakin ingin menghapus shortcut "${name}"?`);
    const indexShortcut = JSON.parse(localStorage.getItem('myShortcuts')) || [];

    if (!yakin) {
        return;
    }
    let dataBaru = indexShortcut.filter(user => user.key !== key);
    localStorage.setItem("myShortcuts", JSON.stringify(dataBaru));

    displayShortcuts()
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

videoInput.addEventListener('change', function() {
    let bg_vid = document.getElementById('live-wallpaper');
    const file = videoInput.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file); // Buat URL sementara
        bg_vid.style.backgroundImage = "none";
        setVideoSourceUrl(fileURL); 
    }
});

setInterval(UpdateJam, 1000);
UpdateJam();
displayShortcuts();
displayToDoList();
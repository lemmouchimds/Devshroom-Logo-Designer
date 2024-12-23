let toggleDots = true;
let toggleText = false;
let toggleWallpaper = true;
    const color = document.querySelector('#color');
    // const hex = document.querySelector('input[type="text"]');
    const btn = document.querySelector('#Toggle');
    const checkbox = document.querySelector('input[type="checkbox"]');
    // console.log(svgImage);
    const svgImage = document.getElementsByClassName('st1');
    const Dots = document.getElementsByClassName('st2');

    color.addEventListener('input', function(){
        // hex.value = color.value;
        for(let i = 0; i < svgImage.length; i++){
            svgImage[i].style.fill = color.value;
        }
        for(let i = 0; i < Dots.length; i++){
            Dots[i].style.fill = color.value;
        }
    });

    btn.addEventListener('click', function(){
        if(toggleDots){
            for(let i = 0; i < Dots.length; i++){
                Dots[i].style.display = 'block';
            }
        }
        else{
            for(let i = 0; i < Dots.length; i++){
                Dots[i].style.display = 'none';
            }
        }

        toggleDots = !toggleDots;
        // svgImage.style.fill = hex.value;

    });

    const button = document.querySelector('#Download');
            button.addEventListener('click', function(){
            const svg = document.querySelector('svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            canvas.width = 1000;
            canvas.height = 1000; 
            const ctx = canvas.getContext('2d');
            const img = document.createElement('img');
            img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));
            img.onload = function(){
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const a = document.createElement('a');
                a.download = 'logo.png';
                a.href = canvas.toDataURL('image/png');
                a.click();
            }
            });

const text = document.getElementsByClassName('text');
const textToggle = document.querySelector('#toggle-text');
textToggle.addEventListener('click', function(){
    if(toggleText){
        for(let i = 0; i < text.length; i++){
            text[i].style.display = 'block';
            text[i].style.fill = color.value;
        }
    }
    else{
        for(let i = 0; i < text.length; i++){
            text[i].style.display = 'none';
        }
    }
    toggleText = !toggleText;
});

const wallpaper = document.querySelector('.st0');
const wallpaperToggleBtn = document.querySelector('#toggle-wallpaper');
const wallpaperColor = document.querySelector('#wallpaper-color');
wallpaperColor.addEventListener('input', function(){
    wallpaper.style.fill = wallpaperColor.value;
});

wallpaperToggleBtn.addEventListener('click', function(){
    if(toggleWallpaper){
        wallpaper.style.display = 'block';
    }
    else{
        wallpaper.style.display = 'none';
    }
    toggleWallpaper = !toggleWallpaper;
});
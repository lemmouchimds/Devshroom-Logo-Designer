let isDotsVisible = "ture";
let isTextVisible = false;
let isWallpaperVisible = true;

const colorPicker = document.querySelector('#color');
const toggleDotsButton = document.querySelector('#Toggle');
const svgElements = document.getElementsByClassName('st1');
const dotElements = document.getElementsByClassName('st2');

const downloadButton = document.querySelector('#Download');

const textElements = document.getElementsByClassName('text');
const toggleTextButton = document.querySelector('#toggle-text');

const wallpaperElement = document.querySelector('.st0');
const toggleWallpaperButton = document.querySelector('#toggle-wallpaper');
const wallpaperColorPicker = document.querySelector('#wallpaper-color');

const ascii = document.querySelector('#ascii');

const flip = document.querySelector('#flip');

//flip the colors of the wallpaper and the logo
flip.addEventListener('click', function() {
    let temp = colorPicker.value;
    colorPicker.value = wallpaperColorPicker.value;
    wallpaperColorPicker.value = temp;

    for (let i = 0; i < svgElements.length; i++) {
        svgElements[i].style.fill = colorPicker.value;
    }
    for (let i = 0; i < dotElements.length; i++) {
        dotElements[i].style.fill = colorPicker.value;
    }
    wallpaperElement.style.fill = wallpaperColorPicker.value;
    
});

colorPicker.addEventListener('input', function() 
{
    for (let i = 0; i < svgElements.length; i++) {
        svgElements[i].style.fill = colorPicker.value;
    }
    for (let i = 0; i < dotElements.length; i++) {
        dotElements[i].style.fill = colorPicker.value;
    }
});

toggleDotsButton.addEventListener('click', function() {
    if (isDotsVisible) {
        let asciiVal = toAscii(ascii.value);
        printDots(asciiVal);
        
    } else {
        for (let i = 0; i < dotElements.length; i++) {
            dotElements[i].style.display = 'none';
        }
    }

    isDotsVisible = !isDotsVisible;
});

ascii.addEventListener('change', function() {
    if (!isDotsVisible) {
        let asciiVal = toAscii(ascii.value);
        printDots(asciiVal);
    }
});

downloadButton.addEventListener('click', function() {
    const svg = document.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1094.96;
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const a = document.createElement('a');
        a.download = `logo_${colorPicker.value.substring(1)}${!isWallpaperVisible ? '_bg_' + wallpaperColorPicker.value.substring(1) : ''}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
    }
});

toggleTextButton.addEventListener('click', function() {
    if (isTextVisible) {
        for (let i = 0; i < textElements.length; i++) {
            textElements[i].style.display = 'block';
            textElements[i].style.fill = colorPicker.value;
        }
    } else {
        for (let i = 0; i < textElements.length; i++) {
            textElements[i].style.display = 'none';
        }
    }
    isTextVisible = !isTextVisible;
});

wallpaperColorPicker.addEventListener('input', function() {
    wallpaperElement.style.fill = wallpaperColorPicker.value;
});

toggleWallpaperButton.addEventListener('click', function() {
    if (isWallpaperVisible) {
        wallpaperElement.style.display = 'block';
    } else {
        wallpaperElement.style.display = 'none';
    }
    isWallpaperVisible = !isWallpaperVisible;
});

function toAscii(c) {
    return [
        c.charCodeAt(0) & 128,
        c.charCodeAt(0) & 64,
        c.charCodeAt(0) & 32,
        c.charCodeAt(0) & 16,
        c.charCodeAt(0) & 8,
        c.charCodeAt(0) & 4,
        c.charCodeAt(0) & 2,
        c.charCodeAt(0) & 1
    ].map(Boolean);
}

function printDots(asciiVal) {
    for (let i = 0; i < dotElements.length; i++) {
        dotElements[i].style.display = asciiVal[i] ? 'block' : 'none';
    }
}
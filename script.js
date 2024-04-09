function converterRGBparaHSV() {
    var r = parseFloat(document.getElementById("redInput").value);
    var g = parseFloat(document.getElementById("greenInput").value);
    var b = parseFloat(document.getElementById("blueInput").value);

    // Converter RGB para HSV
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var h, s, v;

    if (delta === 0) {
        h = 0;
    } else if (max === r) {
        h = ((g - b) / delta) % 6;
    } else if (max === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    s = max === 0 ? 0 : delta / max;
    s = +(s * 100).toFixed(2);

    v = +(max / 255 * 100).toFixed(2);

    exibirResultado("HSV: " + h + ", " + s + "%, " + v + "%");

    atualizarCaixaDeCor(r, g, b);
}

function converterRGBparaCMYK() {
    var r = parseFloat(document.getElementById("redInput").value) / 255;
    var g = parseFloat(document.getElementById("greenInput").value) / 255;
    var b = parseFloat(document.getElementById("blueInput").value) / 255;

    // Converter RGB para CMYK
    var k = 1 - Math.max(r, g, b);
    var c = (1 - r - k) / (1 - k);
    var m = (1 - g - k) / (1 - k);
    var y = (1 - b - k) / (1 - k);

    exibirResultado("CMYK: " + (c * 100).toFixed(2) + "%, " + (m * 100).toFixed(2) + "%, " + (y * 100).toFixed(2) + "%, " + (k * 100).toFixed(2) + "%");

    atualizarCaixaDeCor(r * 255, g * 255, b * 255);
}

function converterRGBparaEscalaDeCinza() {
    var r = parseFloat(document.getElementById("redInput").value);
    var g = parseFloat(document.getElementById("greenInput").value);
    var b = parseFloat(document.getElementById("blueInput").value);

    // Converter RGB para Escala de Cinza
    var cinza = 0.2989 * r + 0.5870 * g + 0.1140 * b;

    exibirResultado("Escala de Cinza: " + Math.round(cinza));

    atualizarCaixaDeCor(cinza, cinza, cinza);
}

function converterHSVparaRGB() {
    var h = parseFloat(document.getElementById("hueInput").value);
    var s = parseFloat(document.getElementById("saturationInput").value) / 100;
    var v = parseFloat(document.getElementById("valueInput").value) / 100;

    // Converter HSV para RGB
    var c = v * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = v - c;

    var rgbPrime;
    if (h < 60) {
        rgbPrime = [c, x, 0];
    } else if (h < 120) {
        rgbPrime = [x, c, 0];
    } else if (h < 180) {
        rgbPrime = [0, c, x];
    } else if (h < 240) {
        rgbPrime = [0, x, c];
    } else if (h < 300) {
        rgbPrime = [x, 0, c];
    } else {
        rgbPrime = [c, 0, x];
    }

    var r = Math.round((rgbPrime[0] + m) * 255);
    var g = Math.round((rgbPrime[1] + m) * 255);
    var b = Math.round((rgbPrime[2] + m) * 255);

    exibirResultado("RGB: " + r + ", " + g + ", " + b);

    atualizarCaixaDeCor(r, g, b);
}

function converterCMYKparaRGB() {
    var c = parseFloat(document.getElementById("cyanInput").value) / 100;
    var m = parseFloat(document.getElementById("magentaInput").value) / 100;
    var y = parseFloat(document.getElementById("yellowInput").value) / 100;
    var k = parseFloat(document.getElementById("blackInput").value) / 100;

    // Converter CMYK para RGB
    var r = Math.round(255 * (1 - c) * (1 - k));
    var g = Math.round(255 * (1 - m) * (1 - k));
    var b = Math.round(255 * (1 - y) * (1 - k));

    exibirResultado("RGB: " + r + ", " + g + ", " + b);

    atualizarCaixaDeCor(r, g, b);
}

function converterEscalaDeCinzaparaRGB() {
    var cinza = parseFloat(document.getElementById("grayInput").value);

    // Converter Escala de Cinza para RGB
    var r = g = b = Math.round(cinza);

    exibirResultado("RGB: " + r + ", " + g + ", " + b);

    atualizarCaixaDeCor(r, g, b);
}

function atualizarCaixaDeCor(r, g, b) {
    var colorBox = document.getElementById("colorBox");
    colorBox.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function exibirResultado(resultado) {
    document.getElementById("result").innerText = resultado;
}

// This script converts SVG to PNG using sharp
const sharp = require('sharp');
sharp('public/icon-192.svg').png().toFile('public/icon-192.png');
sharp('public/icon-512.svg').png().toFile('public/icon-512.png');

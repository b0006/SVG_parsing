'use strict';

var testPoints = [
    [
        [1850, 2890],
        [1842, 2924],
        [1836, 2929],
        [1871, 2935],
        [1841, 2951],
        [1847, 2957],
        [1851, 2999],
        [1890, 3025],
        [1833, 3011],
        [1874, 3053],
        [1806, 3075],
        [1888, 3073],
        [1895, 3119],
        [1998, 3193],
        [1939, 3215],
        [1963, 3176],
        [1887, 3158],
        [1887, 3222],
        [1890, 3217],
        [1921, 3222],
        [1888, 3245],
        [1973, 3252],
        [1988, 3281],
        [2793, 3281],
        [2817, 3251],
        [2821, 3247],
        [2876, 3170],
        [2881, 3145],
        [2839, 3144],
        [2837, 3121],
        [2809, 3146],
        [2823, 3103],
        [2810, 3054],
        [2840, 3027],
        [2818, 3009],
        [2787, 3010],
        [2768, 3044],
        [2658, 3051],
        [2677, 3017],
        [2699, 3034],
        [2719, 3026],
        [2736, 3026],
        [2691, 3007],
        [2694, 2979],
        [2670, 2989],
        [2646, 2994],
        [2727, 2960],
        [2686, 2949],
        [2643, 2961],
        [2644, 2952],
        [2643, 2939],
        [2571, 2946],
        [2587, 2906],
        [2544, 2918],
        [2540, 2918],
        [2468, 3011],
        [2471, 3015],
        [2474, 3020],
        [2479, 3036],
        [2466, 3044],
        [2449, 3034],
        [2417, 3072],
        [2397, 3086],
        [2377, 3100],
        [2303, 3152],
        [2298, 3154],
        [2325, 3192],
        [2288, 3187],
        [2295, 3245],
        [2250, 3222],
        [2252, 3198],
        [2282, 3188],
        [2252, 3154],
        [2279, 3117],
        [2266, 3107],
        [2236, 3108],
        [2203, 3116],
        [2210, 3154],
        [2182, 3150],
        [2172, 3154],
        [2197, 3194],
        [2152, 3146],
        [2120, 3137],
        [2161, 3124],
        [2137, 3105],
        [2154, 3078],
        [2068, 3041],
        [2079, 3029],
        [2094, 3019],
        [2056, 2981],
        [2035, 2933],
        [2008, 2933],
        [1985, 2962],
        [1942, 2935],
        [1974, 2867],
        [1925, 2905],
        [1850, 2890]
    ]
];

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

for (var i = 0; i < testPoints[0].length; i++) {
    minX = Math.min(minX, testPoints[0][i][0]);
    maxX = Math.max(maxX, testPoints[0][i][0]);
    minY = Math.min(minY, testPoints[0][i][1]);
    maxY = Math.max(maxY, testPoints[0][i][1]);
}

var width = maxX - minX,
    height = maxY - minY;

canvas.width = window.innerWidth;
canvas.height = canvas.width * height / width + 10;

var ratio = (canvas.width - 10) / width;

if (devicePixelRatio > 1) {
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= 2;
    canvas.height *= 2;
    ctx.scale(2, 2);
}

var data = earcut.flatten(testPoints);

console.time('earcut');
// for (var i = 0; i < 1000; i++) {
var result = earcut(data.vertices, data.holes, data.dimensions);
// }
console.timeEnd('earcut');

var triangles = [];

for (i = 0; i < result.length; i++) {
    var index = result[i];
    triangles.push([data.vertices[index * data.dimensions], data.vertices[index * data.dimensions + 1]]);
}

ctx.lineJoin = 'round';

for (i = 0; triangles && i < triangles.length; i += 3) {
    // drawPoly([triangles.slice(i, i + 3)], 'rgba(255,0,0,0.2)', 'rgba(255,255,0,0.2)');
    // drawPoly([triangles.slice(i, i + 3)], 'rgba(255,0,0,0.0)', 'rgba(255,0,0,0.3)');
}

function drawPoint(p, color) {
    var x = (p[0] - minX) * ratio + 5,
        y = (p[1] - minY) * ratio + 5;
    ctx.fillStyle = color || 'grey';
    ctx.fillRect(x - 3, y - 3, 4, 4);
}

function drawPoly(rings, color, fill) {
    ctx.beginPath();

    ctx.strokeStyle = color;
    if (fill) ctx.fillStyle = fill;

    for (var k = 0; k < rings.length; k++) {
        var points = rings[k];
        for (var i = 0; i < points.length; i++) {
            var x = (points[i][0] - minX) * ratio + 5,
                y = (points[i][1] - minY) * ratio + 5;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
    }
    ctx.stroke();

    if (fill) ctx.fill('evenodd');
}

/**
 * ПОЛУЧАЕМ КООРДИНАТЫ ВСЕХ ТРЕУГОЛЬНИКОВ
 * СЧИТАЕМ ПЛОЩАДЬ КАЖДОГО ТРЕУГОЛЬНИКА
 * НАХОДИМ ЦЕНТР ТЯЖЕСТИ КАЖДОГО ТРЕУГОЛЬНИКА
 */
var centerPoints = [];

function getCenter(x1, y1, x2, y2, x3, y3)
{
    /**
     * СЧИТАЕМ ПЛОЩАДЬ ТЕКУЩЕГО ТРЕУГОЛЬНИКА
     */
    var points = [(x1 - x3), (x2 - x3), (y1 - y3), (y2 - y3)];
    var square = parseInt( ((points[0] * points[3]) - (points[1] * points[2])) / 2);

    /**
     * НАХОДИМ ЦЕНТР ТЯЖЕСТИ ТЕКУЩЕГО ТРЕУГОЛЬНИКА
     */
    var mediumX = parseInt((x1 + x2 + x3) / 3);
    var mediumY = parseInt((y1 + y2 + y3) / 3);

    centerPoints.push({
        "centerX" : mediumX,
        "centerY" : mediumY,
        "square" : square
    });
}

/**
 * ФОРМИРУЕМ МАССИВ ИЗ КООРДИНАТ ЦЕНТРОВ КАЖДОГО ТРЕУГОЛЬНИКА
 */
for(var i = 0; i < arPointTriangles.length; i++) {
    getCenter(
        arPointTriangles[i]["a"]["x"], arPointTriangles[i]["a"]["y"],
        arPointTriangles[i]["b"]["x"], arPointTriangles[i]["b"]["y"],
        arPointTriangles[i]["c"]["x"], arPointTriangles[i]["c"]["y"]
    );
}

/**
 * СОРТИРУЕМ МАССИВ ПО УБЫВАНИЮ
 */
centerPoints = centerPoints.sort(function (b, a) {
    return (a.square - b.square)
});

/**
 * @target_percent - необходимый процент
 * @result_centers[]
 * получить процент количества треугольников от числа всех треугольников
 */
var result_centers = [];

var target_percent = 9;
var countPercentCenters = parseInt((target_percent * centerPoints.length) / 100);
for(var i = 0; i < countPercentCenters; i++){
    result_centers.push({"centerX" : centerPoints[i]["centerX"], "centerY" : centerPoints[i]["centerY"]})
    // drawPoint([centerPoints[i]["centerX"], centerPoints[i]["centerY"]], "green");
}


// function drawTest() {
//     var testPoint1 = [2590, 3182];
//     drawPoint(testPoint1, '#ffffff');
//     var testPoint2 = [2483, 3099];
//     drawPoint(testPoint2, 'red');
//     var testPoint3 = [1925, 2905];
//     drawPoint(testPoint3, 'red');
//
//     var testPoint4 = [1842, 2924];
//     drawPoint(testPoint4, '#ffffff');
//     var testPoint5 = [1850, 2890];
//     drawPoint(testPoint5, 'red');
//     var testPoint6 = [1925, 2905];
//     drawPoint(testPoint6, 'red');
//
//     var testPoint7 = [1842, 2924];
//     drawPoint(testPoint7, '#ffffff');
//     var testPoint8 = [1850, 2890];
//     drawPoint(testPoint8, 'red');
//     var testPoint9 = [1925, 2905];
//     drawPoint(testPoint9, 'red');
// }
//
// // drawTest();
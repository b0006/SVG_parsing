'use strict'

$( window ).on( "load", function() {
    var object = document.getElementById("svgfile");
    var svgDocument = object.contentDocument;

    var paths = svgDocument.getElementById("test").children;

    //глобальная переменная скрипта decode.js
    var localVar = window.storage.globalVar;

    var path = [];
    var data = "";

    var arPointsPathD = [];

    var absoluteX = 0;
    var absoluteY = 0;

    for(var i = 0; i < paths.length; i++)
    {
        // получаем каждый аттрибут "d"
        path[i] = paths[i].getAttribute("d");
        // декодируем (извлекаем точки x и y)
        data = localVar.decode( path[i] );

        for(var t = 0; t < data.length; t++) {
            if(data[t]["rel"] == false)
            {
                if (typeof data[t]['x'] !== "undefined")
                {
                    absoluteX = data[t]["x"];
                    absoluteY = data[t]["y"];
                    arPointsPathD.push({ x: absoluteX, y: absoluteY });
                }
            }
            else
            {
                if(typeof data[t]['x'] !== "undefined")
                {
                    try {
                        absoluteX = absoluteX + data[t]["x"];
                        absoluteY = absoluteY + data[t]["y"];
                        arPointsPathD.push({ x: absoluteX, y: absoluteY });

                        /*if(typeof data[t]['x1'] !== "undefined"){
                            relativeX = absoluteX - data[t]["x1"];
                            relativeY = absoluteY - data[t]["y1"];
                            arPointsPathD.push({ x: relativeX, y: relativeY });
                        }
                        if(typeof data[t]['x2'] !== "undefined"){
                            relativeX = absoluteX - data[t]["x2"];
                            relativeY = absoluteY - data[t]["y2"];
                            arPointsPathD.push({ x: relativeX, y: relativeY });
                        }*/
                    }
                    catch(e) {}
                }
            }
        }
    }

    /***
     * ПОЛУЧИЛИ АБСОЛЮТНЫЕ ЗНАЧЕНИЯ КООРДИНАТ ПОЛИГОНА
     */
    console.log(arPointsPathD);


    /*for(var i = 0; i < paths.length; i++)
    {
        // получаем каждый аттрибут "d"
        path[i] = paths[i].getAttribute("d");
        // декодируем (извлекаем точки x и y)
        data = localVar.decode( path[i] );

        console.log(data);

        // преобразуем значение координат в абсолютные значения
        // P.S. Так как аттрибут "d" не такой простой, там могут быть кривые Безье и другая дичь
        // Для простоты надо получить обычные X и Y, если выделываться. То есть не относительные значения,
        // а абсолютные получить нужно
        for(var t = 1; t < data.length - 1; t++)
        {
            if( (typeof data[t].x != 'undefined') && (typeof data[t - 1].x != 'undefined') )
            {
                data[t].x = data[t - 1].x + data[t].x;
                data[t].y = data[t - 1].y + data[t].y;

            }
            // может попасться пустое значение, нужно его обойти
            if(typeof data[t].x === 'undefined')
            {
                data[t + 1].x = data[t - 1].x + data[t + 1].x;
                data[t + 1].y = data[t - 1].y + data[t + 1].y;
                t++;
            }

            //console.log("x = " + data[t].x + " y = " + data[t].y);
        }*/

    // var text0 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text0.setAttribute("x", 2590);
    // text0.setAttribute("y", 3182);
    // text0.setAttribute('style', 'font-size: 25px;');
    // text0.innerHTML = '1';
    // var gg0 = svgDocument.getElementById("test");
    // gg0.appendChild(text0);
    //
    // var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text1.setAttribute("x", 2483);
    // text1.setAttribute("y", 3099);
    // text1.setAttribute('style', 'font-size: 25px;');
    // text1.innerHTML = '2';
    // var gg1 = svgDocument.getElementById("test");
    // gg1.appendChild(text1);
    //
    // var text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text2.setAttribute("x", 2020);
    // text2.setAttribute("y", 3088);
    // text2.setAttribute('style', 'font-size: 25px;');
    // text2.innerHTML = '3';
    // var gg2 = svgDocument.getElementById("test");
    // gg2.appendChild(text2);
    //
    // var text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text3.setAttribute("x", 2259);
    // text3.setAttribute("y", 3261);
    // text3.setAttribute('style', 'font-size: 25px;');
    // text3.innerHTML = '4';
    // var gg3 = svgDocument.getElementById("test");
    // gg3.appendChild(text3);
    //
    // var text4 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text4.setAttribute("x", 2532);
    // text4.setAttribute("y", 3271);
    // text4.setAttribute('style', 'font-size: 25px;');
    // text4.innerHTML = '5';
    // var gg4 = svgDocument.getElementById("test");
    // gg4.appendChild(text4);
    //
    // var text5 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text5.setAttribute("x", 1943);
    // text5.setAttribute("y", 3051);
    // text5.setAttribute('style', 'font-size: 25px;');
    // text5.innerHTML = '6';
    // var gg5 = svgDocument.getElementById("test");
    // gg5.appendChild(text5);
    //
    // var text6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text6.setAttribute("x", 2096);
    // text6.setAttribute("y", 3194);
    // text6.setAttribute('style', 'font-size: 25px;');
    // text6.innerHTML = '7';
    // var gg6 = svgDocument.getElementById("test");
    // gg6.appendChild(text6);
    //
    // var text7 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text7.setAttribute("x", 2575);
    // text7.setAttribute("y", 2999);
    // text7.setAttribute('style', 'font-size: 25px;');
    // text7.innerHTML = '8';
    // var gg7 = svgDocument.getElementById("test");
    // gg7.appendChild(text7);

    // console.log(result_centers);


});
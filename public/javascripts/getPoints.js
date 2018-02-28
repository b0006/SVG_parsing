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

    var relativeX = 0;
    var relativeY = 0;

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
                        /*if ((typeof data[t]['x'] !== "undefined") && (typeof data[t + 1]['x'] === "undefined"))
                        {
                            //data[t].splice(t, 1);
                            //data[t + 1]["x"] = data[t]["x"];
                            //data[t + 1]["y"] = data[t]["y"];

                        }*/
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

    console.log(data);
    console.log("-------------");
    console.log(arPointsPathD);

    // var textPoints = "";

    // for(var i = 0; i < arPointsPathD.length; i++){
    //     textPoints += "var text" + i + " = document.createElementNS('http://www.w3.org/2000/svg', 'text');\n";
    //     textPoints += "text" + i + ".setAttribute(\"x\", " + arPointsPathD[i]["x"] + ");\n";
    //     textPoints += "text" + i + ".setAttribute(\"y\", " + arPointsPathD[i]["y"] + ");\n";
    //     textPoints += "text" + i + ".setAttribute('style', 'font-size: 25px;');\n";
    //     textPoints += "text" + i + ".innerHTML = '+';\n";
    //     textPoints += "var gg" + i + " = svgDocument.getElementById(\"test\");\n";
    //     textPoints += "gg" + i + ".appendChild(text" + i + ");\n\n";
    // }

    // for(var i = 0; i < arPointsPathD.length; i++){
    //     textPoints += "  [" + arPointsPathD[i]["x"] + ", " + arPointsPathD[i]["y"] + "],\n";
    // }
    //
    // document.write(
    //     '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(textPoints) + '" download="text.txt">text.txt</a>'
    // )

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

    var text0 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text0.setAttribute("x", 2482);
    text0.setAttribute("y", 3184);
    text0.setAttribute('style', 'font-size: 25px;');
    text0.innerHTML = '+';
    var gg0 = svgDocument.getElementById("test");
    gg0.appendChild(text0);

    var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text1.setAttribute("x", 2482);
    text1.setAttribute("y", 3184);
    text1.setAttribute('style', 'font-size: 25px;');
    text1.innerHTML = '+';
    var gg1 = svgDocument.getElementById("test");
    gg1.appendChild(text1);

    var text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text2.setAttribute("x", 2590);
    text2.setAttribute("y", 3182);
    text2.setAttribute('style', 'font-size: 25px;');
    text2.innerHTML = '+';
    var gg2 = svgDocument.getElementById("test");
    gg2.appendChild(text2);

    var text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text3.setAttribute("x", 2303);
    text3.setAttribute("y", 3213);
    text3.setAttribute('style', 'font-size: 25px;');
    text3.innerHTML = '+';
    var gg3 = svgDocument.getElementById("test");
    gg3.appendChild(text3);

    var text4 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text4.setAttribute("x", 2533);
    text4.setAttribute("y", 3216);
    text4.setAttribute('style', 'font-size: 25px;');
    text4.innerHTML = '+';
    var gg4 = svgDocument.getElementById("test");
    gg4.appendChild(text4);

    var text5 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text5.setAttribute("x", 2560);
    text5.setAttribute("y", 3234);
    text5.setAttribute('style', 'font-size: 25px;');
    text5.innerHTML = '+';
    var gg5 = svgDocument.getElementById("test");
    gg5.appendChild(text5);

    var text6 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text6.setAttribute("x", 2262);
    text6.setAttribute("y", 3232);
    text6.setAttribute('style', 'font-size: 25px;');
    text6.innerHTML = '+';
    var gg6 = svgDocument.getElementById("test");
    gg6.appendChild(text6);

    var text7 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text7.setAttribute("x", 2329);
    text7.setAttribute("y", 3232);
    text7.setAttribute('style', 'font-size: 25px;');
    text7.innerHTML = '+';
    var gg7 = svgDocument.getElementById("test");
    gg7.appendChild(text7);

    var text8 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text8.setAttribute("x", 2483);
    text8.setAttribute("y", 3099);
    text8.setAttribute('style', 'font-size: 25px;');
    text8.innerHTML = '+';
    var gg8 = svgDocument.getElementById("test");
    gg8.appendChild(text8);

    var text9 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text9.setAttribute("x", 2020);
    text9.setAttribute("y", 3088);
    text9.setAttribute('style', 'font-size: 25px;');
    text9.innerHTML = '+';
    var gg9 = svgDocument.getElementById("test");
    gg9.appendChild(text9);

    var text10 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text10.setAttribute("x", 2243);
    text10.setAttribute("y", 3239);
    text10.setAttribute('style', 'font-size: 25px;');
    text10.innerHTML = '+';
    var gg10 = svgDocument.getElementById("test");
    gg10.appendChild(text10);

    var text11 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text11.setAttribute("x", 2237);
    text11.setAttribute("y", 3241);
    text11.setAttribute('style', 'font-size: 25px;');
    text11.innerHTML = '+';
    var gg11 = svgDocument.getElementById("test");
    gg11.appendChild(text11);





    /*document.write(
        '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(textPoints) + '" download="text.txt">text.txt</a>'
    )*/

});

function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.

                // удаляем div
                $("div#svg_block").remove();

                // создаем div
                var div = $("<div id='svg_block'></div>");
                $("#loaded_svgFile").append(div);

                var object = '<object id="test" data="' + e.target.result + '" style="width: 70%; height: 70%;"></object>';
                div.append(object);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function goToReadSvgFile() {

    var parent = $('#test');
    console.log(parent.content.textContent);
}


$('body').on('change','#svg_files', function(e){
    handleFileSelect(e);
});

$('body').on('click','#go', function(e){
    goToReadSvgFile();
});









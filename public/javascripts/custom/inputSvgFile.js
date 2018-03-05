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
                var div = document.createElement('div');
                div.setAttribute("id", "svg_block");

                div.innerHTML = ['<object data="' + e.target.result + '" style="width: 70%; height: 70%;"></object>'].join('');
                document.getElementById('list').insertBefore(div, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('svg_files').addEventListener('change', handleFileSelect, false);
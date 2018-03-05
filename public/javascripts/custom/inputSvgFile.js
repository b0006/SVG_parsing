
function handleFileSelect(evt) {

     // var files = evt.target.files; // FileList object

    d3.xml("../public/images/svgfile_main.svg", "image/svg+xml", function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);
        d3.select("div#vis")
            .each(function() {
                this.appendChild(importedNode);
            })
    });

}

$('body').on('change','#svg_files', function(e){
    e.preventDefault();
    handleFileSelect(e);
});











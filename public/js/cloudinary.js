var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dvi7y8bvb',
    uploadPreset: 'aauqtyy6'
}, function(error, result) {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
    }
});

document.getElementById("upload_widget").addEventListener("click", function(event) {
    event.preventDefault();
    myWidget.open();
}, false);
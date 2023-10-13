// https://github.com/kennethjiang/js-file-download/blob/master/file-download.js

export const FileDownload = (data, filename, mime) => {
    var blobData = [data]
    var blob = new Blob(blobData, { type: mime});

    var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    document.body.appendChild(tempLink);
    tempLink.click();
    setTimeout(function () {
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }, 200)
};
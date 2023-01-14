javascript: (() => {
    if (document.querySelectorAll('[data-testid=swipe-to-dismiss]').length > 0) {
        var index = document.querySelectorAll('[data-testid=swipe-to-dismiss]')[0].baseURI.match(/(?<=photo\/)(.*)/)[0]-1;
        img = document.querySelectorAll('[data-testid=swipe-to-dismiss]')[index].innerHTML.match(/(?<=background-image: url\(\&quot\;)(.*)(?=\&quot\;\)\;)/)[0].replace(/&amp;\w+/, '&name');
    }
    else {
        var img = document.querySelectorAll('[data-testid=tweetPhoto]')[0].lastChild.src;
    }
    try {
        downloadResource(img.replace(/(&name=)\w+/, '&name=orig'));
    } catch (e) {
        alert("Download failed.");
        console.log('Download failed.', e);
    }

    function forceDownload(blob, filename) {
        var a = document.createElement('a');
        a.download = filename;
        a.href = blob;
        a.click();
    }

    function downloadResource(url, filename) {
        if (!filename) filename = document.querySelectorAll('[data-testid=User-Names]')[0].innerText.match(/(@)\w+/)[0] + '_' + url.split('\\').pop().split('/').pop();
        fetch(url, {
            headers: new Headers({
                'Origin': location.origin
            }),
            mode: 'cors'
        })
            .then(response => response.blob())
            .then(blob => {
                let blobUrl = window.URL.createObjectURL(blob);
                forceDownload(blobUrl, filename);
            })
            .catch(e => console.error(e));
    }
}).call(window);
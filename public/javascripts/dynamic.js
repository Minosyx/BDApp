function addAnchors(page, pages, size){

    var links = document.getElementsByClassName('links')[0];
    var startIt;
    var sizeIt;

    if (pages <= 4){
        startIt = 1;
        sizeIt = pages;
    } else {
        sizeIt = 4;
        if (page >= 3 && page <= pages - 2){
            startIt = page - 1;
        } else if (page < 3){
            startIt = 1;
        } else {
            startIt = pages - 3;
        }
    }

    var a = document.createElement('a');
    if (page == 1){
        a.href = location.pathname + `?pageNo=1&size=${size}`;
    } else {
        a.href = location.pathname + `?pageNo=${page - 1}&size=${size}`;
    }
    a.innerHTML = "&laquo";
    links.appendChild(a);
    for (var i = startIt; i < startIt + sizeIt; ++i){
            var a = document.createElement('a');
            a.innerHTML = i;
            a.href = location.pathname + `?pageNo=${i}&size=${size}`;
            if (i == page)
                a.classList.add("active");
            links.appendChild(a);
    }
    var a = document.createElement('a');
    if (page == pages){
        a.href = location.pathname + `?pageNo=${pages}&size=${size}`;
    } else {
        a.href = location.pathname + `?pageNo=${page + 1}&size=${size}`;
    }
    a.innerHTML = "&raquo";
    links.appendChild(a);
}
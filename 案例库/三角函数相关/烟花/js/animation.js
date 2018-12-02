function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj, null)[attr];
}

function animation(dom, attr, times, fn) {
    dom.deg = 0;
    dom.timer ? clearInterval(dom.timer) : null;
    dom.fn = fn;
    dom.t = times / 90;
    var start = {};
    for (var key in attr) {
        if (key == 'opacity') {
            start[key] = parseFloat(getStyle(dom, key)) * 100;
        } else {
            start[key] = parseInt(getStyle(dom, key))
        }
    }
    dom.timer = setInterval(function() {
        dom.deg++;
        if (dom.deg == 90) {
            clearInterval(dom.timer);
            if (dom.fn) {
                dom.fn();
            }
        }
        for (var key in attr) {
            if (key == 'opacity') {
                var end = Math.round((attr[key] * 100 - start[key]) * Math.sin(dom.deg * Math.PI / 180));
                dom.style[key] = (start[key] + end) / 100;
                dom.style.filter = 'alpha(opacity=' + (start[key] + end) + ')';
            } else {
                var end = Math.round((attr[key] - start[key]) * Math.sin(dom.deg * Math.PI / 180));
                dom.style[key] = start[key] + end + 'px';
            }
        }
    }, dom.t)
}

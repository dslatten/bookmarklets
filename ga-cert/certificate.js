javascript:(function() {

    document.write('<!DOCTYPE html><html><head><title>Certificate</title></head><body style="margin:0;background:url(\'https://analyticsacademy.withgoogle.com/assets/img/cert_template.png\') no-repeat"><canvas id="certificate" width="960" height="720"></canvas></body></html>');
    var u = prompt('Enter a name', 'SEO Mofo');

    create_canvas();

    function create_canvas() {
        var canvas = document.getElementById('certificate');
        var context = canvas.getContext('2d');
        var templateLoaded = false;
        var qrLoaded = true;
        var template = new Image();
        template.onload = function () {
            templateLoaded = true;
            imageLoaded();
        };
        template.src = 'https://analyticsacademy.withgoogle.com/assets/img/cert_template.png';

        function imageLoaded() {
            if (!templateLoaded || !qrLoaded) {
                return;
            }
            w = canvas.width;
            h = canvas.height;
            context.drawImage(template, 0, 0);
            var x = w / 2;
            var y = 136 + 58;
            context.font = '58px open sans,arial,sans-serif';
            context.textAlign = 'center';
            context.fillStyle = '#FFFFFF';
            context.fillText(u, x, y);
        }
    }
})();

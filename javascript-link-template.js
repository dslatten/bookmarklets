/* ========================================================================== *\
    The snippet below is intended to be pasted into a bookmark's URL field.
    Clicking on the bookmark should execute the JavaScript file located at
    the src URL, which you must specify on line 10.
\* ========================================================================== */

javascript:(function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '';
    document.getElementsByTagName('head')[0].appendChild(script);
})();

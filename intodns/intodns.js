/* ========================================================================== *\
    Opens an intoDNS health check (in a new window) to help diagnose issues
    with the current domain's DNS configuration. Runs from any subdomain or
    path on the current apex (bare) domain.
\* ========================================================================== */

(function() {
    // Full domain name (including subdomains)
    var host = location.hostname;
    // Index position of the first dot
    var position = host.indexOf('.');
    // Index position where the apex domain begins
    var domain = 0;

    while (position != -1) {
        if (host.indexOf('.', position + 1) != -1) {
            domain = position + 1;
        }
        position = host.indexOf('.', position + 1);
    }
    domain = host.substring(domain);

    // This might trigger your browser's pop-up blocker.
    window.open('http://intodns.com/' + domain);
})();

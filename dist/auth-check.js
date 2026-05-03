// Password protection check
(function() {
    // Skip if on password gate page (index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        return;
    }
    
    // Check authentication
    if (sessionStorage.getItem('siteAuth') !== 'true') {
        // Not authenticated, redirect to password gate
        window.location.href = 'index.html';
    }
})();
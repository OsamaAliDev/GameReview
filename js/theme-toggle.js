/* theme-toggle.js
   Simple data-theme toggler that stores user choice in localStorage.
   Adds data-theme attribute to <html> (or <body>) and updates button icon.
*/
(function () {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var root = document.documentElement;
    var key = 'ftg-theme';

    function setIcon(theme) {
        var i = btn.querySelector('i');
        if (!i) return;
        if (theme === 'dark') {
            i.className = 'fas fa-sun';
            btn.title = 'Switch to light mode';
        } else {
            i.className = 'fas fa-moon';
            btn.title = 'Switch to dark mode';
        }
    }

    function apply(theme) {
        try { root.setAttribute('data-theme', theme); } catch (e) { }
        try { localStorage.setItem(key, theme); } catch (e) { }
        setIcon(theme);
    }

    function getInitial() {
        try {
            var saved = localStorage.getItem(key);
            if (saved === 'light' || saved === 'dark') return saved;
        } catch (e) { }
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }

    var cur = getInitial();
    apply(cur);

    btn.addEventListener('click', function (e) { e.preventDefault(); var next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark'; apply(next); });
})();

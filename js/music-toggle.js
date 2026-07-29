(function () {
    var key = 'ftg-music-playing';

    function init() {
        var btn = document.getElementById('musicToggle');
        var audio = document.getElementById('bgMusic');
        if (!btn || !audio) return;

        audio.volume = 0.2;
        try { audio.preload = 'auto'; } catch (e) { }

        function setIcon(playing) {
            var i = btn.querySelector('i');
            if (!i) return;
            if (playing) {
                i.className = 'fas fa-pause';
                btn.title = 'Pause background music';
            } else {
                i.className = 'fas fa-play';
                btn.title = 'Play background music';
            }
        }

        function play() {
            audio.play().then(function () {
                setIcon(true);
                try { localStorage.setItem(key, '1'); } catch (e) { }
            }).catch(function () {
                setIcon(false);
            });
        }

        function pause() {
            audio.pause();
            setIcon(false);
            try { localStorage.setItem(key, '0'); } catch (e) { }
        }

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (audio.paused) {
                play();
            } else {
                pause();
            }
        });

        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });

        try {
            var saved = localStorage.getItem(key);
            setIcon(saved === '1');
        } catch (e) {
            setIcon(false);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

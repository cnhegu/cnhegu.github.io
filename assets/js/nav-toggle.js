window.addEventListener("DOMContentLoaded", event => {
    // Find the main nav toggle element first.
    // If it doesn't exist, this page doesn't have the nav feature, so do nothing.
    const navToggle = document.getElementById('nav-toggle');
    if (!navToggle) {
        return;
    }

    // --- All code below will only run if the nav toggle exists ---

    // Create nav toggle icon
    const navToggleLabel = document.querySelector('.nav-toggle');
    if (navToggleLabel) {
        const navToggleLabelInner = document.createElement('div');
        navToggleLabelInner.className = 'nav-toggle-inner';
        navToggleLabel.appendChild(navToggleLabelInner);

        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            navToggleLabelInner.appendChild(span);
        }
    }

    // Main function
    const header = document.querySelector('.header');
    const navCurtain = document.querySelector('.nav-curtain');

    // Ensure header and curtain also exist before adding listeners
    if (header && navCurtain) {
        navToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                header.classList.add('open');
                if (navToggleLabel) navToggleLabel.classList.add('open');

                header.classList.remove('fade');

                navCurtain.style = 'display: block';
            } else {
                header.classList.remove('open');
                if (navToggleLabel) navToggleLabel.classList.remove('open');

                header.classList.add('fade');
            }
        });

        navCurtain.addEventListener('animationend', (e) => {
            if (!navToggle.checked) {
                e.target.removeAttribute('style');
            }
        });

        window.addEventListener(
            'scroll',
            throttle(function() {
                checkInput();
            }, 420) // Assuming delayTime is 420 from the other file
        );

        const maxWidth = window.getComputedStyle(document.documentElement, null).getPropertyValue('--max-width');
        let mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`);

        mediaQuery.addListener(e => {
            if (!e.matches) {
                closeNav(true);
            }
        });
    }

    function checkInput() {
        const input = document.getElementById('search-input');
        if (input && input === document.activeElement) {
            return;
        }
        closeNav();
    }

    function closeNav(noFade) {
        if (navToggle.checked) {
            navToggle.checked = false;

            if (header) header.classList.remove('open');
            if (navToggleLabel) navToggleLabel.classList.remove('open');

            if (noFade) {
                if (navCurtain) navCurtain.removeAttribute("style");
            }
            else {
                if (header) header.classList.add('fade');
            }
        }
    }
}, {once: true});
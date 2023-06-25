document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('theme-toggle-checkbox');

    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    });

    // Check the saved theme preference if available
    const savedThemePreference = localStorage.getItem('themePreference');
    if (savedThemePreference === 'dark') {
        themeSwitch.checked = true;
        applyDarkTheme();
    } else {
        applyLightTheme();
    }
});

function applyLightTheme() {
    const elements = document.querySelectorAll('.dark-theme');
    elements.forEach(function (element) {
        element.classList.remove('dark-theme');
    });
}

// Apply the dark theme by adding the dark-theme class to relevant elements
function applyDarkTheme() {
    const styleSheets = [document.querySelector('link[href*=styles]').sheet];
    const darkSelectors = getDarkSelectors(styleSheets);

    darkSelectors.forEach(function (selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            element.classList.add('dark-theme');
        });
    });
}

// Get the selectors with the .dark-theme class definition from the CSS stylesheets
function getDarkSelectors(styleSheets) {
    const darkSelectors = [];

    for (let i = 0; i < styleSheets.length; i++) {
        const rules = styleSheets[i].cssRules;
        if (rules) {
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule instanceof CSSStyleRule && rule.selectorText.includes('.dark-theme')) {
                    const selector = rule.selectorText.replace('.dark-theme', '');
                    darkSelectors.push(selector.trim());
                }
            }
        }
    }

    return darkSelectors;
}

// Save the theme preference to local storage
window.addEventListener('beforeunload', function () {
    const themeSwitch = document.getElementById('theme-toggle-checkbox');
    const themePreference = themeSwitch.checked ? 'dark' : 'light';
    localStorage.setItem('themePreference', themePreference);
});
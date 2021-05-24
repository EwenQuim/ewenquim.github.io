---
date: 2021-05-24
title: Dark mode in pure CSS
cover: https://images.unsplash.com/photo-1536613105185-09ea1249a2cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2265&q=80
tags:
  - tuto
  - css
toc: true
---

So here's how to do a CSS-only dark mode for your website ! I'll show you how to do mine, but feel free to adapt it as you want!

## Why would I do that?

- Writing JavaScript sucks
- Consuming JavaScript as a client sucks
- Accessibility: some people browse internet without internet, or with extensions like NoScript
- It's actually simple to do this with pure CSS, so why not?

## How can CSS handle both possible states?

You probably wonder how can CSS change the color theme of a whole page. Because, knowing which color theme to display require a "switch", something that can be "activated"... Is JavaScript the only solution?

No, these things exists in bare HTML too! There are many tags that are interactive. Here, we'll use an `input` tag, with a checkbox. If the checkbox is checked, the Dark Mode will be active, and the light mode otherwise.

The CSS can access to the checkbox state with the `:checked` pseudo-class (there are [many more](https://www.w3schools.com/css/css_pseudo_classes.asp)!).

```css
input#dark-mode-switch:checked {
  background: #222220;
}
```

## Changing the theme

There is a problem in the previous code snippet.

```css {hl_lines=1}
input#dark-mode-switch:checked {
  /* ↑ here */
  background: #222220;
}
```

We are selecting the switch itself, but it doesn't matter to us, we want to change the whole body! And with CSS, it isn't possible to select a parent tag...

But, it is possible to select a neighbour or a child tag ! Here, we'll select place the switch right after the `body` tag, and we'll insert the whole site inside a div right after, just like this:

```html {hl_lines=["5-6",9]}
<head>
  <!-- your head --->
</head>
<body>
  <input type="checkbox" id="dark-mode-switch" />
  <div class="general-theme">
    <div class="my-website">
      <!-- your website content --->
    </div>
  </div>
</body>
```

Now, we can use the `1 ~ 2` CSS selector (that means "selector 2 is a tag with the same parent node as the selector 1")

```css
input#dark-mode-switch:checked ~ .general-theme {
  /* dark theme */
  background: #222220;
}

.general-theme {
  /* light theme */
  background: #fff;
}
```

We need something to activate the checkbox: a `label`

```html
<label for="dark-mode-switch" class="ewen-toggle"> Toggle! </label>
```

If you want a fancy switch, just checkout the last chapter of this article ;)

## Storing the theme

If you've gone this far and copy-pasted the code to your website, you might have noticed that when navigating, the theme isn't stored. When navigated from a dark-mode activated page to another page, the theme goes back to light mode. How can we prevent that?

Unluckily, this isn't just "displaying things" anymore. If you want your theme to be persistent across your pages, you have no other choice than using cookies or local storage, which require javascript.

```js
var switcher = document.getElementById("dark-mode-switch");

// Click on dark mode icon. Add dark mode classes and wrappers. Store user preference through sessions
switcher.addEventListener("change", function () {
  // If dark mode is selected
  if (this.checked) {
    // set the a variable in user's browser
    localStorage.setItem("darkMode", "true");
  } else {
    setTimeout(function () {
      localStorage.setItem("darkMode", "false");
    }, 100);
  }
});
```

Now that the variable is set, we need to load user's preference each time they visit the website. We'll get the value from local storage, and simply check the checkbox we talked about earlier!

```js
//Check Storage. Keep user preference on page reload
if (localStorage.getItem("darkMode") === "true") {
  //body.classList.add('dark-mode');
  switcher.checked = true;
}
```

## Setting defaults

Visitors may only visit your site once, and it's better to respect their default settings. You can set the default's theme to their preferred color with the following code.

```js
if (localStorage.getItem("darkMode") === null) {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
    switcher.checked = true;
    localStorage.setItem("darkMode", "true");
  } else {
    switcher.checked = false;
    localStorage.setItem("darkMode", "false");
  }
}
```

## Appendix: the pretty button code

Just copy-paste this.

```html
<div class="sidebar-toggler">
  <div class="ewen-toggle-wrapper">
    <label for="dark-mode-switch" class="ewen-toggle">
      <div class="ewen-toggle-track">
        <div class="ewen-toggle-track-moon">
          <img
            src="data:image/png;base64,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"
            role="presentation"
            style="pointer-events: none"
            width="16"
            height="16"
          />
        </div>
        <div class="ewen-toggle-track-sun">
          <img
            src="data:image/png;base64,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"
            role="presentation"
            style="pointer-events: none"
            width="16"
            height="16"
          />
        </div>
      </div>
      <div class="ewen-toggle-thumb"></div>
      <input
        class="ewen-toggle-screenreader-only"
        type="checkbox"
        aria-label="Switch between Dark and Light mode"
      />
    </label>
  </div>
</div>
```

```css
.ewen-toggle {
  touch-action: pan-x;

  display: inline-block;
  position: relative;
  cursor: pointer;
  border: 0;
  padding: 0;

  -webkit-touch-callout: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

.ewen-toggle-screenreader-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.ewen-toggle-track {
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: #000;
}

#dark-mode-switch:checked ~ .general-theme .ewen-toggle-track {
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: #000;
}

.ewen-toggle-track-moon {
  position: absolute;
  width: 17px;
  height: 17px;
  left: 5px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  opacity: 0;
}

#dark-mode-switch:checked
  ~ .general-theme
  .ewen-toggle
  .ewen-toggle-track-moon {
  opacity: 1;
  background-color: #000 !important;
}

.ewen-toggle-track-sun {
  position: absolute;
  width: 17px;
  height: 17px;
  right: 5px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  opacity: 1;
  transition: opacity 0.25s ease;
}

#dark-mode-switch:checked ~ .general-theme .ewen-toggle-track-sun {
  opacity: 0;
}

.ewen-toggle-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #fafafa;
  box-sizing: border-box;
  transform: translateX(0);
}

#dark-mode-switch:checked ~ .general-theme .ewen-toggle-thumb {
  transform: translateX(26px);
  background-color: #fafafa;
}

.ewen-toggle-wrapper {
  justify-content: right;
  align-items: center;
}
```

It is forked from https://github.com/gaearon/overreacted.io, credits to Dan Abramov.

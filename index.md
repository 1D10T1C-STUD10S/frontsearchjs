
### FrontSearch.js, the library/template for easy filter search systems!

Built for Frontend sites and requires nothing but a simple JSON file.
Use the template or install it on your static site, our library will handle most of the code for you.

---

## Getting Started

Time to start! Follow us step by step and you'll be just fine, we recommend using [Github Pages](https://pages.github.com), it's free and easy to set up Jekyll sites on.

### Installation

First, put this `<script>` tag at the end of your `<body` in HTML.

You will only need this on the pages that you want the search filter to be in, but if you put it in all pages, that's fine too. (Though it may increase loading speeds!)

```
<script src="https://raw.githubusercontent.com/1D10T1C-STUD10S/frontsearchjs/main/src/script.js"></script>
```

This script will be the main script component but you will still need to define variables, but that's for later.

### HTML and CSS

We will not run through the CSS but the HTML is a must. Since we use specific classes abd ids to get the elements, do keeps those intact!

Now, we need to add the basic HTML content:

```
<!-- Search Bar -->
<input type="search" id="search-input" placeholder="Search Database">

<!-- Important Part -->
<div class="entries-container></div>
```

Do note the JS will create messages below this HTML.

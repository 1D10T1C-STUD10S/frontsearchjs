---
layout: default
---

<style>
  .highlight {
    background: #ffea00 !important;
  }
</style>

<img src="https://frontsearch.js.org/favicon.png" style="float: left; max-height: 50px; max-width: 50px;">
<h1>FrontSearch.js</h1>

<h3>FrontSearch.js, the library/template for easy filter search systems!</h3>

<div style="background-color: #ffffff !important; border-radius: 10px; padding: 8px !important; text-decoration: none !important; color: #000000 !important;">
<a href="/try">Try it out!</a>
</div>

<div style="display: block; margin: 0 auto;">
<a class="github-button" href="https://github.com/1D10T1C-STUD10S/frontsearchjs" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star 1D10T1C-STUD10S/frontsearchjs on GitHub">Star</a>

<a class="github-button" href="https://github.com/1D10T1C-STUD10S/frontsearchjs/subscription" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch 1D10T1C-STUD10S/frontsearchjs on GitHub">Watch</a>
</div>

Built for Frontend sites and requires nothing but a simple JSON file.
Use the template or install it on your static site, our library will handle most of the code for you. 

Do check out our [Github Repo](https://github.com/1D10T1C-STUD10S/frontsearchjs)!

---

## Getting Started

Time to start! Follow us step by step and you'll be just fine, we recommend using [Github Pages](https://pages.github.com), it's free and easy to set up Jekyll sites on.

### Installation

First, put this `<script>` tag at the **end** of your `<body>` in HTML.

You will only need this on the pages that you want the search filter to be in, but if you put it in all pages, that's fine too. (Though it may increase loading speeds!)

```
<script src="https://cdn.jsdelivr.net/gh/1d10t1c-stud10s/frontsearchjs@master/src/script.js"></script>

//OR for a updated cdn,

<script src="https://frontsearch.js.org/src/script.js"></script>
```
<mark class="highlight" style="background-color: #ffea00; color: #000000;">Use the second cdn <`script`> tag for now.</mark>

This script will be the main script component but you will still need to define variables, but that's for later.

---

## Data Storage

### JSON Structure

We use our own fixed values for the search (total 6), but if you want your own, it's not that hard to edit the source code for your own use!

We have **fixed** values so follow the sample template, if you don't want the values simply dont include them in the `entryHTML` variable. Sample file:

```
[
  {
    "name": "Example Title 1",
    "image": "https://example.com/image1.jpg",
    "category": "Cat1",
    "description": "BlahBlah",
    "detail1": "1",
    "detail2": "2"
  },
  {
    "name": "Example Title 2",
    "image": "https://example.com/image2.jpg",
    "category": "Cat2",
    "description": "BlahBlah",
    "detail1": "1",
    "detail2": "2"
  }
]
```

<mark class="highlight" style="background-color: #ffea00; color: #000000;">Eg. `name` will translate to `entry.name` or `${entry.name}` when building your HTML later (description and the other params will follow).</mark>

And you're almost done!, make sure to link the right url values in `jsonUrls`. Next up:

---

## Building the Search Function

### HTML and CSS

We will not run through the CSS but the HTML is a must. Since we use specific classes abd id(s) to get the elements, do **keep those intact**!

Now, we need to add the basic HTML content:

```
<!-- Search Bar -->
<input type="search" id="search-input" placeholder="Search Database">

<!-- Important Part -->
<div class="entries-container"></div>
```

<mark class="highlight" style="background-color: #ffea00; color: #000000;">You may add more classes but the main `type`, `id` and `class` *must* stay, this is because our code uses that to select these HTML elements!</mark>

Do note the JS will create messages below this HTML.

### Adding Variables


This step defines how your search will look, and also where the code will get the JSON files from.

First, create a new `<script>` tag in your HTML, **above** the first one we added:

```
<script>
const jsonUrls = [
  'https://example.com/data/file1.json',
  'https://example.com/data/file2.json',
  'https://example.com/data/file3.json',
  'https://example.com/data/file4.json',
  'https://example.com/data/file5.json',
  // Add more URLs as needed
];
</script>
```

<mark class="highlight" style="background-color: #ffea00; color: #000000;">This is a required step as of now, omitting it will result in referenceError(s)</mark>

Now you're almost there! We will do the JSON in a bit!

Remember the `<div class="entries-container></div>` we added earlier?

Now the code will place entries inside that `<div>` using a template, we need to define that template, in the same `<script>` tag as the one we used to define the `jsonUrls`, add:

```
function getEntryHTML(entry)
    //insert your entry html structure inside, the code will generate per entry
    return `
        <div>
        <h2>${entry.name}</h2>
        <small><p>${entry.category}</p></small>
        <p>${entry.description}</p>
        </div>
    `;
};
```

<mark class="highlight" style="background-color: #ffea00; color: #000000;">This is a required step as of now, omitting it will result in referenceError(s)</mark>

We will go through all the customisable features in the next part.

---


## Customisation 

### Changing the Default Message

You can customise the message that is shown depending on the circumstance, leave it blank to use the default value. In the same variable `<script>` tag:

```
var bMessage = 'insert start message'

var nrMessage = 'insert no results message'

var fsTerm = '*' //the term to use to show all entries
```

<mark class="highlight" style="background-color: #ffea00; color: #000000;">It's fine if you leave these as blank, they will then follow the default values!</mark>

And you're done!
Do leave a star on our repo so others can easily find this library!

---

## Miscellanious

Use the sample below if you're confused:

```
<script>
let bMessage = 'Start typing or enter '*' to show all entries'

let nrMessage = 'No results, try a different query'

let fsTerm = '*' 
  
const jsonUrls = [
  'https://frontsearch.js.org/src/sample.json'
  // Add more URLs as needed
];

var entryHTML = `
    <div>
      <h2>${entry.name}</h2>
      <p>${entry.description}</p>
    </div>
  `;
//insert your entry html structure inside, the code will generate per entry
</script>
```

<!-- Place this tag in your head or just before your close body tag. For writers, please ignore this tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>


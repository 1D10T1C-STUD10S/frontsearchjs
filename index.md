---
layout: default
---

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
```

This script will be the main script component but you will still need to define variables, but that's for later.

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

Now you're almost there! We will do the JSON in a bit!

Remember the `<div class="entries-container></div>` we added earlier?

Now the code will place entries inside that `<div>` using a template, we need to define that template, in the same `<script>` tag as the one we used to define the `jsonUrls`, add:

```
function getEntryHTML(entry) {
  return `
    <div>
      <h2>${entry.name}</h2>
      <p>${entry.description}</p>
    </div>
  `;
}
//insert your entry html structure inside, the code will generate per entry
```

We will go through all the useable variables in the next part.
Let's move on to the JSON file(s) now shall we?

---

## Data Storage

### JSON Structure

We use our own values for the search, but if you want your own, it's not that hard to edit the source code for your own use!

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

And you're almost done!, make sure to link the right url values in `jsonUrls`. Next up:

## Customisation 

### Changing the Default Message

You can customise the message that is shown depending on the circumstance. In the same variable `<script>` tag:

```
let bMessage = 'insert start message'

let nrMessage = 'insert no results message'

let fsTerm = '*' //the term to use to show all entries
```
And you're done!
Do leave a star on our repo so others can easily find this library!

<!-- Place this tag in your head or just before your close body tag. For writers, please ignore this tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>


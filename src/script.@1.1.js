// variables
var bMessage;
var nrMessage;
var fsTerm;
var entryStructure;
var startShowAll;


document.addEventListener('DOMContentLoaded', function() {
    async function fetchAndCombineJSON(urls) {
        const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
        try {
            const jsonArrays = await Promise.all(fetchPromises);
            const combinedArray = jsonArrays.flat();
            return combinedArray;
        } catch (error) {
            console.error('Error fetching JSON files:', error);
            return [];
        }
    }

    let start = Date.now();
    
    fetchAndCombineJSON(jsonUrls).then(combinedData => {
        displayEntries(combinedData);
    });

    let timeTaken = Date.now() - start;
    const resultspeed = document.createElement('span');
    resultspeed.textContent = `Total time taken: ${timeTaken} milliseconds`
    resultspeed.style.fontSize = 'smaller'; // or a specific font size, like '12px'
    const entriesContainer = document.querySelector('.entries-container');
    entriesContainer.prepend(resultspeed);

    function displayEntries(entries) {
        const entriesContainer = document.querySelector('.entries-container');
        const searchInput = document.querySelector('#search-input');
        const message = document.createElement('p');
        if (!startShowAll) {
            if (typeof bMessage === 'undefined') {
                bMessage = 'Start typing, or enter * to show all entries';
                console.log(bMessage);
            }
            message.textContent = bMessage;
            entriesContainer.appendChild(message);
        } else {
            filtered = entries;
        }

        if (startShowAll) {
            entriesContainer.innerHTML = ''; // Clear previous entries
            entries.forEach(entry => {
                const entryElement = document.createElement('div');
                const entryHTML = getEntryHTML(entry);
                entryElement.innerHTML = entryHTML;
                entriesContainer.appendChild(entryElement);
            });
        }

        searchInput.addEventListener('input', () => {
            const searchQuery = searchInput.value.toLowerCase();
            let filtered = [];

            if (typeof fsTerm === 'undefined') {
                fsTerm = '*';
                console.log(fsTerm);
            }

            if (searchQuery === '') {
                entriesContainer.innerHTML = '';
                entriesContainer.appendChild(message);
            } else if (searchQuery === fsTerm) {
                filtered = entries;
            } else {
                filtered = entries.filter(entry => {
                    const name = entry.name.toLowerCase();
                    const description = entry.description.toLowerCase();
                    return name.includes(searchQuery) || description.includes(searchQuery);
                });
            }

            entriesContainer.innerHTML = ''; // Clear previous entries

            if (filtered.length === 0) {
                const noResultsMessage = document.createElement('p');
                if (typeof nrMessage === 'undefined') {
                    nrMessage = 'No results, try a different query';
                    console.log(nrMessage);
                }
                noResultsMessage.textContent = nrMessage;
                entriesContainer.appendChild(noResultsMessage);
            } else {
                filtered.forEach(entry => {
                    const entryElement = document.createElement('div');
                    const entryHTML = getEntryHTML(entry);
                    entryElement.innerHTML = entryHTML;
                    entriesContainer.appendChild(entryElement);
                });
            }
        });
    }
});

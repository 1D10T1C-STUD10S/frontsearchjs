//variables

var bMessage;
var nrMessage;
var fsTerm;

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

    fetchAndCombineJSON(jsonUrls).then(combinedData => {
        displayEntries(combinedData);
    });

    function displayEntries(entries) {
        const entriesContainer = document.querySelector('.entries-container');
        const searchInput = document.querySelector('#search-input');
        const message = document.createElement('p');
        if (typeof bMessage === 'undefined') {
            let bMessage = 'Start typing, or enter * to show all entries';
            console.log(bMessage);
        }
        message.textContent = bMessage;
        entriesContainer.appendChild(message);

        searchInput.addEventListener('input', () => {
            const searchQuery = searchInput.value.toLowerCase();
            let filtered = [];
            if (typeof fsTerm === 'undefined') {
                let fsTerm = '*';
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

            console.log(entries);
            
            entriesContainer.innerHTML = ''; // Clear previous entries

            if (filtered.length === 0) {
                const noResultsMessage = document.createElement('p');
                if (typeof nrMessage === 'undefined') {
                    let nrMessage = 'No results, try a different query';
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

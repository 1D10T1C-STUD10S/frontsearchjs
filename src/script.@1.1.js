// variables
var frs$messageStart;
var frs$messageNoResult;
var frs$termShowAll;
var frs$startShowAll;
var frs$dataset;

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

    fetchAndCombineJSON(frs$dataset).then(combinedData => {
        displayEntries(combinedData);
    });

    function displayEntries(entries) {
        const entriesContainer = document.querySelector('.entries-container');
        const searchInput = document.querySelector('#search-input');
        const message = document.createElement('p');

        if (typeof frs$startShowAll === 'undefined') {
            frs$startShowAll = false;
        }

        if (!frs$startShowAll) {
            if (typeof frs$messageStart === 'undefined') {
                frs$messageStart = 'Start typing, or enter * to show all entries';
                console.log(frs$messageStart);
            }
            message.textContent = frs$messageStart;
            entriesContainer.appendChild(message);
        } else {
            filtered = entries;
        }

        if (frs$startShowAll) {
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

            if (typeof frs$termShowAll === 'undefined') {
                frs$termShowAll = '*';
                console.log(frs$termShowAll);
            }

            if (searchQuery === '') {
                entriesContainer.innerHTML = '';
                entriesContainer.appendChild(message);
            } else if (searchQuery === frs$termShowAll) {
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
                if (typeof frs$messageNoResult === 'undefined') {
                    nrMessage = 'No results, try a different query';
                    console.log(frs$messageNoResult);
                }
                noResultsMessage.textContent = frs$messageNoResult;
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

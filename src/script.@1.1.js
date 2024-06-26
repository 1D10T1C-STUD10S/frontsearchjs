// variables
var frontsearchMessage;
var frontsearchNoResultsMessage;
var frontsearchFilterTerm;
var frontsearchEntryStructure;
var frontsearchStartShowAll;


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

    const resultspeed = document.createElement('p');
    resultspeed.textContent = `Total time taken: ${timeTaken} milliseconds`
    const topDiv = document.createElement('div');
    topDiv.style.paddingTop = '5px';
    topDiv.appendChild(resultspeed);
    document.body.appendChild(topDiv);
    
        if (!frontsearchStartShowAll) {
            if (typeof frontsearchMessage === 'undefined') {
                frontsearchMessage = 'Start typing, or enter * to show all entries';
                console.log(frontsearchMessage);
            }
            message.textContent = frontsearchMessage;
            entriesContainer.appendChild(message);
        } else {
            filtered = entries;
        }

        if (frontsearchStartShowAll) {
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

            if (typeof frontsearchFilterTerm === 'undefined') {
                frontsearchFilterTerm = '*';
                console.log(frontsearchFilterTerm);
            }

            if (searchQuery === '') {
                entriesContainer.innerHTML = '';
                entriesContainer.appendChild(message);
            } else if (searchQuery === frontsearchFilterTerm) {
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
                if (typeof frontsearchNoResultsMessage === 'undefined') {
                    frontsearchNoResultsMessage = 'No results, try a different query';
                    console.log(frontsearchNoResultsMessage);
                }
                noResultsMessage.textContent = frontsearchNoResultsMessage;
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

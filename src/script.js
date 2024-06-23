document.addEventListener('DOMContentLoaded', function() {
    // List of known JSON file URLs
    //const jsonUrls = [
    //    'https://example.com/data/file1.json',
    //    'https://example.com/data/file2.json',
    //    'https://example.com/data/file3.json',
    //    'https://example.com/data/file4.json',
    //    'https://example.com/data/file5.json'
        // Add more URLs as needed
    //];

  //uncomment this and copy it over

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
        message.textContent = 'Start typing, or enter * to show all entries';
        entriesContainer.appendChild(message);

        searchInput.addEventListener('input', () => {
            const searchQuery = searchInput.value.toLowerCase();
            let filtered = [];

            if (searchQuery === '') {
                entriesContainer.innerHTML = '';
                entriesContainer.appendChild(message);
            } else if (searchQuery === '*') {
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
                noResultsMessage.textContent = 'No results, try a different query';
                entriesContainer.appendChild(noResultsMessage);
            } else {
                filtered.forEach(entry => {
                    const entryHTML = `
                        <div class="entry-wrapper">
                            <h2>${entry.name}</h2>
                            <small><p style="text-align: center;">${entry.category}</p></small>
                            <p>${entry.description}</p>
                            <div style="text-align: center;">
                                <p style="color: #ffffff;">${entry.detail1}</p>
                                <p style="color: #ffffff;">${entry.detail2}</p>
                            </div>
                            <a href="#${entry.name.replace(/\s+/g,'-')}" rel="modal:open">
                                <img src="${entry.image}" alt="${entry.name}">
                            </a>
                        </div>
                        <div id="${entry.name.replace(/\s+/g,'-')}" class="modal">
                            <p>Image:</p>
                            <img src="${entry.image}" alt="${entry.name}">
                            <a href="#" rel="modal:close">Close</a>
                        </div>
                    `;
                    const entryElement = document.createElement('div');
                    entryElement.innerHTML = entryHTML;
                    entriesContainer.appendChild(entryElement);
                });
            }
        });
    }
});

/**
 * Returns a list of objects grouped by some property. For example:
 * groupBy([{name: 'Steve', team:'blue'}, {name: 'Jack', team: 'red'}, {name: 'Carol', team: 'blue'}], 'team')
 *
 * returns:
 * { 'blue': [{name: 'Steve', team: 'blue'}, {name: 'Carol', team: 'blue'}],
 *    'red': [{name: 'Jack', team: 'red'}]
 * }
 *
 * @param {any[]} objects: An array of objects
 * @param {string|Function} property: A property to group objects by
 * @returns  An object where the keys representing group names and the values are the items in objects that are in that group
 */
 function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}

// Initialize DOM elements that will be used.
const outputDescription = document.querySelector('#output_description');
const wordOutput = document.querySelector('#word_output');
const showRhymesButton = document.querySelector('#show_rhymes');
const showSynonymsButton = document.querySelector('#show_synonyms');
const wordInput = document.querySelector('#word_input');
const savedWords = document.querySelector('#saved_words');

// Stores saved words.
const savedWordsArray = [];

/**
 * Makes a request to Datamuse and updates the page with the
 * results.
 * 
 * Use the getDatamuseRhymeUrl()/getDatamuseSimilarToUrl() functions to make
 * calling a given endpoint easier:
 * - RHYME: `datamuseRequest(getDatamuseRhymeUrl(), () => { <your callback> })
 * - SIMILAR TO: `datamuseRequest(getDatamuseRhymeUrl(), () => { <your callback> })
 *
 * @param {String} url
 *   The URL being fetched.
 * @param {Function} callback
 *   A function that updates the page.
 */
function datamuseRequest(url, callback) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // This invokes the callback that updates the page.
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

/**
 * Gets a URL to fetch rhymes from Datamuse
 *
 * @param {string} rel_rhy
 *   The word to be rhymed with.
 *
 * @returns {string}
 *   The Datamuse request URL.
 */
function getDatamuseRhymeUrl(rel_rhy) {
    return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': wordInput.value})).toString()}`;
}

/**
 * Gets a URL to fetch 'similar to' from Datamuse.
 *
 * @param {string} ml
 *   The word to find similar words for.
 *
 * @returns {string}
 *   The Datamuse request URL.
 */
function getDatamuseSimilarToUrl(ml) {
    return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': wordInput.value})).toString()}`;
}

/**
 * Add a word to the saved words array and update the #saved_words `<span>`.
 *
 * @param {string} word
 *   The word to add.
 */
function addToSavedWords(word) {
    // You'll need to finish this...
    savedWordsArray.push(word);
    savedWords.textContent = savedWordsArray.join(', ');
}

// Add additional functions/callbacks here.
function rhymeCallback(data) {
    if (data.length !== 0) {
        result = document.createElement('div');
        groupData = groupBy(data, 'numSyllables');
        for (numSyllables in groupData) {
            text = document.createElement('h3');
            text.textContent = `Syllables: ${numSyllables}`;
            result.appendChild(text);
            temp = document.createElement('ul');
            for (element in groupData[numSyllables]) {
                text = document.createElement('li');
                word = groupData[numSyllables][element].word;
                text.textContent = word;
                text.innerHTML += `<button type="button" class="btn btn-outline-success" onclick="addToSavedWords('${word}')">(save)</button>`;
                temp.appendChild(text);
            }
            result.appendChild(temp);
        }
        wordOutput.innerHTML = `<h2>Words that rhyme with ${wordInput.value}<h2>`;
        wordOutput.appendChild(result);
    } else {
        wordOutput.innerHTML = `<h2>(no results)<h2>`;
    }
}

function similarToCallback(data) {
    if (data.length !== 0) {
        result = document.createElement('ul');
        for (element in data) {
            text = document.createElement('li');
            word = data[element].word;
            text.textContent = word;
            text.innerHTML += `<button type="button" class="btn btn-outline-success" onclick="addToSavedWords('${word}')">(save)</button>`;
            result.appendChild(text);
        }
        wordOutput.innerHTML = `<h2>Words with a similar meaning to ${wordInput.value}<h2>`;
        wordOutput.appendChild(result);
    } else {
        wordOutput.innerHTML = `<h2>(no results)<h2>`;
    }
}
// Add event listeners here.


showRhymesButton.addEventListener('click', () => {
    wordOutput.innerHTML = '<h2>...loading<h2>';
    datamuseRequest(getDatamuseRhymeUrl(wordInput.value), rhymeCallback);
})

wordInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        wordOutput.innerHTML = '<h2>...loading<h2>';
        datamuseRequest(getDatamuseRhymeUrl(wordInput.value), rhymeCallback);
    }
})

showSynonymsButton.addEventListener('click', () => {
    wordOutput.innerHTML = '<h2>...loading<h2>';
    datamuseRequest(getDatamuseSimilarToUrl(wordInput.value), similarToCallback);
})

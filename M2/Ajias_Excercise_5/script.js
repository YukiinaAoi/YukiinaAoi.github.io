const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const button = document.getElementById('newQuoteBtn');
const copyButton = document.getElementById('copyQuoteBtn');
const shareButton = document.getElementById('shareBtn');

function fetchQuote() {
    quoteElement.textContent = 'Loading quote...';
    authorElement.textContent = '';
    
    fetch('https://dummyjson.com/quotes')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const randomQuote = data.quotes[randomIndex];
        quoteElement.textContent = `"${randomQuote.quote}"`;
        authorElement.textContent = `- ${randomQuote.author}`;
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = 'Failed to load quote. Please try again.';
        authorElement.textContent = '';
    });
}

function copyToClipboard() {
    const quoteText = `${quoteElement.textContent} ${authorElement.textContent}`;
    navigator.clipboard.writeText(quoteText).then(() => {
        alert('Quote copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy quote: ', err);
    });
}

function shareOnTwitter() {
    const quoteText = `${quoteElement.textContent} ${authorElement.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
    window.open(twitterUrl, '_blank');
}

button.addEventListener('click', fetchQuote);
copyButton.addEventListener('click', copyToClipboard);
shareButton.addEventListener('click', shareOnTwitter);

fetchQuote();

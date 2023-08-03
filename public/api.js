
async function analyzeTextAPI(text) {
    try {
        const response = await fetch('https://api.sapling.ai/api/v1/aidetect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: '6F9RMOTT9VEOHPDOC0AGL641JKWKZZZ3',
                text: text,
                sent_scores: false
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log({status: response.status});
        console.log(JSON.stringify(data, null, 4));
        // Save the response data in the session storage
        sessionStorage.setItem('apiResponse', JSON.stringify(data));
        return response.status;
    } catch (err) {
        console.log({err});
    }
}


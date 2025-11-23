async function testApi() {
    try {
        console.log("Testing http://localhost:3000/api/gemini...");
        const response = await fetch('http://localhost:3000/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: 'Test', history: [] })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("SUCCESS: API responded:", data);
        } else {
            console.log("FAILURE: API returned status:", response.status);
            const text = await response.text();
            console.log("Response body:", text.substring(0, 200)); // Show first 200 chars
        }
    } catch (error) {
        console.error("ERROR: Connection failed:", error.message);
    }
}

testApi();

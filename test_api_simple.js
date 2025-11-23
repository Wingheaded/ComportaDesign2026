async function testSimpleApi() {
    try {
        console.log("Testing http://localhost:3000/api/test_simple...");
        const response = await fetch('http://localhost:3000/api/test_simple');

        if (response.ok) {
            const data = await response.json();
            console.log("SUCCESS: Simple API responded:", data);
        } else {
            console.log("FAILURE: Simple API returned status:", response.status);
            const text = await response.text();
            console.log("Response body:", text);
        }
    } catch (error) {
        console.error("ERROR: Connection failed:", error.message);
    }
}

testSimpleApi();

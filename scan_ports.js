import net from 'net';

async function checkPort(port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(200);
        socket.on('connect', () => {
            socket.destroy();
            resolve(true);
        });
        socket.on('timeout', () => {
            socket.destroy();
            resolve(false);
        });
        socket.on('error', () => {
            resolve(false);
        });
        socket.connect(port, '127.0.0.1');
    });
}

async function scan() {
    console.log("Scanning ports 3000-3005...");
    for (let port = 3000; port <= 3005; port++) {
        const isOpen = await checkPort(port);
        if (isOpen) {
            console.log(`FOUND: Port ${port} is open!`);
        }
    }
    console.log("Scan complete.");
}

scan();

// 3. Collect POST Data
// Create an endpoint POST /submit that:

// Reads the entire request body (plain text)

// Responds with "Received: <the message>"

// Constraints: Must use req.on('data', ...) and req.on('end', ...) — no third-party libraries.
const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/submit" && req.method === "POST") {

        let value = "";

        req.on("data", (chunk) => {
            value += chunk.toString();
        });

        req.on("end", () => {
            res.writeHead(200, { "content-type": "text/plain" });
            res.end("Received: " + value);
            console.log(value);
        });

    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Please proceed to /submit with POST request");
    }

});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
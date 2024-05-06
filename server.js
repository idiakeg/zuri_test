const http = require("node:http");
const os = require("os");

const randomDelay = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;

const requestHandler = (req, res) => {
    if (req.url === "/cpu_info" && req.method === "GET") {
        let info = os.cpus();
        setTimeout(() => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Content-Type", "text/plain");
            res.write(
                `Your operating system is of type ${os.type()} with an uptime of ${Math.ceil(
                    os.uptime() / (60 * 60 * 24)
                )} days and a total memory of ${Math.ceil(
                    os.totalmem() / Math.pow(1024, 3)
                )} GB. Your device's CPU is ${info[0].model}`
            );
            res.end();
        }, randomDelay);
        return;
    }

    res.statusCode = 200;
    setTimeout(() => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/plain");
        res.write("Welcome.");
        res.end();
    }, randomDelay);
};

const server = http
    .createServer(requestHandler)
    .listen(4141, () => console.log("server is running on port 4141."));

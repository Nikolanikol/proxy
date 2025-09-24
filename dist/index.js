"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7000;
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }
    try {
        const response = await fetch(targetUrl);
        const contentType = response.headers.get('content-type');
        const data = await response.text();
        res.setHeader('Content-Type', contentType || 'text/plain');
        res.status(response.status).send(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch target URL', details: error });
    }
});
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});

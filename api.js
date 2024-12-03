const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

module.exports = async (req, res) => {
    const url = "https://www.defconlevel.com/current-level.php";

    try {
        const response = await fetch(url);
        const html = await response.text();
        const dom = new JSDOM(html);

        const img = dom.window.document.querySelector('img.level-icons');
        if (!img) {
            return res.status(500).json({ error: "DEFCON level image not found." });
        }

        const src = img.getAttribute('src');
        const levelMatch = src.match(/defcon-(\d)/);
        const level = levelMatch ? `DEFCON ${levelMatch[1]}` : "Unknown";

        return res.status(200).json({ level });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch DEFCON level.", details: error.message });
    }
};

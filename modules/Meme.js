const Command = require('./Command');
const { post } = require('snekfetch');
const { URLSearchParams } = require('url');

class Meme extends Command {
    constructor(client, file, options = {}) {
        super(client, file, Object.assign(options, { guildOnly: true }));
    }

    async oneMeme(template_id, text, font = "impact", max_font_size = "50px") {
        const params = new URLSearchParams();
        let text0;
        if (text.includes("; ")) {
            [text0] = text.split("; ");
        } else {
            text0 = text;
        }
        params.append("template_id", template_id);
        params.append("username", process.env.FLIPUSER);
        params.append("password", process.env.FLIPPASS);
        params.append("font", font);
        params.append("max_font_size", max_font_size);
        params.append("text0", text0);

        const { body } = await post(`https://api.imgflip.com/caption_image?${params}`);
        return body.data.url;
    }

    async twoMeme(template_id, text, font = "impact", max_font_size = "50px") {
        const params = new URLSearchParams();
        let text0;
        let text1;
        if (text.includes("; ")) {
            [text0, text1] = text.split("; ");
        } else {
            text0 = text;
            text1 = "";
        }
        params.append("template_id", template_id);
        params.append("username", process.env.FLIPUSER);
        params.append("password", process.env.FLIPPASS);
        params.append("font", font);
        params.append("max_font_size", max_font_size);
        params.append("text0", text0);
        params.append("text1", text1);

        const { body } = await post(`https://api.imgflip.com/caption_image?${params}`);
        return body.data.url;
    }

    async threeMeme(template_id, text, font = "impact", max_font_size = "50px") {
        const params = new URLSearchParams();
        let first;
        let second;
        let third;
        if (text.includes("; ")) {
            [first, second, third] = text.split("; ");
        } else {
            first = text;
            second = "";
            third = "";
        }
        params.append("template_id", template_id);
        params.append("username", process.env.FLIPUSER);
        params.append("password", process.env.FLIPPASS);
        params.append("font", font);
        params.append("max_font_size", max_font_size);
        params.append("boxes[0][text]", first);
        params.append("boxes[1][text]", second);
        params.append("boxes[2][text]", third);

        const { body } = await post(`https://api.imgflip.com/caption_image?${params}`);
        return body.data.url;
    }

    async fourMeme(template_id, text, font = "impact", max_font_size = "50px") {
        const params = new URLSearchParams();
        let first;
        let second;
        let third;
        let forth;
        if (text.includes("; ")) {
            [first, second, third, forth] = text.split("; ");
        } else {
            first = text;
            second = "";
            third = "";
            forth = "";
        }
        params.append("template_id", template_id);
        params.append("username", process.env.FLIPUSER);
        params.append("password", process.env.FLIPPASS);
        params.append("font", font);
        params.append("max_font_size", max_font_size);
        params.append("boxes[0][text]", first);
        params.append("boxes[1][text]", second);
        params.append("boxes[2][text]", third);
        params.append("boxes[3][text]", forth);

        const { body } = await post(`https://api.imgflip.com/caption_image?${params}`);
        return body.data.url;
    }
}

module.exports = Meme;
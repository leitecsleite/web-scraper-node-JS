const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express(); 

const PORT = 3000; 

const url =`https://www.globo.com/`; 

app.get("/", async (req, res) => {
    try {
        const posts = await getGloboNews();
        res.status(200).json({posts});        
    } catch (erro) {
        res.status(500).json({erro});
    }
})


async function getGloboNews(){
    const response = await axios.get(url); 
    const html = response.data; 

    const $ = cheerio.load(html);

    const news = [];


    $('.post-row.with-6-posts .post').each(function(){
        const url = $(this).find('.post__link').attr('href');
        const title = $(this).find('.post__title').text();

        news.push({
            url,
            title
        });
    }); 

   return news;
}

getGloboNews();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
)
const axios = require("axios");
const cheerio = require("cheerio");

const createUrl = (page) =>
  `https://www.fincaraiz.com.co/proyectos-vivienda-nueva/bogota/?ad=30|${page}||||1||8|||67|3630001||||||||||||||||1|||1||random9%20asc||2||||&pc=1`;

async function fetchHTML(page) {
  try {
    const { data } = await axios.get(createUrl(page));

    return cheerio.load(data);
  } catch (error) {
    console.error("fetchHTML Error", error.toJSON().message);
    throw error;
  }
}

module.exports = { fetchHTML };

const ObjectsToCsv = require("objects-to-csv");
const { fetchHTML } = require("./utils");

const itemsPerPage = 30;

(async function start() {
  const data = [];

  try {
    console.log("Fetching Total");

    const initial$ = await fetchHTML(1);

    const totalItems = initial$("#lblNumInm").text();

    console.log(`Total Properties: ${totalItems}`);

    const numberOfPages = Math.ceil(totalItems / itemsPerPage);

    console.log(`Total Pages: ${numberOfPages}`);

    for (let index = 1; index <= numberOfPages; index++) {
      console.log(`Fetching Page ${index}`);

      const $ = await fetchHTML(index);

      $(".Grid-On").each((_, el) => {
        const title = initial$(el).find(".span-title>a>div>b").text().trim();

        const repeatedObj = data.find((item) => item.nombre === title);

        if (!repeatedObj) {
          data.push({
            tipo: "apartamento",
            estado: "nuevo",
            transaccion: "venta",
            nombre: title,
            cantidad: 1,
          });
        } else {
          repeatedObj.cantidad++;
        }
      });
    }
  } catch (error) {
    return;
  }

  console.log("data", data.length);

  try {
    console.log("Creating CSV");

    const csv = new ObjectsToCsv(data);

    await csv.toDisk("./fincaraiz.csv");

    console.log("CSV Created");
  } catch (err) {
    console.error("CSV Error", err);
  }
})();

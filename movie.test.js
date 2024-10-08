const { clickElement, selectDay, selectPlace, toDoOccupiedPlace } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("tickets booking", () => {
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("https://qamid.tmweb.ru/client/index.php");
    }, 600000);

    test("one ticket booking", async () => {
        await selectDay(page, '3');
        await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
        await selectPlace(page, '4', '5');
        const actual = await page.$("button");
        expect(actual).toMatchElement("button", {visible: true});
    });

    test("several tickets booking", async () => {
        await selectDay(page, '5');
        await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
        await selectPlace(page, '8', '5');
        await selectPlace(page, '8', '6');
        await selectPlace(page, '8', '7');
        const actual = await page.$("button");
        expect(actual).toMatchElement("button", {visible: true});
    });

    test("occupied ticket booking", async () => {
        await toDoOccupiedPlace(page, '2');
        await selectDay(page, '2');
        await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
        await clickElement(page, "span.buying-scheme__chair_taken");
        const actual = await page.$("button");
        expect(actual).toMatchElement("button", {visible: false});

    }); 
});
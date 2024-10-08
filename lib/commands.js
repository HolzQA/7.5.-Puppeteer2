module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  selectDay: async function (page, weekDay) {
    try {
      await page.waitForSelector('h1');
      await page.click(`a:nth-child(${weekDay})`);
    } catch (error) {
      throw new Error(`Selector is not clickable: a:nth-child(${weekDay})`);
    }
  },
  selectPlace: async function (page, row, place) {
    try {
      await page.waitForSelector('h1');
      await page.click(`div:nth-child(${row}) > span:nth-child(${place})`);
    } catch (error) {
      throw new Error(`Selector is not clickable: div:nth-child(${row}) > span:nth-child(${place})`);
    }
  },
  toDoOccupiedPlace: async function(page, weekDay) {
    try {
      this.selectDay(page, weekDay);
      this.clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
      this.selectPlace(page, '6', '6');
      await page.click("button");
      await page.click("button");
      await page.click("img");
    } catch (error) {
      throw new Error("Selector is not clickable");
    }
  }
 };

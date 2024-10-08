const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, selectDay, selectPlace } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user select {string} weekday for go cinema", { timeout: 60000}, async function (weekday) {
  await selectDay(this.page, weekday);
  await clickElement(this.page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
});

When("user select {string} row and {string} place", async function (row, place) {
  await selectPlace(this.page, row, place);
});

Then("button became colored", async function () {
  const actual = await page.$("button");
  expect(actual).toMatchElement("button", {visible: true});
});


/*--------------------------------------------------------------------------------------*/


Given("user select {string} weekday for go cinema with friends", { timeout: 60000}, async function (weekday) {
  await selectDay(this.page, weekday);
  await clickElement(this.page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
});

When("user select {string} row and {string}, {string}, {string} places", async function (row, place1, place2, place3) {
  await selectPlace(this.page, row, place1);
  await selectPlace(this.page, row, place2);
  await selectPlace(this.page, row, place3);
});

Then("button became colored too", async function () {
  const actual = await page.$("button");
  expect(actual).toMatchElement("button", {visible: true});
});

/*--------------------------------------------------------------------------------------*/


Given("user select {string} weekday", { timeout: 60000}, async function (weekday) {
  await toDoOccupiedPlace(this.page, weekday)
  await selectDay(this.page, weekday);
  await clickElement(this.page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
});

When("user select ocupied place", async function () {
  await selectPlace(this.page, row, place);
});

Then("button don't became colored", async function () {
  const actual = await page.$("button");
  expect(actual).toMatchElement("button", {visible: false});
});
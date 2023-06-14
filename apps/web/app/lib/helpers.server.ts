import puppeteer from "puppeteer";

export async function getBrowser() {
    return puppeteer.launch({ headless: 'new' })
}

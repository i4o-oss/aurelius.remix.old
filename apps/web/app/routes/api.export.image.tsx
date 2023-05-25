import { ActionArgs, json } from "@remix-run/node";
import puppeteer from 'puppeteer'

export async function action({ request }: ActionArgs) {
    switch (request.method) {
        case 'POST': {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            await page.goto('https://aurelius.ink/')
            await page.setViewport({ width: 1080, height: 1440 })
            await page.screenshot({ path: 'test.png' })
            await browser.close()

            return json({ message: 'success' }, 200)
        }
    }
}

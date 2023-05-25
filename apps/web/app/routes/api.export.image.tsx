import { TitleAlignment } from '@i4o/aurelius'
import { ActionArgs, json } from '@remix-run/node'
import puppeteer from 'puppeteer'

export async function action({ request }: ActionArgs) {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData()

            const author = formData.get('author') as string
            const background = formData.get('background') as string
            const content = formData.get('content') as string
            const footer = formData.get('footer') as string
            const title = formData.get('title') as string
            const titleAlignment = formData.get(
                'titleAlignment'
            ) as TitleAlignment
            const watermark = (formData.get('watermark') as string) === 'true'

            const browser = await puppeteer.launch({ headless: 'new' })
            const page = await browser.newPage()

            const url = `http://localhost:3000/renders/image/default?author=${encodeURIComponent(author)}&background=${encodeURIComponent(background)}&content=${encodeURIComponent(content)}&footer=${encodeURIComponent(footer)}&title=${encodeURIComponent(title)}&titleAlignment=${encodeURIComponent(titleAlignment)}&watermark=${encodeURIComponent(watermark)}`

            await page.goto(url)
            await page.waitForNetworkIdle()
            await page.setViewport({ width: 1080, height: 1440 })
            // get the base64-encoded png image
            const image = await page.screenshot({ encoding: 'base64', type: 'png' })

            // generate a filename for the image here since the page that receives the response won't have access to the title
            const slug = title
                ?.replace(/[^a-zA-Z ]/g, '')
                .toLowerCase()
                .split(' ')
                .join('-')
            const filename = slug || `aurelius_untitled_post_${Date.now()}`

            // await page.screenshot({ path: 'test.png' })
            //
            // close browser instance
            await browser.close()

            return json({ message: 'success', url: `data:image/png;base64,${image}`, name: `${filename}.png` }, 200)
        }
    }
}

import puppeteer from 'puppeteer'

const CHROME_DEFAULT_ARGS = [
    '--disable-client-side-phishing-detection',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-features=InterestFeedContentSuggestions',
    '--disable-features=Translate',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
]

export async function getBrowser() {
    return puppeteer.launch({
        headless: 'new',
        args: CHROME_DEFAULT_ARGS,
    })
}

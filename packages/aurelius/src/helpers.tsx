import cheerio from 'cheerio'
import { extract, hasProvider } from 'oembed-parser'

export function findUrlWithProvider(url: string) {
	let provider

	// build up a list of URL variations to test against because the oembed
	// providers list is not always up to date with scheme or www vs non-www
	let baseUrl = url.replace(/^\/\/|^https?:\/\/(?:www\.)?/, '')
	let testUrls = [
		`http://${baseUrl}`,
		`https://${baseUrl}`,
		`http://www.${baseUrl}`,
		`https://www.${baseUrl}`,
	]

	for (let testUrl of testUrls) {
		provider = hasProvider(testUrl)
		if (provider) {
			url = testUrl
			break
		}
	}

	return { url, provider }
}

export async function getOembed(url: string) {
	try {
		const oembed = await extract(url)
		return oembed
	} catch (e) {
		console.trace(e)
		return null
	}
}

export async function getOembedFromLink(url: string) {
	// if provider is not in the list, then check to see if there's an oembed link tag
	const response = await fetch(url, {
		method: 'GET',
		redirect: 'follow',
	})
	const data = await response.text()
	try {
		const html = cheerio.parseHTML(data)
		const oembedUrl = cheerio(
			'link[type="application/json+oembed"]',
			html
		).attr('href')

		if (!oembedUrl) return null

		const oembedResponse = fetch(oembedUrl, {
			method: 'GET',
			redirect: 'follow',
		})

		console.log('response: ', oembedResponse)
		return {}
	} catch (e) {
		console.trace(e)
		return null
	}
}

export async function getOembedDataFromScraper(url: string) {
	const metascraper = require('metascraper')([
		require('metascraper-url')(),
		require('metascraper-title')(),
		require('metascraper-description')(),
		require('metascraper-author')(),
		require('metascraper-publisher')(),
		require('metascraper-image')(),
		require('metascraper-logo-favicon')(),
		require('metascraper-logo')(),
	])
	const response = await fetch(url, {
		method: 'GET',
		redirect: 'follow',
	})
	const data = await response.text()

	try {
		const html = cheerio.parseHTML(data)
		const scraperResponse = await metascraper({ html, url })
		const metadata = Object.assign({}, scraperResponse, {
			thumbnail: scraperResponse.image,
			icon: scraperResponse.logo,
		})

		delete metadata.image
		delete metadata.logo

		return {
			url,
			metadata,
		}
	} catch (e) {
		console.trace(e)
		return null
	}
}

import { PassThrough } from 'stream'
import type { EntryContext } from '@remix-run/node'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { prisma } from '~/db.server'
import * as Sentry from '@sentry/remix'

Sentry.init({
	dsn: 'https://56e73be27d7845a681a3d7fcc0fcbe8d:ba0b10913fae423cafde214e9c5ac9ef@o4504987249803264.ingest.sentry.io/4504987253866496',
	enabled: process.env.NODE_ENV !== 'development',
	tracesSampleRate: 1,
	integrations: [new Sentry.Integrations.Prisma({ client: prisma })],
})

const ABORT_DELAY = 5000

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	return isbot(request.headers.get('user-agent'))
		? handleBotRequest(
				request,
				responseStatusCode,
				responseHeaders,
				remixContext
		  )
		: handleBrowserRequest(
				request,
				responseStatusCode,
				responseHeaders,
				remixContext
		  )
}

function handleBotRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	return new Promise((resolve, reject) => {
		let didError = false

		const { pipe, abort } = renderToPipeableStream(
			<RemixServer context={remixContext} url={request.url} />,
			{
				onAllReady() {
					const body = new PassThrough()

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						})
					)

					pipe(body)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				onError(error: unknown) {
					didError = true

					console.error(error)
				},
			}
		)

		setTimeout(abort, ABORT_DELAY)
	})
}

function handleBrowserRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	return new Promise((resolve, reject) => {
		let didError = false

		const { pipe, abort } = renderToPipeableStream(
			<RemixServer context={remixContext} url={request.url} />,
			{
				onShellReady() {
					const body = new PassThrough()

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						})
					)

					pipe(body)
				},
				onShellError(err: unknown) {
					reject(err)
				},
				onError(error: unknown) {
					didError = true

					console.error(error)
				},
			}
		)

		setTimeout(abort, ABORT_DELAY)
	})
}

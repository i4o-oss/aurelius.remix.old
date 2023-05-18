import { RemixBrowser, useLocation, useMatches } from '@remix-run/react'
import { startTransition, StrictMode, useEffect } from 'react'
import { hydrateRoot } from 'react-dom/client'
import * as Sentry from '@sentry/remix'
import * as amplitude from '@amplitude/analytics-browser'

// initialize sentry
Sentry.init({
    dsn: 'https://56e73be27d7845a681a3d7fcc0fcbe8d:ba0b10913fae423cafde214e9c5ac9ef@o4504987249803264.ingest.sentry.io/4504987253866496',
    enabled: process.env.NODE_ENV !== 'development',
    tracesSampleRate: 1,
    integrations: [
        new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.remixRouterInstrumentation(
                useEffect,
                useLocation,
                useMatches
            ),
        }),
    ],
})

// initialize amplitude but only on production
if (process.env.NODE_ENV === 'production') {
    amplitude.init('1c06c1f6182a4603d951153db30574bd', undefined, {
        defaultTracking: {
            sessions: true,
            pageViews: true,
            formInteractions: true,
            fileDownloads: true,
        },
    })
}

function hydrate() {
    startTransition(() => {
        hydrateRoot(
            document,
            <StrictMode>
                <RemixBrowser />
            </StrictMode>
        )
    })
}

if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(hydrate)
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    setTimeout(hydrate, 1)
}

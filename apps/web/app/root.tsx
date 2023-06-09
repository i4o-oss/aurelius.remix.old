import React, { useMemo } from 'react'
import type {
    LinksFunction,
    LoaderArgs,
    MetaFunction,
    SerializeFrom,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
    isRouteErrorResponse,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useFetchers,
    useLoaderData,
    useNavigation,
    useRouteError,
} from '@remix-run/react'
import { useEffect } from 'react'
import { withSentry } from '@sentry/remix'
import { ThemeHead, ThemeProvider, useTheme } from '~/lib/theme'
import { getThemeSession } from '~/lib/theme.server'
// @ts-ignore
import NProgress from 'nprogress'
import nProgressStyles from 'nprogress/nprogress.css'
import styles from '~/main.css'
import cuiStyles from '@i4o/catalystui/main.css'
import aureliusStyles from '@aurelius/writer/main.css'

interface DocumentProps {
    children: React.ReactNode
}

export const links: LinksFunction = () => {
    return [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:ital,wght@0,400;0,700;1,400;1,700&display=swap',
            crossOrigin: 'anonymous',
        },
        { rel: 'stylesheet', href: styles },
        { rel: 'stylesheet', href: nProgressStyles },
        { rel: 'stylesheet', href: cuiStyles },
        { rel: 'stylesheet', href: aureliusStyles },
        {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/tokyo-night-light.min.css',
        },
        {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/tokyo-night-dark.min.css',
            media: '(prefers-color-scheme: dark)',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
        },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
    ]
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    'msapplication-TileColor': '#2b5797',
    'og:site': 'https://aurelius.ink',
    'og:url': 'https://aurelius.ink',
    'og:title': 'Aurelius',
    'og:description':
        'Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.',
    'og:image': '/images/aurelius_open_graph.png',
    'theme-color': '#ffffff',
    title: 'Aurelius',
    description:
        'Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.',
    'twitter:card': 'summary_large_image',
    'twitter:site': '@aurelius_ink',
    'twitter:url': 'https://aurelius.ink/',
    'twitter:creator': '@aurelius_ink',
    'twitter:title': 'Aurelius',
    'twitter:description':
        'Beautiful, minimal writing app. Eliminate distractions when writing, build a writing habit, track your daily writing goal, and more.',
    'twitter:image': 'https://www.aurelius.ink/images/aurelius_open_graph.png',
    viewport: 'width=device-width,initial-scale=1',
})

export type LoaderData = SerializeFrom<typeof loader>

export const loader = async ({ request }: LoaderArgs) => {
    const themeSession = await getThemeSession(request)

    return json({
        theme: themeSession.getTheme(),
    })
}

const Document = ({ children }: DocumentProps) => {
    const data = useLoaderData<LoaderData>()
    const [theme] = useTheme()
    const navigation = useNavigation()
    const fetchers = useFetchers()

    /**
     * This gets the state of every fetcher active on the app and combine it with
     * the state of the global transition (Link and Form), then use them to
     * determine if the app is idle or if it's loading.
     * Here we consider both loading and submitting as loading.
     */
    let state = useMemo<'idle' | 'loading'>(
        function getGlobalState() {
            let states = [
                navigation.state,
                ...fetchers
                    .filter(
                        // use navigation.state only for page navigation.
                        // any navigation with formAction that starts with "/api" should be ignored
                        // this is done so any api call does not trigger nprogress and should only appear for page navigation
                        (fetcher) => !fetcher.formAction?.startsWith('/api')
                    )
                    .map((fetcher) => fetcher.state),
            ]
            if (states.every((state) => state === 'idle')) return 'idle'
            return 'loading'
        },
        [navigation.state, fetchers]
    )

    useEffect(() => {
        // and when it's something else it means it's either submitting a form or
        // waiting for the loaders of the next location, so we start it
        if (state === 'loading') NProgress.start()
        // when the state is idle then we can to complete the progress bar
        if (state === 'idle') NProgress.done()
    }, [navigation.state, state])

    return (
        <html
            lang='en'
            className={`h-screen w-screen ${theme ?? ''
                } cui-${theme} au-${theme}`}
        >
            <head>
                <Meta />
                <Links />
                <ThemeHead ssrTheme={Boolean(data.theme)} />
            </head>
            <body className='bg-primary h-full w-full font-sans'>
                {process.env.NODE_ENV !== 'development' ? (
                    <script
                        async
                        src='https://analytics.i4o.dev/script.js'
                        data-website-id='7621579d-ef19-4240-bef7-51e71ee9fa96'
                    ></script>
                ) : (
                    <script
                        async
                        src='https://analytics.i4o.dev/script.js'
                        data-website-id='efb3fedc-7312-4e9f-bb7d-7a2085019dd1'
                    ></script>
                )}
                {children}
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
            </body>
        </html>
    )
}

function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    )
}

function AppWithProviders() {
    const data = useLoaderData<LoaderData>()

    return (
        <ThemeProvider specifiedTheme={data.theme}>
            <App />
        </ThemeProvider>
    )
}

export function ErrorBoundary() {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        )
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        )
    } else {
        return <h1>Unknown Error</h1>
    }
}

export default withSentry(AppWithProviders)

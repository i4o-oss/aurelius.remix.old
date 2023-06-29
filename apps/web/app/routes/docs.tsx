import { json, LinksFunction, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getMdxHeadingsForV2Routes, Layout, RescribeProvider } from '@i4o/rescribe'
import config from '~/rescribe.config'
import rescribeStyles from '@i4o/rescribe/main.css'

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: rescribeStyles },
]

export async function loader({ request }: LoaderArgs) {
    const headings = await getMdxHeadingsForV2Routes(request)
    return json({ headings })
}

export default function Docs() {
    const data = useLoaderData()

    return (
        <RescribeProvider config={config}>
            <Layout data={data}>
                <Outlet />
            </Layout>
        </RescribeProvider>
    )
}

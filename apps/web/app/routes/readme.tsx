import { Outlet } from '@remix-run/react'
import { Footer, Header } from '~/components'

export default function ReadMe() {
    return (
        <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex min-h-[calc(100vh-20rem)] flex-1 items-start justify-center pb-16'>
                <article className='prose dark:prose-invert container relative max-w-3xl p-6 lg:py-10 lg:px-0'>
                    <h1 className='mt-8 mb-4 block text-4xl font-extrabold leading-tight lg:text-5xl'>
                        Readme
                    </h1>
                    <div className='text-lg leading-loose'>
                        <Outlet />
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    )
}

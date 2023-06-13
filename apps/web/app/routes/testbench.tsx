import { useEffect } from 'react'
import { useEvoluError } from '~/lib/evolu'
// import { useLocalPosts } from '~/lib/local'

export default function TestBench() {
    // const posts = useLocalPosts()
    const evoluError = useEvoluError()

    useEffect(() => {
        // eslint-disable-next-line no-console
        if (evoluError) console.log(evoluError)
    }, [evoluError])

    return <div>Test Bench</div>
}

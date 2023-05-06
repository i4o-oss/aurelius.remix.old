export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export const getFirstName = (name: string) => {
    const names = name.split(' ')
    return names[0]
}

export const getGreeting = (name: string) => {
    const hour = new Date().getHours()
    const firstName = name ? getFirstName(name) : ''

    if (hour >= 3 && hour < 6) return "Mornin' Sunshine!" // REALLY early
    if (hour >= 6 && hour < 12) {
        return firstName ? `Good morning, ${firstName}!` : 'Good morning!' // After 6am
    }
    if (hour >= 12 && hour < 17) {
        return firstName ? `Good afternoon, ${firstName}!` : 'Good afternoon!' // After 12pm
    }
    if (hour >= 17 && hour < 22) {
        return firstName ? `Good evening, ${firstName}!` : 'Good evening!' // After 5pm
    }
    if (hour >= 22 || hour < 3) {
        return firstName ? `Go to bed, ${firstName}!` : 'Go to bed!' // After 10pm
    }
}

export const toXmlSitemap = (urls: any[]) => {
    const urlsAsXml = urls
        .map((url) => `<url><loc>${url}</loc></url>`)
        .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${urlsAsXml}
    </urlset>`
}

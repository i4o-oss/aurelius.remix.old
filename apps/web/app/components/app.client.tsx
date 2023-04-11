import { Theme, Writer, WriterProps } from '@i4o/aurelius'

export default function App({
	post,
	savePost,
	saveWritingSession,
	sync,
	theme,
	toggleTheme,
	user,
}: WriterProps) {
	return (
		<Writer
			post={post}
			savePost={savePost}
			saveWritingSession={saveWritingSession}
			sync={sync}
			theme={theme as Theme}
			toggleTheme={toggleTheme}
			user={user}
		/>
	)
}

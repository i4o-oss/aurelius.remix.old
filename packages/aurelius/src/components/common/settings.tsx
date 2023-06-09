import { Dispatch, FormEvent, SetStateAction, useEffect } from 'react'
import { useState } from 'react'
import {
	Dialog,
	PrimaryButton,
	ScrollArea,
	Select,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	ToggleGroup,
} from '@i4o/catalystui'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'
import {
    BACKGROUND_OPTIONS,
	DEFAULT_BACKGROUND,
	DEFAULT_MUSIC_CHANNEL,
	LOCAL_STORAGE_KEYS,
	SETTINGS_LOCAL_STORAGE_KEY,
} from '../../constants'
import { DailyGoal, ProfileSettings, SettingsData } from '../../types'
import useDebounce from '../../hooks/use-debounce'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

interface SettingsDialogProps {
	checkUsername?: (username: string) => void
	fetcher?: any
	settings: SettingsData
	showSettingsDialog?: boolean
	setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
	updateSettings?: (update: any) => void
	updateUser?: (update: ProfileSettings) => void
	user?: any
}

export default function Settings({
	checkUsername,
	fetcher,
	settings,
	showSettingsDialog,
	setShowSettingsDialog,
	updateSettings,
	updateUser,
	user,
}: SettingsDialogProps) {
    const [savedDisplaySplashScreen] = useLocalStorage<boolean>(LOCAL_STORAGE_KEYS.SPLASH_SCREEN, true)
	const [background, setBackground] = useState<string>(
		settings?.background || DEFAULT_BACKGROUND
	)
	const [bio, setBio] = useState<string>(user?.bio || '')
	const [dailyGoal, setDailyGoal] = useState<DailyGoal>(
		settings?.dailyGoal || 'duration'
	)
	const [displaySplashScreen, setDisplaySplashScreen] = useState<boolean>(
		savedDisplaySplashScreen 
	)
	const [durationTarget, setDurationTarget] = useState<number>(() =>
		settings?.dailyGoal === 'duration' ? settings?.target || 20 : 20
	)
	const [footer, setFooter] = useState<string>(settings?.footer || '')
	const [musicChannel, setMusicChannel] = useState<string>(
		settings?.musicChannel || DEFAULT_MUSIC_CHANNEL
	)
	const [name, setName] = useState<string>(user?.name || '')
	const [username, setUsername] = useState<string>(user?.username || '')
	const [debouncedUsername, isDebouncing] = useDebounce(username, 1000)
	const [watermark, setWatermark] = useState<boolean>(
		settings?.watermark || true
	)
	const [wordCountTarget, setWordCountTarget] = useState<number>(() =>
		settings?.dailyGoal === 'wordCount' ? settings?.target || 300 : 300
	)
	const [youtubeVideo, setYoutubeVideo] = useState<string>(
		settings?.youtubeVideo || ''
	)

	useEffect(() => {
		if (
			typeof debouncedUsername !== 'undefined' &&
			debouncedUsername !== ''
		) {
			checkUsername?.(debouncedUsername)
		}
	}, [debouncedUsername])

	const saveGeneralSettings = (e: FormEvent) => {
		e.preventDefault()
		writeStorage(LOCAL_STORAGE_KEYS.SPLASH_SCREEN, displaySplashScreen)
	}

	const saveProfileSettings = (e: FormEvent) => {
		e.preventDefault()
		if (user) {
			const data = {
				name,
				bio,
				username: fetcher?.data?.isAvailable
					? username
					: user?.username,
			}

			updateUser?.(data)
		}
	}

	const saveGoalSettings = (e: FormEvent) => {
		e.preventDefault()
		if (user) {
			const data = {
				dailyGoal,
				target:
					dailyGoal === 'duration'
						? Number(durationTarget)
						: Number(wordCountTarget),
			}
			updateSettings?.(data)
		} else {
			const data: SettingsData = {
				...settings,
				dailyGoal,
				target:
					dailyGoal === 'duration'
						? Number(durationTarget)
						: Number(wordCountTarget),
			}
			writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
		}
	}

	const saveExportSettings = (e: FormEvent) => {
		e.preventDefault()
		if (user) {
			const data = {
				background,
				footer,
			}
			updateSettings?.(data)
		} else {
			const data: SettingsData = {
				...settings,
				background,
				footer,
				watermark,
			}
			writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
		}
	}

	const saveMusicSettings = (e: FormEvent) => {
		e.preventDefault()
		if (user) {
			const data = {
				musicChannel,
				youtubeVideo,
			}
			updateSettings?.(data)
		} else {
			const data: SettingsData = {
				...settings,
				musicChannel,
				youtubeVideo,
			}
			writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
		}
	}

	const USER_TABS = user
		? [
				{
					id: 'profile',
					title: <p className='au-text-left'>Profile</p>,
					content: (
						<ProfileSettings
							bio={bio}
							setBio={setBio}
							fetcher={fetcher}
							hasUsernameChanged={user?.username !== username}
							isDebouncing={isDebouncing}
							name={name}
							setName={setName}
							saveProfileSettings={saveProfileSettings}
							username={username}
							setUsername={setUsername}
						/>
					),
				},
		  ]
		: []

	const TABS = [
		{
			id: 'general',
			title: <p className='au-text-left'>General</p>,
			content: (
				<GeneralSettings
					displaySplashScreen={displaySplashScreen}
					setDisplaySplashScreen={setDisplaySplashScreen}
                    fetcher={fetcher}
					saveGeneralSettings={saveGeneralSettings}
				/>
			),
		},
		...USER_TABS,
		{
			id: 'goals',
			title: <p className='au-text-left'>Goals</p>,
			content: (
				<GoalSettings
					dailyGoal={dailyGoal}
					// @ts-ignore
					setDailyGoal={setDailyGoal}
					durationTarget={durationTarget}
					setDurationTarget={setDurationTarget}
					fetcher={fetcher}
					saveGoalSettings={saveGoalSettings}
					wordCountTarget={wordCountTarget}
					setWordCountTarget={setWordCountTarget}
				/>
			),
		},
		{
			id: 'export',
			title: <p className='au-text-left'>Export</p>,
			content: (
				<ExportSettings
					background={background}
					setBackground={setBackground}
					fetcher={fetcher}
					footer={footer}
					setFooter={setFooter}
					saveExportSettings={saveExportSettings}
					user={user}
					watermark={watermark}
					setWatermark={setWatermark}
				/>
			),
		},
		{
			id: 'music',
			title: <p className='au-text-left'>Music</p>,
			content: (
				<MusicSettings
					fetcher={fetcher}
					musicChannel={musicChannel}
					setMusicChannel={setMusicChannel}
					saveMusicSettings={saveMusicSettings}
					youtubeVideo={youtubeVideo}
					setYoutubeVideo={setYoutubeVideo}
				/>
			),
		},
	]

	return (
        // @ts-ignore
		<Dialog
			open={showSettingsDialog}
			onOpenChange={setShowSettingsDialog}
			title=''
			description=''
		>
			<Tabs defaultValue='general'>
				<div className='au-flex au-max-h-[96rem] au-min-h-[40rem] au-w-[64rem] [&_div[role="tablist"]]:!au-gap-2 au-rounded-lg au-overflow-hidden au-divide-x au-divide-subtle'>
					<div className='au-w-64 au-py-4 au-px-4 [&_button]:au-px-2 [&_button]:au-py-1.5 [&_button[data-state=active]]:au-bg-brand [&_button[data-state=active]]:au-text-white'>
						<h2 className='au-text-md au-font-medium au-text-primary-foreground au-mb-4'>
							Settings
						</h2>
						<TabsList tabs={TABS} type='column' />
					</div>
					<div className='au-w-full au-h-full au-min-h-[40rem] au-max-h-[40rem] au-flex-1 au-flex-grow au-grid-cols-2 au-gap-2'>
						<ScrollArea className='au-w-full au-min-h-[40rem] au-bg-transparent au-px-7 au-py-4 au-overflow-hidden'>
							<TabsContent tabs={TABS} type='column' />
						</ScrollArea>
					</div>
				</div>
			</Tabs>
		</Dialog>
	)
}

interface GeneralSettingsProps {
	displaySplashScreen: boolean
	setDisplaySplashScreen: Dispatch<SetStateAction<boolean>>
    fetcher?: any
	saveGeneralSettings: (e: FormEvent) => void
}

function GeneralSettings({
	displaySplashScreen,
	setDisplaySplashScreen,
    fetcher,
	saveGeneralSettings,
}: GeneralSettingsProps) {
	return (
		<form
			className='au-flex au-w-full au-flex-col au-items-start au-justify-start au-gap-8'
			onSubmit={saveGeneralSettings}
		>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Display Splash Screen
				</label>
				<div className='au-col-span-2 au-relative au-py-2 au-flex au-justify-end'>
					<Switch
						defaultChecked={displaySplashScreen}
						name='displaySplashScreen'
						onCheckedChange={(checked) =>
							setDisplaySplashScreen(checked)
						}
					/>
				</div>
			</div>
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton
					loading={fetcher?.state === 'submitting'}
					loadingText='Saving...'
					type='submit'
				>
					Save
				</PrimaryButton>
			</div>
		</form>
	)
}

interface ProfileSettingsProps {
	bio: string
	setBio: Dispatch<SetStateAction<string>>
	fetcher?: any
	hasUsernameChanged?: boolean
	isDebouncing?: boolean
	name: string
	setName: Dispatch<SetStateAction<string>>
	saveProfileSettings: (e: FormEvent) => void
	username: string
	setUsername: Dispatch<SetStateAction<string>>
}

function ProfileSettings({
	bio,
	setBio,
	fetcher,
	hasUsernameChanged,
	isDebouncing,
	name,
	setName,
	saveProfileSettings,
	username,
	setUsername,
}: ProfileSettingsProps) {
	return (
		<form
			className='au-flex au-w-full au-flex-col au-items-start au-justify-start au-gap-8'
			onSubmit={saveProfileSettings}
		>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Name
				</label>
				<input
					className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
					value={name}
					name='name'
					onChange={(e) => setName(e.target.value)}
					type='text'
				/>
			</div>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Bio
				</label>
				<textarea
					className='au-col-span-2 au-h-20 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
					value={bio}
					name='bio'
					onChange={(e) => setBio(e.target.value)}
				/>
			</div>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Username
				</label>
				<div className='au-col-span-2 au-flex au-flex-col au-items-start au-justify-start'>
					<input
						className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
						value={username}
						name='name'
						onChange={(e) => setUsername(e.target.value)}
						type='text'
					/>
					{isDebouncing ||
					fetcher?.state === 'submitting' ||
					fetcher?.state === 'loading' ? (
						<p className='au-text-primary-foreground-subtle au-text-xs au-font-normal au-py-1'>
							Checking...
						</p>
					) : null}
					{!isDebouncing && hasUsernameChanged && fetcher?.data ? (
						<>
							{fetcher?.data?.isAvailable ? (
								<p className='au-text-brand au-text-xs au-font-normal au-py-1 au-flex au-items-center'>
									<CheckIcon />
									Available
								</p>
							) : (
								<p className='au-text-red-500 au-text-xs au-font-normal au-py-1 au-flex au-items-center'>
									<Cross2Icon />
									Not Available
								</p>
							)}
						</>
					) : null}
				</div>
			</div>
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton
					loading={fetcher?.state === 'submitting'}
					loadingText='Saving...'
					type='submit'
				>
					Save
				</PrimaryButton>
			</div>
		</form>
	)
}

interface GoalSettingsProps {
	dailyGoal: DailyGoal
	setDailyGoal: (value: string) => void
	durationTarget: number
	setDurationTarget: Dispatch<SetStateAction<number>>
	fetcher?: any
	saveGoalSettings: (e: FormEvent) => void
	wordCountTarget: number
	setWordCountTarget: Dispatch<SetStateAction<number>>
}

function GoalSettings({
	dailyGoal,
	setDailyGoal,
	durationTarget,
	setDurationTarget,
	fetcher,
	saveGoalSettings,
	wordCountTarget,
	setWordCountTarget,
}: GoalSettingsProps) {
	return (
		<form
			className='au-flex au-w-full au-flex-col au-items-start au-justify-start au-gap-8'
			onSubmit={saveGoalSettings}
		>
			<div className='au-w-full [&_div[role="group"]]:au-col-span-2 [&_div[role="group"]]:au-divide-y-0 [&_div[role="group"]]:au-divide-x au-grid au-grid-cols-3 au-gap-2 au-text-primary-foreground [&_button[role="radio"]]:au-h-full [&_button[role="radio"]]:au-p-0 [&_button[role="radio"]]:au-col-span-1 [&_button[role="radio"]]:au-rounded-none [&_div[role="group"]]:au-grid [&_div[role="group"]]:au-h-10 [&_div[role="group"]]:au-w-full [&_div[role="group"]]:au-grid-cols-2 [&_div[role="group"]]:au-overflow-hidden [&_div[role="group"]]:au-rounded-lg'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Daily Goal
				</label>
				<ToggleGroup
					items={[
						{
							value: 'duration',
							label: 'Duration',
							icon: (
								<div className='au-flex au-w-full au-h-full au-items-center au-justify-center au-py-2 au-px-4'>
									<span>Duration</span>
								</div>
							),
						},
						{
							value: 'wordCount',
							label: 'Word Count',
							icon: (
								<div className='au-flex au-w-full au-h-full au-items-center au-justify-center au-py-2 au-px-4'>
									<span>Word Count</span>
								</div>
							),
						},
					]}
					// @ts-ignore
					defaultValue={dailyGoal}
					onValueChange={setDailyGoal}
					orientation='vertical'
					type='single'
				/>
			</div>
			{dailyGoal === 'duration' ? (
				<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
					<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
						Duration (in minutes)
					</label>
					<input
						className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
						value={durationTarget}
						name='wordCount'
						onChange={(e) =>
							setDurationTarget(Number(e.target.value))
						}
						type='text'
					/>
				</div>
			) : (
				<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
					<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
						Word Count
					</label>
					<input
						className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
						value={wordCountTarget}
						name='wordCount'
						onChange={(e) =>
							setWordCountTarget(Number(e.target.value))
						}
						type='text'
					/>
				</div>
			)}
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton
					loading={fetcher?.state === 'submitting'}
					loadingText='Saving...'
					type='submit'
				>
					Save
				</PrimaryButton>
			</div>
		</form>
	)
}

interface ExportSettingsProps {
	background: string
	setBackground: Dispatch<SetStateAction<string>>
	fetcher?: any
	footer: string
	setFooter: Dispatch<SetStateAction<string>>
	saveExportSettings: (e: FormEvent) => void
	user?: any
	watermark: boolean
	setWatermark: Dispatch<SetStateAction<boolean>>
}

function ExportSettings({
	background,
	setBackground,
	fetcher,
	footer,
	setFooter,
	saveExportSettings,
	user,
	watermark,
	setWatermark,
}: ExportSettingsProps) {
	const backgroundItems = BACKGROUND_OPTIONS.map((option) => ({
		value: option,
		label: '',
		icon: (
			<div
				className='au-aspect-[8/9] au-p-1'
				style={{
					backgroundImage: option,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			/>
		),
	}))

	return (
		<form
			className='au-flex au-w-full au-flex-col au-items-center au-justify-start au-gap-8'
			onSubmit={saveExportSettings}
		>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Background
				</label>
				<div className='au-col-span-2 au-relative au-py-2 [&_>_div]:au-grid [&_>_div]:au-grid-cols-2 [&_>_div]:au-gap-4 [&_>_div]:au-w-full [&_button]:!au-p-2 [&_button]:!au-overflow-hidden [&_button[data-state=on]]:!au-bg-brand [&_button]:!au-rounded-lg'>
					<ToggleGroup
						defaultValue={background}
						items={backgroundItems}
						onValueChange={(value) => setBackground(value)}
						type='single'
					/>
				</div>
			</div>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Footer Text
				</label>
				<input
					className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
					defaultValue={footer}
					name='yt'
					onChange={(e) => setFooter(e.target.value)}
					type='text'
				/>
			</div>
			{user ? (
				<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
					<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
						Watermark
					</label>
					<div className='au-relative au-py-2'>
						<Switch
							defaultChecked={watermark}
							name='watermark'
							onCheckedChange={(checked) => setWatermark(checked)}
						/>
					</div>
				</div>
			) : null}
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton
					loading={fetcher?.state === 'submitting'}
					loadingText='Saving...'
					type='submit'
				>
					Save
				</PrimaryButton>
			</div>
		</form>
	)
}

interface MusicSettingsProps {
	fetcher?: any
	musicChannel: string
	setMusicChannel: Dispatch<SetStateAction<string>>
	saveMusicSettings: (e: FormEvent) => void
	youtubeVideo: string
	setYoutubeVideo: Dispatch<SetStateAction<string>>
}

function MusicSettings({
	fetcher,
	musicChannel,
	setMusicChannel,
	saveMusicSettings,
	youtubeVideo,
	setYoutubeVideo,
}: MusicSettingsProps) {
	const CHANNELS = [
		{ value: 'lofi-hiphop', label: 'LoFi Hip Hop' },
		{ value: 'chill-synth', label: 'Chill Synth' },
		{ value: 'chillstep', label: 'Chillstep' },
		{ value: 'post-rock', label: 'Post Rock' },
	]

	return (
		<form
			className='au-flex au-w-full au-flex-col au-items-center au-justify-start au-gap-8'
			onSubmit={saveMusicSettings}
		>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Channels
				</label>
				<div className='au-relative'>
					<Select
						defaultValue={musicChannel}
						items={CHANNELS}
						name='music-channels'
						onValueChange={setMusicChannel}
					/>
				</div>
			</div>
			<div className='au-grid au-grid-cols-3 au-w-full au-gap-2'>
				<label className='au-col-span-1 au-py-2 au-text-sm au-font-medium au-text-primary-foreground'>
					Youtube Video/Playlist
				</label>
				<input
					className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
					defaultValue={youtubeVideo}
					name='yt'
					onChange={(e) => setYoutubeVideo(e.target.value)}
					type='text'
				/>
			</div>
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton
					loading={fetcher?.state === 'submitting'}
					loadingText='Saving...'
					type='submit'
				>
					Save
				</PrimaryButton>
			</div>
		</form>
	)
}

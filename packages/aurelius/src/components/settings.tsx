// TODO: Move this component to web package?
// TODO: Tabs light and dark mode styles are messed up. Fix them in catalyst ui.
//
import { Dispatch, FormEvent, SetStateAction } from 'react'
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
import { writeStorage } from '@rehooks/local-storage'
import {
	DEFAULT_BACKGROUND,
	DEFAULT_MUSIC_CHANNEL,
	SETTINGS_LOCAL_STORAGE_KEY,
} from '../constants'
import { DailyGoal, SettingsData } from '../types'

interface SettingsProps {
	settings: SettingsData
	showSettingsDialog?: boolean
	setShowSettingsDialog?: Dispatch<SetStateAction<boolean>>
	user?: any
}

export default function Settings({
	settings,
	showSettingsDialog,
	setShowSettingsDialog,
	user,
}: SettingsProps) {
	const [background, setBackground] = useState<string>(
		settings?.export?.background || DEFAULT_BACKGROUND
	)
	const [bio, setBio] = useState<string>('')
	const [dailyGoal, setDailyGoal] = useState<DailyGoal>(
		// @ts-ignore
		settings?.goals?.dailyGoal || 'duration'
	)
	const [durationTarget, setDurationTarget] = useState<number>(
		settings?.goals?.durationTarget || 20
	)
	const [footer, setFooter] = useState<string>(settings?.export?.footer || '')
	const [musicChannel, setMusicChannel] = useState<string>(
		settings?.music?.musicChannel || DEFAULT_MUSIC_CHANNEL
	)
	const [name, setName] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [wordCountTarget, setWordCountTarget] = useState<number>(
		settings?.goals?.wordCountTarget || 300
	)
	const [youtubeVideo, setYoutubeVideo] = useState<string>(
		settings?.music?.youtubeVideo || ''
	)

	const saveProfileSettings = (e: FormEvent) => {
		e.preventDefault()
	}

	const saveGoalSettings = (e: FormEvent) => {
		e.preventDefault()
		const data: SettingsData = {
			...settings,
			goals: {
				dailyGoal,
				durationTarget: Number(durationTarget),
				wordCountTarget: Number(wordCountTarget),
			},
		}
		writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
	}

	const saveExportSettings = (e: FormEvent) => {
		e.preventDefault()
		const data: SettingsData = {
			...settings,
			export: {
				background,
				footer,
			},
		}
		writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
	}

	const saveMusicSettings = (e: FormEvent) => {
		e.preventDefault()
		const data: SettingsData = {
			...settings,
			music: {
				musicChannel,
				youtubeVideo,
			},
		}
		writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
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
					footer={footer}
					setFooter={setFooter}
					saveExportSettings={saveExportSettings}
				/>
			),
		},
		{
			id: 'music',
			title: <p className='au-text-left'>Music</p>,
			content: (
				<MusicSettings
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
		<Dialog
			open={showSettingsDialog}
			onOpenChange={setShowSettingsDialog}
			title=''
			description=''
		>
			<Tabs defaultValue={user ? 'profile' : 'goals'}>
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

interface ProfileSettingsProps {
	bio: string
	setBio: Dispatch<SetStateAction<string>>
	name: string
	setName: Dispatch<SetStateAction<string>>
	saveProfileSettings: (e: FormEvent) => void
	username: string
	setUsername: Dispatch<SetStateAction<string>>
}

function ProfileSettings({
	bio,
	setBio,
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
				<input
					className='au-col-span-2 au-h-10 au-w-full au-rounded-md au-px-4 au-py-2 au-text-sm au-font-medium au-text-primary-foreground au-border au-border-subtle au-bg-transparent'
					value={username}
					name='name'
					onChange={(e) => setUsername(e.target.value)}
					type='text'
				/>
			</div>
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton type='submit'>Save</PrimaryButton>
			</div>
		</form>
	)
}

interface GoalSettingsProps {
	dailyGoal: DailyGoal
	setDailyGoal: (value: string) => void
	durationTarget: number
	setDurationTarget: Dispatch<SetStateAction<number>>
	saveGoalSettings: (e: FormEvent) => void
	wordCountTarget: number
	setWordCountTarget: Dispatch<SetStateAction<number>>
}

function GoalSettings({
	dailyGoal,
	setDailyGoal,
	durationTarget,
	setDurationTarget,
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
							value: 'word-count',
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
				<PrimaryButton type='submit'>Save</PrimaryButton>
			</div>
		</form>
	)
}

interface ExportSettingsProps {
	background: string
	setBackground: Dispatch<SetStateAction<string>>
	footer: string
	setFooter: Dispatch<SetStateAction<string>>
	saveExportSettings: (e: FormEvent) => void
	user?: any
}

function ExportSettings({
	background,
	setBackground,
	footer,
	setFooter,
	saveExportSettings,
	user,
}: ExportSettingsProps) {
	const BACKGROUND_OPTIONS = [
		'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
		'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
		'linear-gradient(45deg, #8bc6ec 0%, #9599e2 100%)',
		'linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)',
		'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
		'linear-gradient(to top, #d299c2 0%, #fef9d7 100%)',
		'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
		'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
	]

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
						<Switch name='music-channels' />
					</div>
				</div>
			) : null}
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton type='submit'>Save</PrimaryButton>
			</div>
		</form>
	)
}

interface MusicSettingsProps {
	musicChannel: string
	setMusicChannel: Dispatch<SetStateAction<string>>
	saveMusicSettings: (e: FormEvent) => void
	youtubeVideo: string
	setYoutubeVideo: Dispatch<SetStateAction<string>>
}

function MusicSettings({
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

	const SELECTED_CHANNEL = CHANNELS.find(
		(channel) => channel.value === musicChannel
	)

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
						defaultValue={SELECTED_CHANNEL?.value}
						items={CHANNELS}
						name='music-channels'
						onValueChange={(channel) =>
							setMusicChannel(channel.value)
						}
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
				<PrimaryButton type='submit'>Save</PrimaryButton>
			</div>
		</form>
	)
}

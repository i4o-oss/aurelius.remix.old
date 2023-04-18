// TODO: Move this component to web package?
// TODO: Tabs light and dark mode styles are messed up. Fix them in catalyst ui.
//
import { Dispatch, FormEvent, SetStateAction, useContext } from 'react'
import { useState } from 'react'
import {
	Dialog,
	PrimaryButton,
	Tabs,
	TabsContent,
	TabsList,
	ToggleGroup,
} from '@i4o/catalystui'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'
import { SETTINGS_LOCAL_STORAGE_KEY } from '../../constants'
import { AureliusContext, AureliusProviderData } from './provider'

type DailyGoal = 'duration' | 'wordCount'

interface GoalSettings {
	dailyGoal: DailyGoal
	durationTarget: number
	wordCountTarget: number
}

interface MusicSettings {
	youtubeVideo: string
}

interface Settings {
	goals?: GoalSettings
	music?: MusicSettings
}

export default function Settings() {
	const context: AureliusProviderData = useContext(AureliusContext)
	const { showSettingsDialog, setShowSettingsDialog } = context
	const [settings] = useLocalStorage<string>(SETTINGS_LOCAL_STORAGE_KEY)
	const savedDailyGoal = (JSON.parse(JSON.stringify(settings)) as Settings)
		?.goals?.dailyGoal
	const savedDurationTarget = (
		JSON.parse(JSON.stringify(settings)) as Settings
	)?.goals?.durationTarget
	const savedWordCountTarget = (
		JSON.parse(JSON.stringify(settings)) as Settings
	)?.goals?.wordCountTarget
	const savedYoutubeVideo = (JSON.parse(JSON.stringify(settings)) as Settings)
		?.music?.youtubeVideo
	const [dailyGoal, setDailyGoal] = useState<DailyGoal>(
		// @ts-ignore
		(savedDailyGoal as string) || 'duration'
	)
	const [durationTarget, setDurationTarget] = useState<number>(
		(savedDurationTarget as number) || 20
	)
	const [wordCountTarget, setWordCountTarget] = useState<number>(
		(savedWordCountTarget as number) || 300
	)
	const [youtubeVideo, setYoutubeVideo] = useState<string>(
		(savedYoutubeVideo as string) || ''
	)

	const saveGoalSettings = (e: FormEvent) => {
		e.preventDefault()
		const data: Settings = {
			...JSON.parse(JSON.stringify(settings)),
			goals: {
				dailyGoal,
				durationTarget: Number(durationTarget),
				wordCountTarget: Number(wordCountTarget),
			},
		}
		writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
	}

	const saveMusicSettings = (e: FormEvent) => {
		e.preventDefault()
		const data: Settings = {
			...JSON.parse(JSON.stringify(settings)),
			music: {
				youtubeVideo,
			},
		}
		writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
	}

	const TABS = [
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
			id: 'music',
			title: <p className='au-text-left'>Music</p>,
			content: (
				<MusicSettings
					saveMusicSettings={saveMusicSettings}
					youtubeVideo={youtubeVideo}
					setYoutubeVideo={setYoutubeVideo}
				/>
			),
		},
	]

	return (
		<Dialog
			isOpen={showSettingsDialog}
			onOpenChange={setShowSettingsDialog}
			title=''
			description=''
		>
			<Tabs defaultValue='goals'>
				<div className='au-flex au-max-h-[96rem] au-min-h-[40rem] au-w-[64rem] [&_div[role="tablist"]]:!au-gap-2 au-rounded-lg au-overflow-hidden'>
					<div className='au-w-64 au-bg-gray-100 dark:au-bg-gray-900 au-p-4'>
						<h2 className='au-text-md au-font-medium au-text-gray-900 dark:au-text-gray-100 au-mb-4'>
							Settings
						</h2>
						<TabsList tabs={TABS} type='column' />
					</div>
					<div className='au-w-full au-flex-1 au-flex-grow au-grid-cols-2 au-gap-2 au-px-4 au-py-8'>
						<TabsContent tabs={TABS} type='column' />
					</div>
				</div>
			</Tabs>
		</Dialog>
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
			className='au-flex au-w-full au-flex-col au-items-start au-justify-start au-gap-8 au-pl-2'
			onSubmit={saveGoalSettings}
		>
			{/* <div className='[&_button[role="radio"]]:nth-child(2):au-border-b [&_div[role="group"]]:au-divide au-flex au-w-full au-flex-col au-items-start au-justify-center au-gap-2 au-text-white [&_button[role="radio"]]:au-col-span-1 [&_button[role="radio"]]:au-rounded-none [&_div[role="group"]]:au-grid [&_div[role="group"]]:au-w-full [&_div[role="group"]]:au-grid-cols-1 [&_div[role="group"]]:au-overflow-hidden [&_div[role="group"]]:au-rounded-lg'> */}
			{/* 	<label className='au-text-sm au-font-medium au-text-black dark:au-text-white'> */}
			{/* 		Streak */}
			{/* 	</label> */}
			{/* 	<ToggleGroup */}
			{/* 		items={[ */}
			{/* 			{ */}
			{/* 				value: '3', */}
			{/* 				label: '3 days', */}
			{/* 				icon: ( */}
			{/* 					<div className='au-flex au-w-full au-items-center au-justify-between au-p-4'> */}
			{/* 						<span>3 days</span> */}
			{/* 						<span>Beginner</span> */}
			{/* 					</div> */}
			{/* 				), */}
			{/* 			}, */}
			{/* 			{ */}
			{/* 				value: '7', */}
			{/* 				label: '7 days', */}
			{/* 				icon: ( */}
			{/* 					<div className='au-flex au-w-full au-items-center au-justify-between au-p-4'> */}
			{/* 						<span>7 days</span> */}
			{/* 						<span>Solid Start</span> */}
			{/* 					</div> */}
			{/* 				), */}
			{/* 			}, */}
			{/* 			{ */}
			{/* 				value: '14', */}
			{/* 				label: '14 days', */}
			{/* 				icon: ( */}
			{/* 					<div className='au-flex au-w-full au-items-center au-justify-between au-p-4'> */}
			{/* 						<span>14 days</span> */}
			{/* 						<span>Committed</span> */}
			{/* 					</div> */}
			{/* 				), */}
			{/* 			}, */}
			{/* 			{ */}
			{/* 				value: '30', */}
			{/* 				label: '30 days', */}
			{/* 				icon: ( */}
			{/* 					<div className='au-flex au-w-full au-items-center au-justify-between au-p-4'> */}
			{/* 						<span>30 days</span> */}
			{/* 						<span>On Fire</span> */}
			{/* 					</div> */}
			{/* 				), */}
			{/* 			}, */}
			{/* 		]} */}
			{/* 		// @ts-ignore */}
			{/* 		defaultValue={streakGoal} */}
			{/* 		onValueChange={setStreakGoal} */}
			{/* 		orientation='vertical' */}
			{/* 		type='single' */}
			{/* 	/> */}
			{/* </div> */}
			<div className='[&_div[role="group"]]:au-divide-y-0 [&_div[role="group"]]:au-divide-x au-flex au-flex-col au-items-start au-justify-center au-gap-2 au-text-white [&_button[role="radio"]]:au-h-full [&_button[role="radio"]]:au-p-0 [&_button[role="radio"]]:au-col-span-1 [&_button[role="radio"]]:au-rounded-none [&_div[role="group"]]:au-grid [&_div[role="group"]]:au-h-10 [&_div[role="group"]]:au-w-full [&_div[role="group"]]:au-grid-cols-2 [&_div[role="group"]]:au-overflow-hidden [&_div[role="group"]]:au-rounded-lg'>
				<label className='au-text-sm au-font-medium au-text-black dark:au-text-white'>
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
				<div className='au-flex au-w-full au-flex-col au-items-start au-justify-center au-gap-2'>
					<label className='au-text-sm au-font-medium au-text-black dark:au-text-white'>
						Duration (in minutes)
					</label>
					<input
						className='au-h-10 au-w-full au-rounded-md au-bg-gray-100 au-px-4 au-py-2 au-text-sm au-font-medium au-text-black dark:au-bg-gray-900 dark:au-text-white'
						value={durationTarget}
						name='wordCount'
						onChange={(e) =>
							setDurationTarget(Number(e.target.value))
						}
						type='text'
					/>
				</div>
			) : (
				<div className='au-flex au-w-full au-flex-col au-items-start au-justify-center au-gap-2'>
					<label className='au-text-sm au-font-medium au-text-black dark:au-text-white'>
						Word Count
					</label>
					<input
						className='au-h-10 au-w-full au-rounded-md au-bg-gray-100 au-px-4 au-py-2 au-text-sm au-font-medium au-text-black dark:au-bg-gray-900 dark:au-text-white'
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

interface MusicSettingsProps {
	saveMusicSettings: (e: FormEvent) => void
	youtubeVideo: string
	setYoutubeVideo: Dispatch<SetStateAction<string>>
}

function MusicSettings({
	saveMusicSettings,
	youtubeVideo,
	setYoutubeVideo,
}: MusicSettingsProps) {
	return (
		<form
			className='au-flex au-w-full au-flex-col au-items-center au-justify-start au-gap-8 au-pl-2'
			onSubmit={saveMusicSettings}
		>
			<div className='au-flex au-w-full au-flex-col au-items-start au-justify-center au-gap-2'>
				<label className='au-text-sm au-font-medium au-text-black dark:au-text-white'>
					Youtube Video/Playlist
				</label>
				<input
					className='au-h-10 au-w-full au-rounded-md au-bg-gray-100 au-px-4 au-py-2 au-text-sm au-font-medium au-text-black dark:au-bg-gray-900 dark:au-text-white'
					defaultValue={youtubeVideo}
					name='yt'
					onChange={(e) => setYoutubeVideo(e.target.value)}
					type='text'
				/>
			</div>
			{/* <div className='flex w-full flex-col items-start justify-center gap-2'> */}
			{/* 	<label className='text-sm font-medium text-white'> */}
			{/* 		Spotify Integration */}
			{/* 	</label> */}
			{/* 	<PrimaryButton className=''> */}
			{/* 		Connect to Spotify */}
			{/* 	</PrimaryButton> */}
			{/* 	<input */}
			{/* 		className='h-10 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white' */}
			{/* 		name='spotifyPlaylist' */}
			{/* 		type='text' */}
			{/* 	/> */}
			{/* </div> */}
			<div className='au-flex au-w-full au-items-center au-justify-end'>
				<PrimaryButton type='submit'>Save</PrimaryButton>
			</div>
		</form>
	)
}

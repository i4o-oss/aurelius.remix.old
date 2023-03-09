import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { useState } from 'react'
import { Dialog, PrimaryButton, Tabs, ToggleGroup } from '@i4o/catalystui'
import useLocalStorage, { writeStorage } from '@rehooks/local-storage'
import { SETTINGS_LOCAL_STORAGE_KEY } from '../../constants'

interface GoalSettings {
	streakGoal: string
	wordCountGoal: number
}

interface MusicSettings {
	youtubeVideo: string
}

interface Settings {
	goals?: GoalSettings
	music?: MusicSettings
}

export default function Settings({
	showSettingsDialog,
	setShowSettingsDialog,
}: {
	showSettingsDialog: boolean
	setShowSettingsDialog: Dispatch<SetStateAction<boolean>>
}) {
	const [settings] = useLocalStorage<string>(SETTINGS_LOCAL_STORAGE_KEY)
	const savedStreakGoal = (JSON.parse(JSON.stringify(settings)) as Settings)
		?.goals?.streakGoal
	const savedWordCountGoal = (
		JSON.parse(JSON.stringify(settings)) as Settings
	)?.goals?.wordCountGoal
	const savedYoutubeVideo = (JSON.parse(JSON.stringify(settings)) as Settings)
		?.music?.youtubeVideo
	const [streakGoal, setStreakGoal] = useState<string>(
		(savedStreakGoal as string) || '14'
	)
	const [wordCountGoal, setWordCountGoal] = useState<number>(
		(savedWordCountGoal as number) || 300
	)
	const [youtubeVideo, setYoutubeVideo] = useState<string>(
		(savedYoutubeVideo as string) || ''
	)

	const saveGoalSettings = (e: FormEvent) => {
		e.preventDefault()
		const data: Settings = {
			...JSON.parse(JSON.stringify(settings)),
			goals: {
				streakGoal,
				wordCountGoal: Number(wordCountGoal),
			},
		}
		console.log(data)
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
		console.log(data)
		writeStorage(SETTINGS_LOCAL_STORAGE_KEY, data)
	}

	return (
		<Dialog
			isOpen={showSettingsDialog}
			onOpenChange={setShowSettingsDialog}
			title='Settings'
		>
			<div className='max-h-[96rem] min-h-[24rem] w-[48rem] [&_div[role="tablist"]]:!gap-2'>
				<Tabs
					defaultValue='goals'
					tabs={[
						{
							id: 'goals',
							title: <p className='text-left'>Goals</p>,
							content: (
								<form
									className='flex w-full flex-col items-center justify-start gap-8 pl-2'
									onSubmit={saveGoalSettings}
								>
									<div className='[&_button[role="radio"]]:nth-child(2):border-b [&_div[role="group"]]:divide flex w-full flex-col items-start justify-center gap-2 text-white [&_button[role="radio"]]:col-span-1 [&_button[role="radio"]]:rounded-none [&_div[role="group"]]:grid [&_div[role="group"]]:w-full [&_div[role="group"]]:grid-cols-1 [&_div[role="group"]]:overflow-hidden [&_div[role="group"]]:rounded-lg'>
										<label className='text-sm font-medium text-white'>
											Streak
										</label>
										<ToggleGroup
											items={[
												{
													value: '3',
													label: '3 days',
													icon: (
														<div className='flex w-full items-center justify-between p-4'>
															<span>3 days</span>
															<span>
																Beginner
															</span>
														</div>
													),
												},
												{
													value: '7',
													label: '7 days',
													icon: (
														<div className='flex w-full items-center justify-between p-4'>
															<span>7 days</span>
															<span>
																Solid Start
															</span>
														</div>
													),
												},
												{
													value: '14',
													label: '14 days',
													icon: (
														<div className='flex w-full items-center justify-between p-4'>
															<span>14 days</span>
															<span>
																Committed
															</span>
														</div>
													),
												},
												{
													value: '30',
													label: '30 days',
													icon: (
														<div className='flex w-full items-center justify-between p-4'>
															<span>30 days</span>
															<span>On Fire</span>
														</div>
													),
												},
											]}
											// @ts-ignore
											defaultValue={streakGoal}
											onValueChange={setStreakGoal}
											orientation='vertical'
											type='single'
										/>
									</div>
									<div className='flex w-full flex-col items-start justify-center gap-2'>
										<label className='text-sm font-medium text-white'>
											Word Count / Day
										</label>
										<input
											className='h-10 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white'
											defaultValue={wordCountGoal}
											name='wordCount'
											onChange={(e) =>
												setWordCountGoal(
													Number(e.target.value)
												)
											}
											type='text'
										/>
									</div>
									<div className='flex w-full items-center justify-end'>
										<PrimaryButton type='submit'>
											Save
										</PrimaryButton>
									</div>
								</form>
							),
						},
						{
							id: 'music',
							title: <p className='text-left'>Music</p>,
							content: (
								<form
									className='flex w-full flex-col items-center justify-start gap-8 pl-2'
									onSubmit={saveMusicSettings}
								>
									<div className='flex w-full flex-col items-start justify-center gap-2'>
										<label className='text-sm font-medium text-white'>
											Youtube Video/Playlist
										</label>
										<input
											className='h-10 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white'
											defaultValue={youtubeVideo}
											name='yt'
											onChange={(e) =>
												setYoutubeVideo(e.target.value)
											}
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
									<div className='flex w-full items-center justify-end'>
										<PrimaryButton type='submit'>
											Save
										</PrimaryButton>
									</div>
								</form>
							),
						},
					]}
					type='column'
				/>
			</div>
		</Dialog>
	)
}

import * as Schema from '@effect/schema/Schema'
import { pipe } from '@effect/data/Function'
import * as Evolu from 'evolu'
import type { UseMutation } from 'evolu'

const PostId = Evolu.id('Post')
type PostId = Schema.To<typeof PostId>

const Content = pipe(Schema.string, Schema.minLength(1))
type Content = Schema.To<typeof Content>

const WordCount = pipe(Schema.number, Schema.greaterThan(0))
type WordCount = Schema.To<typeof WordCount>

const PostTable = Schema.struct({
	id: PostId,
	title: Evolu.NonEmptyString1000,
	content: Content,
	createdAt: Evolu.SqliteDate,
	wordCount: WordCount,
})
type PostTable = Schema.To<typeof PostTable>

const Database = Schema.struct({
	post: PostTable,
})

// @ts-ignore
export const { useMutation }: { useMutation: UseMutation } = Evolu.create(Database)


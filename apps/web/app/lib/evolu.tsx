import * as Schema from '@effect/schema/Schema'
import { pipe } from '@effect/data/Function'
import { create, id, SqliteDate } from 'evolu'

const PostId = id('Post')
type PostId = Schema.To<typeof PostId>

const Title = pipe(Schema.string, Schema.minLength(1))
type Title = Schema.To<typeof Title>

const Content = pipe(Schema.string, Schema.minLength(1))
type Content = Schema.To<typeof Content>

const WordCount = pipe(Schema.number, Schema.greaterThan(0))
type WordCount = Schema.To<typeof WordCount>

const PostTable = Schema.struct({
	id: PostId,
	title: Title,
	content: Content,
	createdAt: SqliteDate,
	wordCount: WordCount,
})
type PostTable = Schema.To<typeof PostTable>

const Database = Schema.struct({
	post: PostTable,
})

export const { useMutation, useQuery, useEvoluError } = create(Database)


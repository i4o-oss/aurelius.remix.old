import * as Schema from '@effect/schema/Schema'
import * as Evolu from 'evolu'

const PostId = Evolu.id('Post')
type PostId = Schema.To<typeof PostId>

const PostTable = Schema.struct({
    id: PostId,
    title: Evolu.String1000,
    isCompleted: Evolu.SqliteBoolean,
})
type PostTable = Schema.To<typeof PostTable>

const Database = Schema.struct({
    post: PostTable,
})

export const {
    useQuery,
    useMutation,
    useOwner,
    useOwnerActions,
    useEvoluError,
} = Evolu.create(Database)

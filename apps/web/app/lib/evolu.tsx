import * as Schema from '@effect/schema/Schema'
import * as Evolu from 'evolu'

const TodoId = Evolu.id('Todo')
type TodoId = Schema.To<typeof TodoId>

const TodoTable = Schema.struct({
    id: TodoId,
    title: Evolu.NonEmptyString1000,
    isCompleted: Evolu.SqliteBoolean,
})
type TodoTable = Schema.To<typeof TodoTable>

const Database = Schema.struct({
    todo: TodoTable,
})

export const {
    useQuery,
    useMutation,
    useOwner,
    useOwnerActions,
    useEvoluError,
} = Evolu.create(Database)

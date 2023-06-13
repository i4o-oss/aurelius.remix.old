import { useQuery } from "./evolu"

export const useLocalPosts = () => {
    const { rows } = useQuery(
        db => db.selectFrom('post').selectAll(),
        row => row
    )

    return rows
}

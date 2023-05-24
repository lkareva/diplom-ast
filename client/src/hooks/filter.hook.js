import {useMemo} from "react";

export const useSortedPosts = (posts, sortFrom, sortTo) => {
    return useMemo(() => {
        if (sortFrom || sortTo) {
            return [...posts].filter(post => post.desc.from >= sortFrom && post.desc.to <= sortTo)
        }
        return posts
    }, [sortFrom, sortTo, posts])
}

export const usePosts = (posts, sortFrom, sortTo, query) => {
    const sortedPosts = useSortedPosts(posts, sortFrom, sortTo);

    return useMemo(() => {
        return sortedPosts.filter(post => post.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])
}

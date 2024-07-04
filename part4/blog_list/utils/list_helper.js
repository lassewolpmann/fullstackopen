const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, obj) => {
        return acc + obj.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    let sortedBlogs = blogs.sort((a, b) => {
        // Sort in ascending order
        return a.likes > b.likes ? 1 : -1
    })

    let favouriteBlog = sortedBlogs[sortedBlogs.length - 1]

    return {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        likes: favouriteBlog.likes
    }
}

const mostBlogs = (blogs) => {
    // Create a set of author names
    let authors = [...new Set(blogs.map(blog => blog.author))]

    let blogsPerAuthor = authors.map(author => {
        let blogCount = blogs.reduce((acc, blog) => {
            if (blog.author === author) {
                return acc + 1
            } else {
                return acc
            }
        }, 0)

        return {
            author: author,
            blogs: blogCount
        }
    }).sort((a, b) => {
        // Sort blog count in ascending order
        return a.blogs > b.blogs ? 1 : -1
    })

    return blogsPerAuthor[blogsPerAuthor.length - 1]
}

const mostLikes = (blogs) => {
    let authors = [...new Set(blogs.map(blog => blog.author))]

    let likesPerAuthor = authors.map(author => {
        let likeCount = blogs.reduce((acc, blog) => {
            if (blog.author === author) {
                return acc + blog.likes
            } else {
                return acc
            }
        }, 0)

        return {
            author: author,
            likes: likeCount
        }
    }).sort((a, b) => {
        // Sort likes count in ascending order
        return a.likes > b.likes ? 1 : -1
    })

    return likesPerAuthor[likesPerAuthor.length - 1]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
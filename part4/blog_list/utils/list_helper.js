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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
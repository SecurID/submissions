const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0

    blogs.forEach(element => {
        sum = element.likes + sum
    });

    return sum
}

const favoriteBlog = (blogs) => {
    let best = null

    blogs.forEach(element => {
        if (best === null) {
            best = element
        } else if (element.likes > best.likes) {
            best = element
        }
    })

    if (best === null) {
        best = {}
    }

    return best
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Ferdeblog',
        author: 'Sarah Bae',
        url: 'www.i-love-ferde.de',
        likes: 142567
    },
    {
        title: 'HatePeople',
        author: 'Jana Linger',
        url: 'www.i-hate-you-and-everyone.de',
        likes: 15
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ 
        title: 'NonExistingTitle',
        url: 'www.swag.com',
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}
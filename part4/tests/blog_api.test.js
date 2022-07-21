const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'HatePeople'
  )
}, 100000)

test('unique identifier of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)

  console.log(ids)

  expect(ids[0]).toBeDefined()
}, 100000)

test('a newly created blog is saved to the database', async () => {
  const newBlog = {
    title: 'MyLittlePony',
    author: 'MrSwain', 
    url: 'www.mylittlepony.de',
    likes: 1337
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(b => b.author)
  expect(authors).toContain(
    'MrSwain'
  )

}, 100000)

test('when no likes are submitted they default to zero', async () => {
  const newBlog = {
    title: 'MyLittlePony',
    author: 'MrSwain', 
    url: 'www.mylittlepony.de',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('when title or url are missing from the request that a bad request is returned', async () => {
  const newBlog = {
    author: 'MrSwain',
    likes: 1000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
}, 100000)

test('delete blog', async () => {
  const blogs = await helper.blogsInDb()

  const response = await api
    .delete('/api/blogs/' + blogs[0].id)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const authors = blogsAtEnd.map(b => b.author)
  expect(authors).not.toContain(
    'Sarah Bae'
  )
  
}, 10000)

test('update blog', async () => {
  const blogs = await helper.blogsInDb()

  const updatedBlog = blogs[0]
  updatedBlog.likes = 1337

  const response = await api
    .put('/api/blogs/' + updatedBlog.id)
    .send(updatedBlog)
    .expect(200)

  expect(response.body.likes).toBe(1337)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation of invalid user is handled properly', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'm',
      name: 'M',
      password: 'm',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
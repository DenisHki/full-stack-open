import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog /> component', () => {
  let blog
  let mockLike
  let mockDelete
  let mockUser

  beforeEach(() => {
    blog = {
      title: 'Fishing',
      author: 'Denis Chuvakov',
      url: 'https://fishing.com/',
      likes: 5,
      user: { username: 'denis1', name: 'Denis' },
    }

    mockLike = vi.fn()
    mockDelete = vi.fn()
    mockUser = { username: 'denis1' }
  })

  // 5.13
  test('renders title and author but not url or likes by default', () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockLike}
        handleDelete={mockDelete}
        user={mockUser}
      />
    )

    expect(screen.getByText('Fishing — Denis Chuvakov')).toBeDefined()

    const details = container.querySelector('.blogDetails')
    expect(details).toBeNull()
  })

  // 5.14
  test('shows url and likes when the view button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Blog
        blog={blog}
        handleLike={mockLike}
        handleDelete={mockDelete}
        user={mockUser}
      />
    )

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('https://fishing.com/')).toBeDefined()
    expect(screen.getByText('likes: 5')).toBeDefined()
  })

  // 5.15
  test('if like button is clicked twice, event handler is called twice', async () => {
    const user = userEvent.setup()
    render(
      <Blog
        blog={blog}
        handleLike={mockLike}
        handleDelete={mockDelete}
        user={mockUser}
      />
    )
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})

// 5.16
describe('<BlogForm /> component', () => {
  test('calls onCreate with correct details when new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm onCreate={createBlog} />)

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    const sendButton = screen.getByText('Add Blog')

    await user.type(titleInput, 'Fishing')
    await user.type(authorInput, 'Denis Chuvakov')
    await user.type(urlInput, 'https://fishing.com/')
    await user.click(sendButton)

    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Fishing',
      author: 'Denis Chuvakov',
      url: 'https://fishing.com/',
    })
  })
})

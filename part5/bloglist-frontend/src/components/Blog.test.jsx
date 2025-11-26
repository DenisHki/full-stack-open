import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { vi } from 'vitest'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Fishing',
    author: 'Denis Chuvakov',
    url: 'https://fishing.com/',
    likes: 5,
    user: { username: 'denis1', name: 'Denis' }
  }

  const mockLike = vi.fn()
  const mockDelete = vi.fn()
  const mockUser = { username: 'denis1' }

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

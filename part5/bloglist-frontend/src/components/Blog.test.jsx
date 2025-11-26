import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { vi } from "vitest";

const blog = {
  title: "Fishing",
  author: "Denis Chuvakov",
  url: "https://fishing.com/",
  likes: 5,
  user: { username: "denis1", name: "Denis" },
};

const mockUser = { username: "denis1" };
const mockLike = vi.fn();
const mockDelete = vi.fn();

// 5.13
test("renders title and author but not url or likes by default", () => {
  const { container } = render(
    <Blog
      blog={blog}
      handleLike={mockLike}
      handleDelete={mockDelete}
      user={mockUser}
    />
  );

  expect(screen.getByText("Fishing — Denis Chuvakov")).toBeDefined();

  const details = container.querySelector(".blogDetails");
  expect(details).toBeNull();
});

// 5.14
test("shows url and likes when the view button is clicked", async () => {
  const { container } = render(
    <Blog
      blog={blog}
      handleLike={mockLike}
      handleDelete={mockDelete}
      user={mockUser}
    />
  );

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const details = container.querySelector(".blogDetails");
  expect(details).toBeDefined();
  expect(details).toHaveTextContent("https://fishing.com/");
  expect(details).toHaveTextContent("likes: 5");
});

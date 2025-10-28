import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogList from './BlogList';

describe('BlogList component', () => {

  const sampleBlogs = [
    { id: 1, title: 'Blog 1', author: 'Amir' },
    { id: 2, title: 'Blog 2', author: 'Firuze' },
  ];

  it('renders the title prop correctly', () => {
    render(
      <MemoryRouter>
        <BlogList blogs={sampleBlogs} title="All Blogs" />
      </MemoryRouter>
    );
    expect(screen.getByText('All Blogs')).toBeInTheDocument();
  });

  it('renders all blog titles', () => {
    render(
      <MemoryRouter>
        <BlogList blogs={sampleBlogs} title="All Blogs" />
      </MemoryRouter>
    );
    expect(screen.getByText('Blog 1')).toBeInTheDocument();
    expect(screen.getByText('Blog 2')).toBeInTheDocument();
  });

  it('renders author names correctly', () => {
    render(
      <MemoryRouter>
        <BlogList blogs={sampleBlogs} title="All Blogs" />
      </MemoryRouter>
    );
    expect(screen.getByText('Written by Amir')).toBeInTheDocument();
    expect(screen.getByText('Written by Firuze')).toBeInTheDocument();
  });

  it('renders correct number of blog previews', () => {
    render(
      <MemoryRouter>
        <BlogList blogs={sampleBlogs} title="All Blogs" />
      </MemoryRouter>
    );
    const previews = screen.getAllByRole('heading', { level: 1 });
    expect(previews.length).toBe(2);
  });

  it('links point to the correct routes', () => {
    render(
      <MemoryRouter>
        <BlogList blogs={sampleBlogs} title="All Blogs" />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/blogs/1');
    expect(links[1]).toHaveAttribute('href', '/blogs/2');
  });
});

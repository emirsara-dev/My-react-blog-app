import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Router, Route } from 'react-router-dom/cjs/react-router-dom.min';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import BlogDetails from './BlogDetails';

const MockBlogDetails = () => {
    return (
        <BrowserRouter>
            <BlogDetails />
        </BrowserRouter>
    )
};

jest.mock('./useFetch', () => () => ({
    data: { id: 1, title: 'Test Blog', body: 'Test Blog', author: 'Amir' },
    isPending: false,
    error: null,
}));

describe("Create component", () => {
    // it('should render the Loading message', async () => {
    //     render(<MockBlogDetails />);
    //     const element = screen.getByText(/loading.../i);
    //     expect(element).toBeInTheDocument();
    // });

    it('should navigate to homepage when the delete button is clicked', async () => {
        const history = createMemoryHistory();
        history.push('/blogs/1')
        render(
            <Router history={history}>
                <BlogDetails />
            </Router>
        );

        const deleteButton = await screen.findByRole("button", {name: /delete/i})
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        })
    });
});
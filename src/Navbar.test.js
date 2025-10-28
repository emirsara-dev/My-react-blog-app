import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import Navbar from './Navbar';



const MockNavbar = () => {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
};

describe("Navbar componet", () => {
    it('should render the Header', async () => {
        render(<MockNavbar />);
        const headingElement = screen.getByText(/EmirSara's blog/i);
        expect(headingElement).toBeInTheDocument();
    });

    it('should render the homepage link', async () => {
        render(<MockNavbar />);
        const linkElement = screen.getByRole("link", {name: /home/i});
        expect(linkElement).toBeInTheDocument();
    });

    it('should render the new blog link', async () => {
        render(<MockNavbar />);
        const linkElement = screen.getByRole("link", {name: /new blog/i});
        expect(linkElement).toBeInTheDocument();
    });

    it('should navigate to the homepage when the respective button is clicked', async () => {
        const history = createMemoryHistory();
        history.push("/create");
        render(
            <Router history={history}>
                <Navbar />
            </Router>
        );
        fireEvent.click(screen.getByRole("link", {name: /Home/i}))
        
        await waitFor(() => {
            expect(history.location.pathname).toBe("/");
        });
    });

    it('should navigate to the new blog page when the respective button is clicked', async () => {
        const history = createMemoryHistory();
        history.push("/");
        render(
            <Router history={history}>
                <Navbar />
            </Router>
        );
        fireEvent.click(screen.getByRole("link", {name: /New Blog/i}))
        
        await waitFor(() => {
            expect(history.location.pathname).toBe("/create");
        });
    });
});
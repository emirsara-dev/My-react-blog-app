import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const MockHome = () => {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
};

describe("Home component", () => {
    it('should render the homepage', async () => {
        render(<MockHome />);
        const divElement = screen.getByTestId("home-component");
        expect(divElement).toBeInTheDocument();
    });
});
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LandingPage from '../src/LandingPage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

describe('LandingPage', function() {
    const renderPage = () => {
        const initialState = {output:10};
        const mockStore = configureStore();
        let store,wrapper;

        store = mockStore(initialState);
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <LandingPage />
                </BrowserRouter>
            </Provider>
        );
    }
    
    afterEach(() => {
        cleanup();
    })

    test('LandingPage: Invalid email input', async () => {
        const landingPage = renderPage();
        
        // get the email input, the error message if an invalid email is entered,
        // the password input, and the login button
        const emailInput = await landingPage.findByPlaceholderText('Email');
        const passwordInput = await landingPage.findByPlaceholderText('Password');
        const emailErrorMessage = await landingPage.findByText('Invalid user');
        const loginButton = await landingPage.findByRole('button', { name: /Log In/i });

        // emailErrorMessage should initially be hidden
        expect(emailErrorMessage).not.toBeVisible();

        // input text into emailInput and passwordInput
        await userEvent.type(emailInput, "invalid-email");
        await userEvent.type(passwordInput, "ValidPassword1!");
        // check if the text has been successfully inputted
        expect((emailInput as HTMLInputElement).value).toBe("invalid-email");
        expect((passwordInput as HTMLInputElement).value).toBe("ValidPassword1!");

        // after the Login button is clicked, the invalid email error message should be visible
        await userEvent.click(loginButton);
        expect(emailErrorMessage).toBeVisible();
    })

    test('LandingPage: Invalid password input', async () => {
        const landingPage = renderPage();
        
        // get the email input, the error message if an invalid password is entered,
        // and the login button
        // The password input is not retrieved because we are inputting nothing to get an error message
        const emailInput = await landingPage.findByPlaceholderText('Email');
        const passwordErrorMessage = await landingPage.findByText('Invalid password');
        const loginButton = await landingPage.findByRole('button', { name: /Log In/i });

        // passwordErrorMessage should initially be hidden
        expect(passwordErrorMessage).not.toBeVisible();

        // input text into emailInput and passwordInput
        await userEvent.type(emailInput, "validemail@iastate.edu");
        // check if the text has been successfully inputted
        expect((emailInput as HTMLInputElement).value).toBe("validemail@iastate.edu");

        // after the Login button is clicked, the invalid password error message should be visible
        await userEvent.click(loginButton);
        expect(passwordErrorMessage).toBeVisible();
    })
})
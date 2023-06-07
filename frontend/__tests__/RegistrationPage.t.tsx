import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegistrationPage from '../src/RegistrationPage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

describe('RegistrationPage', function() {
    const renderPage = () => {
        const initialState = {output:10};
        const mockStore = configureStore();
        let store,wrapper;

        store = mockStore(initialState);
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <RegistrationPage />
                </BrowserRouter>
            </Provider>
        );
    }
    
    afterEach(() => {
        cleanup();
    })

    test('RegistrationPage: Invalid first name input', async () => {
        const registrationPage = renderPage();

        // get the first name input and its error message
        const firstNameInput = await registrationPage.findByPlaceholderText('John');
        const firstNameErrorMessage = await registrationPage.findByTestId('firstNameErrorMessage');

        // firstNameErrorMessage should initially display no text
        expect(firstNameErrorMessage.innerHTML).toBe("");

        // input text into firstNameInput
        await userEvent.type(firstNameInput, "invalid1");
        // check if the text has been successfully inputted
        expect((firstNameInput as HTMLInputElement).value).toBe("invalid1");

        // check if the error message is now visible
        expect(firstNameErrorMessage.innerHTML).toBe("First name must consist of only letters.");
    })

    test('RegistrationPage: Invalid last name input', async () => {
        const registrationPage = renderPage();

        // get the last name input and its error message
        const lastNameInput = await registrationPage.findByPlaceholderText('Smith');
        const lastNameErrorMessage = await registrationPage.findByTestId('lastNameErrorMessage');

        // lastNameErrorMessage should initially display no text
        expect(lastNameErrorMessage.innerHTML).toBe("");

        // input text into lastNameInput
        await userEvent.type(lastNameInput, "invalid1");
        // check if the text has been successfully inputted
        expect((lastNameInput as HTMLInputElement).value).toBe("invalid1");

        // check if the error message is now visible
        expect(lastNameErrorMessage.innerHTML).toBe("Last name must consist of only letters.");
    })

    test('RegistrationPage: Invalid email input', async () => {
        const registrationPage = renderPage();

        // get the email input and its error message
        const emailInput = await registrationPage.findByPlaceholderText('jsmith@email.com');
        const emailErrorMessage = await registrationPage.findByTestId('emailErrorMessage');

        // emailErrorMessage should initially display no text
        expect(emailErrorMessage.innerHTML).toBe("");

        // input text into emailInput
        await userEvent.type(emailInput, "invalid");
        // check if the text has been successfully inputted
        expect((emailInput as HTMLInputElement).value).toBe("invalid");

        // check if the error message is now visible
        expect(emailErrorMessage.innerHTML).toBe("Email not of format: email@something.edu");
    })

    test('RegistrationPage: Invalid password input', async () => {
        const registrationPage = renderPage();

        // get the password input and its error message
        const passwordInput = await registrationPage.findByPlaceholderText('password');
        const passwordErrorMessage = await registrationPage.findByTestId('passwordErrorMessage');

        // passwordErrorMessage should initially display no text
        expect(passwordErrorMessage.innerHTML).toBe("");

        // input text into passwordInput
        await userEvent.type(passwordInput, "inv");
        // check if the text has been successfully inputted
        expect((passwordInput as HTMLInputElement).value).toBe("inv");

        // check if the error message is now visible
        expect(passwordErrorMessage.innerHTML).toBe("Password must be at least 6 characters long.");
    })

    test('RegistrationPage: Invalid phone number input (format, under 10 digits long)', async () => {
        const registrationPage = renderPage();

        // get the phone number input and its error message
        const phoneNumberInput = await registrationPage.findByPlaceholderText('555-555-5555');
        const phoneNumberErrorMessage = await registrationPage.findByTestId('phoneNumberErrorMessage');

        // phoneNumberErrorMessage should initially display no text
        expect(phoneNumberErrorMessage.innerHTML).toBe("");

        // input text into phoneNumberInput
        await userEvent.type(phoneNumberInput, "51");
        // check if the text has been successfully inputted
        expect((phoneNumberInput as HTMLInputElement).value).toBe("51");

        // check for errors: format and under 10 digits long
        expect(phoneNumberErrorMessage.innerHTML).toBe("Phone number not of format: 515-123-4567.<br> Input number is under 10 digits long.");
    })

    test('RegistrationPage: Invalid phone number input (format, over 12 digits long)', async () => {
        const registrationPage = renderPage();

        // get the phone number input and its error message
        const phoneNumberInput = await registrationPage.findByPlaceholderText('555-555-5555');
        const phoneNumberErrorMessage = await registrationPage.findByTestId('phoneNumberErrorMessage');

        // phoneNumberErrorMessage should initially display no text
        expect(phoneNumberErrorMessage.innerHTML).toBe("");

        // input text into phoneNumberInput
        await userEvent.type(phoneNumberInput, "5111111111111");
        // check if the text has been successfully inputted
        expect((phoneNumberInput as HTMLInputElement).value).toBe("5111111111111");

        // check for errors: format and over 12 digits long
        expect(phoneNumberErrorMessage.innerHTML).toBe("Phone number not of format: 515-123-4567.<br> Input number is over 12 digits long.");
    })

    test('RegistrationPage: Invalid phone number input (only format)', async () => {
        const registrationPage = renderPage();

        // get the phone number input and its error message
        const phoneNumberInput = await registrationPage.findByPlaceholderText('555-555-5555');
        const phoneNumberErrorMessage = await registrationPage.findByTestId('phoneNumberErrorMessage');

        // phoneNumberErrorMessage should initially display no text
        expect(phoneNumberErrorMessage.innerHTML).toBe("");

        // input text into phoneNumberInput
        await userEvent.type(phoneNumberInput, "511111111111");
        // check if the text has been successfully inputted
        expect((phoneNumberInput as HTMLInputElement).value).toBe("511111111111");

        // check for format error
        expect(phoneNumberErrorMessage.innerHTML).toBe("Phone number not of format: 515-123-4567.");
    })
    
})
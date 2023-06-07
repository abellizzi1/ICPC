import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditUserInfoPage from '../src/EditUserInfoPage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

describe('EditUserInfoPage', function() {
    const renderPage = () => {
        const initialState = {output:10};
        const mockStore = configureStore();
        let store,wrapper;

        store = mockStore(initialState);
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <EditUserInfoPage />
                </BrowserRouter>
            </Provider>
        );
    }

    beforeEach(() => {
        localStorage.setItem('loggedInUser', JSON.stringify({
            firstName: "testfirstname",
            lastName: "testlastname",
            email: "test@iastate.edu",
            phoneNumber: "515-555-5555",
            leetcodeUsername: "user",
            codeforcesUsername: "user",
            uhuntId: "0"
        }))
    })
    
    afterEach(() => {
        cleanup();
    })

    test('EditUserInfoPage: Invalid first name input', async () => {
        const editUserInfoPage = renderPage();
        // get the first name input and its error message
        const firstNameInput = await editUserInfoPage.findByPlaceholderText('Enter new first name');
        const firstNameErrorMessage = await editUserInfoPage.findByTestId('firstNameErrorMessage');
        const firstNameSubmit = await editUserInfoPage.findByRole('button', { name: /Change First Name/i })

        // firstNameErrorMessage should initially be hidden
        expect(firstNameErrorMessage).not.toBeVisible();
        
        // input text into firstNameInput
        await userEvent.type(firstNameInput, "invalid1");
        // check if the text has been successfully inputted
        expect((firstNameInput as HTMLInputElement).value).toBe("invalid1");

        // after the Change First Name button is clicked, the error message should be visible
        await userEvent.click(firstNameSubmit);
        expect(firstNameErrorMessage).toBeVisible();
    })

    test('EditUserInfoPage: Invalid last name input', async () => {
        const editUserInfoPage = renderPage();
        // get the last name input and its error message
        const lastNameInput = await editUserInfoPage.findByPlaceholderText('Enter new last name');
        const lastNameErrorMessage = await editUserInfoPage.findByTestId('lastNameErrorMessage');
        const lastNameSubmit = await editUserInfoPage.findByRole('button', { name: /Change Last Name/i })

        // lastNameErrorMessage should initially be hidden
        expect(lastNameErrorMessage).not.toBeVisible();
        
        // input text into lastNameInput
        await userEvent.type(lastNameInput, "invalid1");
        // check if the text has been successfully inputted
        expect((lastNameInput as HTMLInputElement).value).toBe("invalid1");

        // after the Change last Name button is clicked, the error message should be visible
        await userEvent.click(lastNameSubmit);
        expect(lastNameErrorMessage).toBeVisible();
    })

    test('EditUserInfoPage: Invalid email input', async () => {
        const editUserInfoPage = renderPage();
        // get the email input and its error message
        const emailInput = await editUserInfoPage.findByPlaceholderText('email@example.com');
        const emailErrorMessage = await editUserInfoPage.findByTestId('emailErrorMessage');
        const emailSubmit = await editUserInfoPage.findByRole('button', { name: /Change Email/i })

        // emailErrorMessage should initially be hidden
        expect(emailErrorMessage).not.toBeVisible();
        
        // input text into emailInput
        await userEvent.type(emailInput, "invalid");
        // check if the text has been successfully inputted
        expect((emailInput as HTMLInputElement).value).toBe("invalid");

        // after the Change Email button is clicked, the error message should be visible
        await userEvent.click(emailSubmit);
        expect(emailErrorMessage).toBeVisible();
    })

    test('EditUserInfoPage: Invalid leetcode username input', async () => {
        const editUserInfoPage = renderPage();
        // get the leetcodeUsername input and its error message
        const leetcodeUsernameInput = await editUserInfoPage.findByPlaceholderText('Enter new Leetcode username');
        const leetcodeUsernameErrorMessage = await editUserInfoPage.findByTestId('leetcodeUsernameErrorMessage');
        const leetcodeUsernameSubmit = await editUserInfoPage.findByRole('button', { name: /Change Leetcode Username/i })

        // leetcodeUsernameErrorMessage should initially be hidden
        expect(leetcodeUsernameErrorMessage).not.toBeVisible();
        
        // input text into leetcodeUsernameInput
        await userEvent.type(leetcodeUsernameInput, "in");
        // check if the text has been successfully inputted
        expect((leetcodeUsernameInput as HTMLInputElement).value).toBe("in");

        // after the Change leetcode Username button is clicked, the error message should be visible
        await userEvent.click(leetcodeUsernameSubmit);
        expect(leetcodeUsernameErrorMessage).toBeVisible();
    })

    test('EditUserInfoPage: Invalid codeforces username input (length < 3)', async () => {
        const editUserInfoPage = renderPage();
        // get the codeforcesUsername input and its error message
        const codeforcesUsernameInput = await editUserInfoPage.findByPlaceholderText('Enter new Codeforces username');
        const codeforcesUsernameErrorMessage = await editUserInfoPage.findByTestId('codeforcesUsernameErrorMessage');
        const codeforcesUsernameSubmit = await editUserInfoPage.findByRole('button', { name: /Change Codeforces Username/i })

        // codeforcesUsernameErrorMessage should initially be hidden
        expect(codeforcesUsernameErrorMessage).not.toBeVisible();
        
        // input text into codeforcesUsernameInput
        await userEvent.type(codeforcesUsernameInput, "in");
        // check if the text has been successfully inputted
        expect((codeforcesUsernameInput as HTMLInputElement).value).toBe("in");

        // after the Change codeforces Username button is clicked, the error message should be visible
        await userEvent.click(codeforcesUsernameSubmit);
        expect(codeforcesUsernameErrorMessage).toBeVisible();
    })

    test('EditUserInfoPage: Invalid codeforces username input (length > 24)', async () => {
        const editUserInfoPage = renderPage();
        // get the codeforcesUsername input and its error message
        const codeforcesUsernameInput = await editUserInfoPage.findByPlaceholderText('Enter new Codeforces username');
        const codeforcesUsernameErrorMessage = await editUserInfoPage.findByTestId('codeforcesUsernameErrorMessage');
        const codeforcesUsernameSubmit = await editUserInfoPage.findByRole('button', { name: /Change Codeforces Username/i })

        // codeforcesUsernameErrorMessage should initially be hidden
        expect(codeforcesUsernameErrorMessage).not.toBeVisible();
        
        // input text into codeforcesUsernameInput
        await userEvent.type(codeforcesUsernameInput, "invalidinvalidinvalid1234");
        // check if the text has been successfully inputted
        expect((codeforcesUsernameInput as HTMLInputElement).value).toBe("invalidinvalidinvalid1234");

        // after the Change codeforces Username button is clicked, the error message should be visible
        await userEvent.click(codeforcesUsernameSubmit);
        expect(codeforcesUsernameErrorMessage).toBeVisible();
    })

    test('EditUserInfoPage: Invalid uhunt username input', async () => {
        const editUserInfoPage = renderPage();
        // get the uhuntUsername input and its error message
        const uhuntUsernameInput = await editUserInfoPage.findByPlaceholderText('Enter new Uhunt user Id');
        const uhuntUsernameErrorMessage = await editUserInfoPage.findByTestId('uhuntUsernameErrorMessage');
        const uhuntUsernameSubmit = await editUserInfoPage.findByRole('button', { name: /Change Uhunt ID/i })

        // uhuntUsernameErrorMessage should initially be hidden
        expect(uhuntUsernameErrorMessage).not.toBeVisible();
        
        // input text into uhuntUsernameInput
        await userEvent.type(uhuntUsernameInput, "invalid");
        // check if the text has been successfully inputted
        expect((uhuntUsernameInput as HTMLInputElement).value).toBe("invalid");

        // after the Change uhunt Username button is clicked, the error message should be visible
        await userEvent.click(uhuntUsernameSubmit);
        expect(uhuntUsernameErrorMessage).toBeVisible();
    })
})
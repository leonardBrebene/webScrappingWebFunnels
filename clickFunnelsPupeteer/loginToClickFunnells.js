
const loginToClickFunnels = async (page, user, password) => {

    const [inputEmail] = await page.$x(`//*[@type="email"]`);
    const [inputPassword] = await page.$x(`//*[@type="password"]`);
    const [logInButton] = await page.$x(`//*[@type="submit" and @value="Log In"]`);

    await inputEmail.type(user)
    await inputPassword.type(password)
    await logInButton.click()
    await page.waitForTimeout(1000);

    await page.waitForXPath('//*[@id="toast--action-agreement"]');
    const [gotItButton] = await page.$x(`//*[@id="toast--action-agreement"]`);

    if (gotItButton) {
       await gotItButton.click()
    }
    // await gotItButton.click()

    console.log("Login completed")
    return page
}
export default loginToClickFunnels;


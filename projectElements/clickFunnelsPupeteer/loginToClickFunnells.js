import fs from "fs"

const loginToClickFunnels = async (page, user, password) => {

  const [inputEmail] = await page.$x(`//*[@type="email"]`);
  const [inputPassword] = await page.$x(`//*[@type="password"]`);
  const [logInButton] = await page.$x(`//*[@type="submit" and @value="Log In"]`);

  await inputEmail.type(user)
  await inputPassword.type(password)
  await logInButton.click()
  await page.waitForTimeout(1000);

  try {
    await page.waitForXPath('//*[@id="toast--action-agreement"]');
    const [gotItButton] = await page.$x(`//*[@id="toast--action-agreement"]`);

    if (gotItButton) {
      await gotItButton.click()
    }
  } catch (error) {
    console.log("No Got It button found")
  }


  await page.waitForTimeout(10000)
  const cookies = await page.cookies();
  await fs.promises.writeFile('./jsonFiles/cookies.json', JSON.stringify(cookies, null, 2));
  console.log("Login completed and saving cookies ")
}
export default loginToClickFunnels;


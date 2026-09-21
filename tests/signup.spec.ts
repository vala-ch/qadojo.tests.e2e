import { test, expect } from '@playwright/test';

test('sign up with invalid data, the error messages should be displayed', async ({ page }) => {
    await page.goto('/articles');
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();

    await page.getByTestId('auth-username').fill('test.v');
    await page.getByTestId('auth-email').fill('test@test');

    await page.getByTestId('auth-password').fill('123');
    await page.getByTestId('register-confirm-password').fill('123');

    await page.getByTestId('register-terms').setChecked(true);
    await page.getByTestId('auth-submit').click();

    await expect(page.getByText('email некоректний email')).toBeVisible();
    await expect(page.getByTestId('error-messages').getByText('password')).toBeVisible();
});

test('verify aggrement checkbox is required', async ({ page }) => {
    await page.goto('/articles');
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();

    await page.getByTestId('auth-username').fill('test.v');
    await page.getByTestId('auth-email').fill('test@test.com');

    await page.getByTestId('auth-password').fill('123456');
    await page.getByTestId('register-confirm-password').fill('123456');

    await expect(page.getByTestId('auth-submit')).toBeDisabled();
});

test('register as a new user', async ({ page }) => {
    await page.goto('/articles');
    await page.getByTestId('nav-sign-up').click();
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();

    await page.getByTestId('auth-username').fill('test.v3');
    await page.getByTestId('auth-email').fill('ktcu67523@2048.com');

    await page.getByTestId('auth-password').fill('123456');
    await page.getByTestId('register-confirm-password').fill('123456');

  await page.getByTestId('register-terms').check();
  await page.getByTestId('auth-submit').click();

  await expect(page.getByTestId('feed-tab-your')).toBeVisible();
  await expect(page.getByTestId('nav-profile')).toBeVisible();
});

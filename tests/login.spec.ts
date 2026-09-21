import { test, expect } from '@playwright/test';

test('login as not registered user', async ({ page }) => {
  await page.goto('/articles');
  await page.getByTestId('nav-sign-in').click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

  await page.getByTestId('auth-email').fill('ktcuch67525@2048test.com');
  await page.getByTestId('auth-password').fill('123456');

  await page.getByTestId('auth-submit').click();
  await expect(page.getByText('email or password неправильні')).toBeVisible();
});

test('login with invalid password credentials', async ({ page }) => {
  await page.goto('/articles');
  await page.getByTestId('nav-sign-in').click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

  await page.getByTestId('auth-email').fill('ktcuch67525@2048.com');
  await page.getByTestId('auth-password').fill('123409');

  await page.getByTestId('auth-submit').click();
  await expect(page.getByText('email or password неправильні')).toBeVisible();
});

test('login to the system with valid credentials', async ({ page }) => {
  await page.goto('/articles');
  await page.getByTestId('nav-sign-in').click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

  await page.getByTestId('auth-email').fill('ktcu67523@2048.com');
  await page.getByTestId('auth-password').fill('123456');

  await page.getByTestId('auth-submit').click();
  
  await expect(page.getByTestId('feed-tab-your')).toBeVisible();
  await expect(page.getByTestId('nav-profile')).toBeVisible();
});

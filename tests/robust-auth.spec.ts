import { test, expect } from '@playwright/test';

test.describe('Robust Authentication Flow', () => {
  const user = {
    fullName: 'Test User',
    email: `user-${Date.now()}@example.com`,
    password: 'password123',
  };

  const admin = {
    email: `admin-${Date.now()}@example.com`,
    password: 'adminpassword123',
  };

  test('should allow a new user to register and navigate to the dashboard', async ({ page }) => {
    // --- Register new user ---
    await page.goto('/user/register');
    await expect(page).toHaveTitle(/Join the Elite Garage | Smart Motor/);

    await page.getByPlaceholder('John Doe').fill(user.fullName);
    await page.getByPlaceholder('email@example.com').fill(user.email);
    await page.getByPlaceholder('min. 6 characters').fill(user.password);
    await page.getByRole('button', { name: 'Initialize Account' }).click();

    await expect(page).toHaveURL('/user/dashboard', { timeout: 15000 });
    await expect(page.getByText(`Welcome back, ${user.fullName.split(' ')[0]}`)).toBeVisible();
  });

  test('should allow an existing user to log in and navigate to the dashboard', async ({ page }) => {
    // --- Login with existing user ---
    await page.goto('/user/login');
    await expect(page).toHaveTitle(/Concierge Access Portal | Smart Motor/);

    await page.getByPlaceholder('email@example.com').fill(user.email);
    await page.getByPlaceholder('••••••••').fill(user.password);
    await page.getByRole('button', { name: 'Establish Session' }).click();

    await expect(page).toHaveURL('/user/dashboard', { timeout: 15000 });
    await expect(page.getByText(`Welcome back, ${user.fullName.split(' ')[0]}`)).toBeVisible();
  });

  test('should prevent unauthenticated access to user dashboard', async ({ page }) => {
    // Ensure user is logged out first
    await page.goto('/user/dashboard'); // This should redirect to login
    await expect(page).toHaveURL('/user/login');
  });

  // --- Admin Specific Tests (Requires Manual Firebase Admin Setup) ---
  // For a real deployment, you would manually create an admin user in Firebase Auth
  // and set their custom claim: { role: 'admin' }.
  // Example: firebase admin:set-custom-claims <admin_uid> {"role": "admin"}

  test.skip('should allow an admin to log in and navigate to the admin dashboard', async ({ page }) => {
    // --- Admin Login ---
    // NOTE: This test is skipped by default. You need to create an admin user in Firebase manually.
    // Once created, uncomment and fill in admin credentials if needed for automated testing.
    // Make sure the admin user has a custom claim { role: 'admin' }.

    await page.goto('/admin/(auth)/login');
    await expect(page).toHaveTitle(/Admin Control Panel | Smart Motor/);

    // Assume admin user is pre-created in Firebase with 'admin' role custom claim
    await page.getByPlaceholder('admin@example.com').fill('your-admin-email@example.com'); // REPLACE
    await page.getByPlaceholder('••••••••').fill('your-admin-password'); // REPLACE
    await page.getByRole('button', { name: 'Enter Control Panel' }).click();

    await expect(page).toHaveURL('/admin/dashboard', { timeout: 15000 });
    await expect(page.getByText('Welcome to the Admin Dashboard')).toBeVisible();
    await expect(page.getByText('You are logged in as admin:')).toBeVisible();
  });

  test.skip('should prevent unauthenticated access to admin dashboard', async ({ page }) => {
    // Ensure admin is logged out or not logged in
    await page.goto('/admin/dashboard'); // This should redirect to admin login
    await expect(page).toHaveURL('/admin/(auth)/login');
  });
});

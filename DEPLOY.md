# Deployment Guide

This project is ready for deployment on Vercel.

## 1. Quick Deploy

Clicking "Deploy" on Vercel or pushing to your GitHub repository connected to Vercel will work immediately for the **readonly** public site.

## 2. Enabling Admin Panel Persistence

By default, this app uses a local JSON file (`lib/data.json`) to store your settings.
On Vercel (Serverless), changes made via the Admin Panel will be **LOST** on the next deployment/redeployment because the file system is ephemeral.

To enable permanent storage:

1.  **Create a Vercel Project**.
2.  Go to the **Storage** tab in your Vercel Dashboard.
3.  Click **Create Database** -> Select **Vercel KV**.
4.  Bind it to your project.
5.  Redeploy.

The application automatically detects Vercel KV (`KV_REST_API_URL` environment variable) and switches to it.

## 3. Initial Data Seeding

When you first deploy with Vercel KV, it might be empty.
The application will fallback to reading `lib/data.json` initially.
Once you go to the Admin Panel and hit "Save" on any item, it will write the entire configuration to Vercel KV, making it the primary source of truth.

## 4. Environment Variables

For security, you should customize the Admin Login credentials in Vercel Environment Variables (optional update required in code if you want to move away from hardcoded admin/admin).

Current Hardcoded Credentials: `admin@example.com` / `admin`

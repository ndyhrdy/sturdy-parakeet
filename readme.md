# Xendit Checkout Demo

This project demonstrates checkout page integration with Xendit using React with Vite SSR. Head over to the deployed site here: https://xendit-checkout.endyhardy.me. This project was bootstrapped using vite-plugin-ssr create app script: `yarn create vite-plugin-ssr`.

## Tech Stack

This project focuses primarily on using React with Vite SSR, but there are other notable libraries being used:

- [React](https://reactjs.org/) (frontend)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [vite-plugin-ssr](https://vite-plugin-ssr.com/) (SSR plugin for Vite)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [Express](https://expressjs.com/) (backend)
- [Pocketbase](https://pocketbase.io/) (DB)
- [Fly.io](https://fly.io/) (deployment)

## Supported Channels

- Cards
- Bank Transfer (Virtual Accounts): `BRI`, `BNI`, `BCA`, `MANDIRI`, `PERMATA`
- Retail Outlets (Payment Codes): `ALFAMART`, `INDOMARET`
- E-wallets: `OVO`, `DANA`, `LINKAJA`

## Run on Local

Yes, please! Start by cloning this repo to your local machine.

### Set up Pocketbase

Get a copy of [Pocketbase binary](https://pocketbase.io/docs/) and place it in the project root directory, and name it `pb`. Make sure it is executable.

```bash
# e.g. for MacOS Apple Silicon
$ unzip ~/Downloads/pocketbase_0.9.0_darwin_arm64.zip
$ cp ~/Downloads/pocketbase_0.9.0_darwin_arm64/pocketbase ~/sturdy-parakeet/pb
$ sudo chmod +x ~/sturdy-parakeet/pb
```

From the project root, run the Pocketbase server and set up an admin account using the Pocketbase admin panel (browse to `http://localhost:8090/_` after the server has started).

```bash
$ cd ~/sturdy-parakeet
$ yarn pb
```

Next, within the Pocketbase admin panel, go to Settings > Import collections, paste in the contents of `/pb_schema.json` and start importing. A new **orders** collection should become available in the Collections page.

### Set up Vite app

Now that Pocketbase is up and running, time to run the Vite app! Start by populating the env variables. Copying `/.env.example` is a good place to start. Then edit the env file to with appropriate values.

```bash
$ cp .env.example .env.local
# then edit .env.local
```

Run the app, boiii

```bash
$ yarn dev
# then browse to http://localhost:3000
```

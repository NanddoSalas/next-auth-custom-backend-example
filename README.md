# Next Auth Custom Backend Example

This is and example site to demostrate how to use [NextAuth.js](https://next-auth.js.org) with a separated backend from next js using the [Custom Adapter Aproach.](https://next-auth.js.org)

[Try Demo](https://next-auth-custom-backend.vercel.com)

# Installation

## 1. Get the code into your local machine and install all dependencies

```
git clone https://github.com/NanddoSalas/next-auth-custom-backend-example.git
cd next-auth-custom-backend-example
yarn install
```

## 2. Setup Enviroment

Copy the `.env.local.example` file into `.env.local` and populate it

```
cp .env.local.example .env.local
```

Copy the `.env.local` to the `web` and `server` packages

```
cp .env.local packages/web/.env.local
cp .env.local packages/server/.env.local
```

## 3. Start the Project

```
yarn dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

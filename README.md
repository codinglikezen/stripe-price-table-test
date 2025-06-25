# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Create stripe products and stripe price table from stripe.com dashboard.
Create .env file with stripe keys etc. Refer .env.example

Run the dev server:

```sh
npm run dev
```

Tap "Create Stripe Customer" button to create, or if you have one already, add it to .env file.

Connect and Open via iPhone device, through same network, i.e. http://<local machine ip>:5173/

Tap "Go To Buy" button, and see customer session change every time the page is re-loaded.
On Buy page with stripe-price-table, tap "subscribe" button to proceed to pre-built checkout.
Check "customer@example.com" is gray out and can not be edited (to check customer-session is working with specified customerId).
Go back to previous Buy page, and press "subscribe" button again. Repeat this steps for some time.
Check at some point, on pre-build checkout page, email is editable. type in some email, and proceed payment.
Check at stripe dashboard customer page, and now you will see "Guest" customer is created, which is not
expected (a bug.)


## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

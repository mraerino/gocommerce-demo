# GoCommerce Demo (WIP)

*Disclaimer: This demo is currently only showing a small amount of gocommerce features and will be expanded*

This is a demo for using GoCommerce for a JAMStack site that sells something.

These components are being used:
- [GoCommerce](https://github.com/netlify/gocommerce) - Go microservice for handling orders and payments
- [gocommerce-js](https://github.com/netlify/gocommerce-js) - Javascript library for interacting with a GoCommerce backend service
- [netlify-gocommerce-widget](https://github.com/netlify/netlify-gocommerce-widget) - Quickstart widget to handle cart and orders for your JAMStack site

## Usage

This demo is based on the popular [Victor Hugo](https://github.com/netlify-templates/victor-hugo) starter kit by Netlify. Go there to find details about the structure of the project.

### Dependencies

NodeJS and Yarn are needed for running the build. Then install the project dependencies like this:

```bash
yarn
```

### Frontend demo

If you have a GoCommerce backend running somewhere and want to use the demo site on that, use it like this:

**Development**

**Notice:** *This is currently not working for making orders since your backend will not be able to reach your locally served site*

```bash
export DEMO_GOCOMMERCE_API_URL=https://<your backend>
yarn start
```

**Production**

*Builds into /dist*

```bash
export DEMO_GOCOMMERCE_API_URL=https://<your backend>
yarn build
```

**Note:** You can also set the path to GoCommerce in `site/config.toml`

```
[params]
    GocommerceAPI = "http://<your backend>"
```

### Locally using `docker-compose`

*Requires `Docker` and `docker-compose`*

There is a `docker-compose.yml` included to run this without any outside dependencies.

#### GoCommerce Image

Since GoCommerce is not yet available as a container image on a public registry, you need to build the image yourself.

Do this in your workspace directory:

```bash
git clone https://github.com/netlify/gocommerce
docker build . -t netlify/gocommerce
```

#### Adding a payment provider

In order to be able to perform orders a payment provider is needed. You can either use Stripe or PayPal.

Specify the config inside of a `.env` file:

**Stripe**

```bash
GOCOMMERCE_PAYMENT_STRIPE_ENABLED=1
GOCOMMERCE_PAYMENT_STRIPE_SECRET_KEY=  # secret key from your Stripe dashboard
GOCOMMERCE_PAYMENT_STRIPE_PUBLIC_KEY=  # public key from your Stripe dashboard
```

**PayPal**

```bash
GOCOMMERCE_PAYMENT_PAYPAL_ENABLED=1
GOCOMMERCE_PAYMENT_PAYPAL_CLIENT_ID=  # your client id
GOCOMMERCE_PAYMENT_PAYPAL_SECRET=  # your secret
GOCOMMERCE_PAYMENT_PAYPAL_ENV=  # environment to use. Choose from "production" or "sandbox"
```

#### Starting the setup

You can then run the docker-compose stack:

```bash
docker-compose up
```

The demo site will be accessible at [http://localhost:8080](http://localhost:8080)

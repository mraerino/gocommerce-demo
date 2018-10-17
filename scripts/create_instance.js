#!/usr/bin/env node

const request = require("request-promise-native");
const jwt = require("jsonwebtoken");

const uuid = "d8e58b54-97eb-4bdf-82bc-ba7e3da4eecc";
const operatorToken = "123456";
const siteUrl = "http://localhost:8080";
const gocommerceEndpoint = "http://localhost:9001";

const main = async() => {
  const demoInstance = {
    uuid,
    config: {
      site_url: siteUrl,
    },
  };

  const resp = await request.post(`${gocommerceEndpoint}/instances`, {
    auth: {
      bearer: operatorToken
    },
    json: demoInstance,
    simple: false,
    transform: (body, response, resolveWithFullResponse) => {
      if (response.statusCode === 400) {
        return {exists: true};
      }

      if (response.statusCode >= 300) {
        console.log(body);
        throw new Error(`HTTP Request to localhost:8080 failed with status ${response.statusCode}`);
      }

      return resolveWithFullResponse ? response : body;
    }
  });

  if (resp.exists) {
    console.error("Instance exists."); // output to stderr
    return;
  }

  const jwtPayload = {
    id: resp.id,
    site_url: siteUrl,
    name: "gocommerce-demo",
  };

  const signJwt = jwt.sign(jwtPayload, operatorToken);

  console.error("Put this into an .env file:");
  console.error(`GOCOMMERCE_INSTANCE_JWT=${signJwt}`);
};

setTimeout(() => main().catch((err) => { console.error(err.message); process.exit(1); }));

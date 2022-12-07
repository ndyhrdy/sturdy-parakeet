FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

ENV VITE_BASE_URL="https://xendit-checkout.endyhardy.me"
ENV VITE_API_BASE_URL="https://xendit-checkout.endyhardy.me/api"
ENV VITE_POCKETBASE_BASE_URL="https://xendit-checkout-demo-pb.fly.dev"

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 8080

FROM node:14.6.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY entrypoint.sh entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["sh","entrypoint.sh"]

EXPOSE 3000

CMD ["make", "dev"]
FROM node:16

WORKDIR /app

COPY . .
RUN npm i

# RUN /bin/sh -c "cd frontend;npm run build"

EXPOSE 3000

CMD ["node", "app.js"]

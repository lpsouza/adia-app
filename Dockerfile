FROM node:16.13
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
ENV NODE_ENV=production
ENV NEXT_PUBLIC_CORE_API=APP_NEXT_PUBLIC_CORE_API
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
RUN npm run build
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]

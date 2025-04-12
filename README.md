# News App in Vue using NewsAPI - Vue JS and Vuestic ⚡️

![Vue](https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD700?style=for-the-badge&logo=pinia&logoColor=white)
![API Integration](https://img.shields.io/badge/API_Integration-FF6F00?style=for-the-badge&logo=api&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue_Router-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Project Briefing

This uses open API provided by News API website (https://newsapi.org). This project was initialized almost 6 years ago. I revisited this recently and updated the code for it through some code cleaning using Vuestic components whenever possible. This is a comprehensive source of news which is constantly updated and has 100+ news sources from around the world including CNN, BBC, Russia Today and many more. News from around 50+ countries is available across various categories. News can also be fetched via keywords which are not related to any specific category.

As of March 2025 all the security vulnerabilities are addressed and fixed with updated packages.


Made with ❤️ by **[@apfirebolt](https://github.com/Apfirebolt/)**
## Features

- Makes use of News API (https://newsapi.org), api does require OAuth and has limits on free usage.
- Vuestic components are used for cards, buttons and other UI things for this application. 
- News can be filtered using keywords.
- News can be filtered based on country and category type. For example, you can filter 'Entertainment' category news from 'India' only. 

## Built With

* [Vue 3](https://vuejs.org//)
* [Vuestic UI](https://vuestic.dev/)
* [Pinia](https://pinia.vuejs.org/)

## Project setup

Make sure you get your API key from 

https://www.newsapi.ai/

Then create a .env file inside your main project folder with following contents

```
VITE_APP_KEY=Your_key_here
```

As next steps, just install node modules for the app and run the dev script.

```
npm install
npm run dev
```

For production, run the build npm command and serve the static files through a production or development server.

```
npm run build
npm start
```

## Project Screenshots

Please find some of the screenshots of the application. Below is the screenshot of the Home Page.

![alt text](./screenshots/3.png)

Screenshot of the News sources page where you can see list of countries for which you can have the news.

![alt text](./screenshots/1.png)

Screenshot of the News Page, you can get category wise news for a given country.

![alt text](./screenshots/2.png)

## To Do

- Applying pagination to news and search news by keyword page.
- Docker deployment script with nginx. 

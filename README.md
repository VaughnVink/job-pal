# JobPal
![Alt Text](https://media.giphy.com/media/3vZrz3V8NIXHKTjKl0/giphy.gif)
## Features
Application that allows a tradie to see their jobs.
Jobs have the following information associated with them:
- Unique job identifier.
- Status: one of "scheduled", "active", "invoicing", “to priced” or “completed”.
- Creation date and time.
- General information like name and contact details of the client.

The tradie can also make notes for each job. A job can have any number of notes associated with them.
The tradie should be able to:
- Filter and sort the list of jobs.
- Click on a job in the list to view their details and add/edit notes for that job.
- Change the status of a job.

Non-functional:
- Responsive design
- CI/CD Build pipeline

## Frameworks & Tools used
- VirtualDom & Components [Vue.js](https://vuejs.org/)
- SPA Support [Vue Router](https://router.vuejs.org/)
- Localisation support [Vue i18n](https://kazupon.github.io/vue-i18n/)
- Material Design UI Component kit [Vuetify](https://vuetifyjs.com/)
- Unit Tests [Mocha](https://mochajs.org/)
- E2E Tests [NightWatch](https://nightwatchjs.org/)

## Project Structure
```
.
├── node_modules/
├── public/                   Statically hosted files
│   ├── index.html
│   ├── favicon.png
│   └── config.json           Deployment config, overwrites any config properties, use with container volume/config.
├── src/                      Source code lives here.
│   ├── components/           Reusable UI components, structured by classes.
│   ├── locales/              Localisation files
│   ├── plugins/              Initialisation for certain plugins.
│   ├── router/               Defines the routes, and the components (Views) used for these routes.
│   ├── views/                Defines the Views accessible through routes.
│   ├── Api.js                Mock REST API + Data store based on FeathersJS
│   ├── App.vue               Global Vue component
│   ├── i18n.js               Localisation initalisation file
│   ├── LocalService.js       Feathers Base Service class
│   └── main.js               Entrypoint for Vue
├── tests
│   ├── e2e/
│   └── unit/
├── .browserslistrc
├── .editorconfig             EditorConfig code style configuration
├── .env                      Configuration properties loaded during build time, can be suffixed with NODE_ENV.
├── .eslintrc.js              ESLINT code linter, using StandardJS + @Vue/Recommended
├── .gitignore
├── .babel.config.js
├── Dockerfile                Dockerfile for building NGINX container with code.
├── jsconfig.json
├── nginx.conf                NGINX Config file used in CI/CD.
├── package-lock.json
├── package.json
└── vue.config.js
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Run end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

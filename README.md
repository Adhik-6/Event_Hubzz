# Event Hubzz

## Future Implementation
// Storing qrCode in cloudinary or mongoDB (base64 as buffer). So that users can request their qrcode if missed.
// Free/cost for event registration, search, sort by this category
// no duplicate events
// A seperate page to display user profile to other users
// Also remove events that are one month older
// When the organiser creates an event asks the organiser if he would like to add any additional information
// Bind the activeStep with the URL, make states persistent if doing so.
// modify the questions section in analytics page to show different answers given by users.
// In RegistrationTable component, use debouncing to make seaching efficient. Also the Date & Time questions are not searchable (though they are searchable in YYYY-MM-DD & HH:MM format).
// Add a Notifications tab in the profile page.
// Implement 'forgot password' functionality.
// Add Sort and "view only selected column" functions in table
// Give the sorting logics to backend by adding queries in 
// Scaling options: Create a new mongoDB DB using the EventHubzz mail id, deploy using the eventHubzz mail id.
// **UX** - In createEvent page > eventDetails component, let the user know invalid inputs.


// let the readers know user === response in backend
attach screenshots of the app & website to the readme

## Steps to Run:
  1. Add an .env file in the root level of the project with the following variables: 
     - PORT
     - VITE_PORT
     - MONGO_URI
     - MAIL_ID
     - MAIL_PASS (Get The APP KEY for your Gmail account)
     - CLOUDINARY_CLOUD_NAME
     - CLOUDINARY_API_KEY
     - CLOUDINARY_API_SECRET
     - JWT_SECRET
     - CLIENT_URL (eg: `http://localhost:5173` )
     - SERVER_URL (eg: `http://localhost:` )
     - VITE_SERVER_URL ( eg: `http://localhost:` )
  2. Run: `npm i`
  3. To Run Backend: `npm run dev` at the root level of the project.
  4. To Run Frontend: `cd ./client && npm run dev` at the root level of the project in another terminal.



<div align="center">

  <img src="assets/logo.png" alt="logo" width="200" height="auto" />
  <h1>Awesome Readme Template</h1>
  
  <p>An awesome README template for your projects! </p>
  
  
   <!-- Badges -->
   <p>
   <a href="https://github.com/Louis3797/awesome-readme-template/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/Louis3797/awesome-readme-template" alt="contributors" />
   </a>
   <a href="">
      <img src="https://img.shields.io/github/last-commit/Louis3797/awesome-readme-template" alt="last update" />
   </a>
   <a href="https://github.com/Louis3797/awesome-readme-template/network/members">
      <img src="https://img.shields.io/github/forks/Louis3797/awesome-readme-template" alt="forks" />
   </a>
   <a href="https://github.com/Louis3797/awesome-readme-template/stargazers">
      <img src="https://img.shields.io/github/stars/Louis3797/awesome-readme-template" alt="stars" />
   </a>
   <a href="https://github.com/Louis3797/awesome-readme-template/issues/">
      <img src="https://img.shields.io/github/issues/Louis3797/awesome-readme-template" alt="open issues" />
   </a>
   <a href="https://github.com/Louis3797/awesome-readme-template/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/Louis3797/awesome-readme-template.svg" alt="license" />
   </a>
   </p>
   
   <!-- Links -->
   <h4>
      <a href="https://github.com/Louis3797/awesome-readme-template/">View Demo</a>
  <span> · </span>
      <a href="https://github.com/Louis3797/awesome-readme-template">Documentation</a>
  <span> · </span>
      <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Report Bug</a>
  <span> · </span>
      <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Request Feature</a>
  </h4>

</div>

<br />


<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [Event Hubzz](#event-hubzz)
  - [Future Implementation](#future-implementation)
  - [Steps to Run:](#steps-to-run)
- [:notebook\_with\_decorative\_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)
  - [:star2: About the Project](#star2-about-the-project)
    - [:camera: Screenshots](#camera-screenshots)
    - [:space\_invader: Tech Stack](#space_invader-tech-stack)
    - [:dart: Features](#dart-features)
    - [:key: Environment Variables](#key-environment-variables)
  - [:toolbox: Getting Started](#toolbox-getting-started)
    - [:bangbang: Prerequisites](#bangbang-prerequisites)
    - [:gear: Installation](#gear-installation)
    - [:test\_tube: Running Tests](#test_tube-running-tests)
    - [:running: Run Locally](#running-run-locally)
    - [:triangular\_flag\_on\_post: Deployment](#triangular_flag_on_post-deployment)
  - [:eyes: Usage](#eyes-usage)
  - [:compass: Roadmap](#compass-roadmap)
  - [:wave: Contributing](#wave-contributing)
    - [Top contributors:](#top-contributors)
  - [:grey\_question: FAQ](#grey_question-faq)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)
  - [:gem: Acknowledgements](#gem-acknowledgements)


<!-- About the Project -->
## :star2: About the Project


<!-- Screenshots -->
### :camera: Screenshots

<div align="center"> 
  <img src="https://placehold.co/600x400?text=Your+Screenshot+here" alt="screenshot" />
</div>


<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://go.dev/">Golang</a></li>
    <li><a href="https://nestjs.com/">Nest.js</a></li>
    <li><a href="https://socket.io/">SocketIO</a></li>
    <li><a href="https://www.prisma.io/">Prisma</a></li>    
    <li><a href="https://www.apollographql.com/">Apollo</a></li>
    <li><a href="https://graphql.org/">GraphQL</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mysql.com/">MySQL</a></li>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
    <li><a href="https://redis.io/">Redis</a></li>
    <li><a href="https://neo4j.com/">Neo4j</a></li>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.docker.com/">Docker</a></li>
    <li><a href="https://www.jenkins.io/">Jenkins</a></li>
    <li><a href="https://circleci.com/">CircleCLI</a></li>    
  </ul>
</details>

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<!-- Features -->
### :dart: Features

- Feature 1
- Feature 2
- Feature 3

<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Installation -->
### :gear: Installation

Install my-project with npm

```bash
  yarn install my-project
  cd my-project
```
   
<!-- Running Tests -->
### :test_tube: Running Tests

To run tests, run the following command

```bash
  yarn test test
```

<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/Louis3797/awesome-readme-template.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```


<!-- Deployment -->
### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  yarn deploy
```

<!-- Usage -->
## :eyes: Usage

Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources.


```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

<!-- ROADMAP -->
## :compass: Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## :wave: Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


### Top contributors:

<a href="https://github.com/othneildrew/Best-README-Template/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=othneildrew/Best-README-Template" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FAQ -->
## :grey_question: FAQ

- Question 1

  + Answer 1

- Question 2

  + Answer 2


<!-- License -->
## :warning: License

Distributed under the no License. See LICENSE.txt for more information.


<!-- Contact -->
## :handshake: Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/Louis3797/awesome-readme-template](https://github.com/Louis3797/awesome-readme-template)


<!-- Acknowledgments -->
## :gem: Acknowledgements

Use this section to mention useful resources and libraries that you have used in your projects.

 - [Shields.io](https://shields.io/)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#travel--places)
 - [Readme Template](https://github.com/othneildrew/Best-README-Template)


[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

<div id="readme-top" align="center">

  <img src="./client/src/assets/event_hubzz_logo.jpg" alt="Event Hubzz Logo" width="200" height="auto" />
  <h1>Event Hubzz</h1>

  <p>Event Management, Analytics and Verification for your Event! </p>

  <!-- Badges -->
  <p>
    <a href="https://github.com/Adhik-6/Event_Hubzz/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/Adhik-6/Event_Hubzz" alt="contributors" />
    </a>
    <a href="https://github.com/Adhik-6/Event_Hubzz">
      <img src="https://img.shields.io/github/last-commit/Adhik-6/Event_Hubzz" alt="last update" />
    </a>
    <a href="https://github.com/Adhik-6/Event_Hubzz/network/members">
      <img src="https://img.shields.io/github/forks/Adhik-6/Event_Hubzz" alt="forks" />
    </a>
    <a href="https://github.com/Adhik-6/Event_Hubzz/stargazers">
      <img src="https://img.shields.io/github/stars/Adhik-6/Event_Hubzz" alt="stars" />
    </a>
    <a href="https://github.com/Adhik-6/Event_Hubzz/issues/">
      <img src="https://img.shields.io/github/issues/Adhik-6/Event_Hubzz" alt="open issues" />
    </a>
    <a href="https://github.com/Adhik-6/Event_Hubzz/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/Adhik-6/Event_Hubzz.svg" alt="license" />
    </a>
  </p>

  <!-- Links -->
  <h4>
    <a href="https://event-hubzz.onrender.com">View Site</a>
    <span> · </span>
    <a href="https://github.com/Adhik-6/Event_Hubzz">Documentation</a>
    <span> · </span>
    <a href="https://github.com/Adhik-6/Event_Hubzz/issues/">Report Bug</a>
    <span> · </span>
    <a href="https://github.com/Adhik-6/Event_Hubzz/issues/">Request Feature</a>
  </h4>

</div>

<p align="center">Event Hubzz is a powerful event management, verification, and registration platform. It enables users to register for events and allows organizers to manage events, verify registrations using QR codes, view analytics, and export event data to Excel.</p>

<br />


<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)
- [TODOs \& Planned Features](#memo-todos--planned-features)
- [Contributing](#wave-contributing)
  - [Top contributors:](#medal_sports-top-contributors)
- [FAQ](#grey_question-faq)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [External Tools \& Libraries](#package-external-tools--libraries)
- [Acknowledgements](#gem-acknowledgements)


<!-- About the Project -->
## :star2: About the Project

<!-- Screenshots -->
### :camera: Screenshots

<div align="center" style="margin-bottom: 80px;">
  <div style="margin-bottom: 40px;">
    <h3>Landing Page</h3>
    <img src="./screenshots/landing_page.png" alt="Landing Page" width="80%" />
  </div>
</div>


> 📁 More screenshots are available in the [screenshots folder](./screenshots)


<!-- TechStack -->
### :space_invader: Tech Stack

* [![React][React.js]][React-url]
* [![MUI][MUI]][MUI-url]
* [![Node.js][Node.js]][Node-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Flutter][Flutter]][Flutter-url]
* [![Firebase][Firebase]][Firebase-url]
* [![Cloudinary][Cloudinary]][Cloudinary-url]
* [![V0][V0]][V0-url]


### :dart: Features

- Event registration system
- Analytics dashboard per event
- Build a custom registration form or use an external URL (e.g., Google Forms)
- Download registration details as Excel
- QR code-based verification system for participants
- User profile management
- Dedicated Flutter app for organizers to scan and verify registrations

<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```env
PORT
VITE_PORT
CLIENT_URL_DEV=http://localhost:5173
SERVER_URL_DEV=http://localhost:8000
CLIENT_URL
SERVER_URL
VITE_SERVER_URL=http://localhost:
MONGO_URI
MAIL_ID
MAIL_PASS
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
JWT_SECRET
```

<!-- Getting Started -->
##  :toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

- Node.js
- Git

### :gear: Installation

This project uses npm as package manager

1. Clone the repository:
  ```bash
  git clone https://github.com/Adhik-6/Event_Hubzz.git
  cd event-hubzz
  ```

2. Install dependencies and build:
  ```bash
  npm run build:dev
  ```

<!-- Run Locally -->
### :running: Run Locally

1. Start the backend server:
  ```bash
  npm run dev
  ```

2. Open another terminal and start the frontend:
  ```bash
  npm run dev --prefix client
  ```

3. Visit the URL shown in the second terminal (usually `http://localhost:5173`).



## :memo: TODOs & Planned Features

- [ ] DB
  - [ ] Store QR code in Cloudinary or MongoDB as buffer/base64 for easy access.
  - [ ] If possible try renaming the "User" mongoDB model into "Response"
  - [ ] Auto-remove events older than one month.
- [ ] Event Creation
  - [ ] Prompt for additional info during event creation.
  - [ ] Prevent duplicate events to be created.
  - [ ] In createEvent page > eventDetails component, let the user know invalid inputs.
- [ ] In Registration Table
  - [ ] Debounce search 
  - [ ] Also the Date & Time questions are not searchable (though they are searchable in YYYY-MM-DD & HH:MM format)
  - [ ] Add "view only selected column" feature in table
- [ ] Free vs Paid event registration, and filtering based on it.
- [ ] Public user profile pages to let other users see one's profile.
- [ ] Bind active step with URL; persist states.
- [ ] Show different answers give to different questions of type 'multiline' and 'text' in analytics' questions section
- [ ] Set up Notifications tab in user profile
- [ ] Add Forgot password functionality
- [ ] Implement backend-based sorting by adding queries to the request URL

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


### :medal_sports: Top contributors:

<a href="https://github.com/Adhik-6/Event_Hubzz/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Adhik-6/Event_Hubzz" alt="contrib.rocks image" />
</a>


<!-- FAQ -->
## :grey_question: FAQ

**Q: Can I register for any events?**  
Yes, Event Hubzz supports registration for all types of events.

**Q: What if I lose my QR code?**  
The QR will be sent to your mail. So you can get it from there. Also you can contact the support.

**Q: How do organizers verify users?** 
Using the official Event Hubzz QR Scanner App built with Flutter.

**Q: Can I use Google Forms instead of the built-in form builder?**  
Absolutely! You can integrate external forms seamlessly. Though some analytics features will not be shown.



<!-- License -->
## :warning: License

Distributed under the no License.

> Though there is no license I would suggest that you don't use this project for  **commercial** purpose.

<!-- Contact -->
## :handshake: Contact

Adhik - adhik.m10a@gmail.com


## :package: External Tools & Libraries

- **Cloudinary** – store QR codes and other media
- **Firebase Studio** – build and manage Flutter apps
- **v0 by Vercel** – AI-powered frontend generation

<!-- Acknowledgments -->
## :gem: Acknowledgements

 - [Vercel AI](https://v0.dev/)
 - [Firebase Studio](https://studio.firebase.google.com/)
 - [Cloudinary](https://cloudinary.com/)
 - [Render](https://render.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[MUI]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

[Flutter]: https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white
[Flutter-url]: https://flutter.dev/

[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/

[Cloudinary]: https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com/

[V0]: https://img.shields.io/badge/V0%20(Vercel%20AI)-000000?style=for-the-badge&logo=vercel&logoColor=white
[V0-url]: https://v0.dev/

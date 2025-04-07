
Steps to Run:
  1. Add an .env file in th eroot level of the project with the following variables: 
     - PORT, 
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

Future Implementation:-
  1. Storing qrCode in cloudinary or mongoDB (base64 as buffer). So that users can request their qrcode if missed.
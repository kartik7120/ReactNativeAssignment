# Folder Structure

- App Directory consists of (tabs) group route which is used to render home and cart screens. It also consists of a pizza folder which shows the details of a pizza
  - App folder uses file based routing where every file in the pages folder is a route in the app
- assets folder consists of images and fonts used in the app
- hooks folder consists of custom hooks used in the app. It consists of useCart hook which is used to manage the cart state locally using AsyncStorage
- redux folder consists of actions, reducers, and store used in the app.It consists of cart actions and reducers which are used to manage the cart state globally

## Extras

- A global state is implemented using redux toolkit
- Some styles have been added to the home and cart screens in the app

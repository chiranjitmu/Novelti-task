# React + Vite CRUD App

![Live App](https://novelti-task.netlify.app/)

## Overview

This application showcases a CRUD (Create, Read, Update, Delete) operation implementation using Redux as the state management tool in a React project built with Vite.

## Live Demo

Check out the live demo: [Live App](https://novelti-task.netlify.app/)

## Features

- Create, Read, Update, and Delete operations on data.
- State management with Redux.
- Built with React and Vite for faster development.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that serves your code via native ES modules.
- **Redux**: A predictable state container for JavaScript apps.
- **Yup**: A schema validation library for JavaScript.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Start the development server with `npm run dev` or `yarn dev`.

## Usage

- Use the application to perform CRUD operations on your data.
- Explore the Redux store to see how state management is implemented.

## Yup Validation

This application utilizes Yup for form validation to ensure data integrity. The validation schema is defined for each form in the application. Here's an example of how Yup is integrated into the application:

```javascript
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  // Define your validation rules for form fields here.
  // Example:
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

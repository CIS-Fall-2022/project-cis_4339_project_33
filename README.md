# Data Platform Project Setup

Requirements:

This project uses NodeJS and MongoDB.

## Backend Node Application
```
cd backend
```
Follow instructions in backend README

## Frontend Vue 3 Application
```
cd frontend
```
Follow instructions in frontend README

# API Documentation

https://documenter.getpostman.com/view/19779397/2s83zcUStW

# Backend Information

We decided to structure our database model to have the "organization name" embedded within the collections. We found this to be much easier in managing the database, as the user can input the organization name in the existing forms on the frontend. The user will then be able to call out an existing API call with a few minor changes. We added the ability to search with the API using the orgnization names stored within the database. We've also added the ability for a user to delete existing events or clients by their ID.

Previously the code provided to us, handled errors on the frontend within the browser console. We implemented changes in the backend, which will notify the developer of errors that occur on the client-side.


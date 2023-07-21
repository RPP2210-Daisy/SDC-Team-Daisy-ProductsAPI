## Overview:
Project is a REST API serving products data for an online e-commerce website. A monolithic e-commerce API was broken into multiple microservices. This repository is focused on the Products microservice.

## Tech Stack:
![Node.js](https://img.shields.io/badge/Node-pink?style=for-the-badge&logo=npm&logoColor=black)
![Express.js](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-green?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-lightblue?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-black?style=for-the-badge&logo=amazon&logoColor=white)
![NGINX](https://img.shields.io/badge/Nginx-blue?style=for-the-badge&logo=nginx&logoColor=white)

## Table of Contents:
- [Routes](#Description)
- [Description](#Description)
- [Installation](#Installation)

## Routes:
Project serves 4 total routes:
  Retrieve list of Products
  */products - GET

  Retrieve specific product information
  */products/:product_id - GET - Path Parameter: product_id (number)

  Retrieve product style information
  */products/:product_id/styles - GET - Path Parameter: product_id (number)

  Retrieve related products of specific product
  */products/:product_id/related - GET - Path Parameter: product_id (number)

## Description:
This backend API for the Products microservice focused on supporting the full dataset for the existing front-end architecture of the e-commerce website. This project included the development of an automated ETL process to handle the migration of over 35 million records into a PostgreSQL database. The database was optimized via indexing, data aggregation, and Redis caching to handle 5,000 requests per second (RPS) at a latency of under 20ms.

The API was then horizontally scaled with an NGINX load balancer and Docker Swarm pipelines were utilized for rapid iteration, reducing latency from 200ms to under 20ms. System metrics were monitored via New Relic to identify potential improvements.

The microservice was deployed in a production environment consisting of six AWS EC2 t2.micro instances: one NGINX load balancer, one PostgreSQL database, one Redis Cache, and three Node.js servers. With this setup, the microservice can handle 3,000rps with a 0.0% error rate.

<img width="962" alt="Screenshot 2023-07-21 at 2 53 42 PM" src="https://github.com/RPP2210-Daisy/SDC-Team-Daisy-ProductsAPI/assets/106470519/54fdc45d-19f7-4a7e-b26f-342e36544617">

Further scaling of the system (specifically increasing the number of the Node.js instances) sees further improvement in the system, over 5000ms with a 20ms average response time.

  
## Installation:

Detailed information about the installation process is available upon request. To give a brief overview, Docker is used extensively in this project for containerization and orchestration, providing a consistent environment for deployment. Docker Swarm is used to manage and scale the application across multiple nodes, further enhancing its performance and reliability.


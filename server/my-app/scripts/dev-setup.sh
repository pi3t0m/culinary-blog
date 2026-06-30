#!/usr/bin/env bash

set -e

echo "Checking .env file..."

if [ ! -f .env ]; then
  cp .env.example .env
  echo ".env created from .env.example"
else
  echo ".env already exists"
fi

echo "Installing backend dependencies..."
npm install

echo "Seeding database..."
npm run seed

echo "Backend setup completed."
echo "Start backend with: npm start"
# Milestone 2: Database Schema Design Explanation

## Entities I Designed

- Users:
  Stores people who can log in and make reservations.

- Resources:
  Stores reservable campus items such as study rooms and equipment.

- Reservations:
  Connects users to resources and stores booking time information.

## Relationships

A reservation connects to a user using user_id.
A reservation connects to a resource using resource_id.

One user can have many reservations.
One resource can have many reservations over time.

## Assumptions

- Only registered users can reserve resources.
- Reservations must have valid start and end times.
- Double booking will be handled later in the API.

## One Design Decision I Made

I added a purpose field to the reservations table to allow users to explain why they are reserving a resource. This improves realism in the system.

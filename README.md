# Location Data Explorer

Branched from the React Redux Starter Kit (https://github.com/davezuko/react-redux-starter-kit)

UI for exploring location data.

To run:
1. npm install
2. npm start
3. Go to http://localhost:3000/location
----

Click on 'Demo 1' or 'Demo 2' to view location data on the map

The original location data was collected from a smartphone app and has been processed into trips,
and each trip has been labeled with a mode of transport. Trips are determined using an algorithm
to find "stay" points (points where the user has stopped - e.g. home, work, gym), and "change" points
(points where the user changed mode of transport, determined by change in speed). The json files in the data
folder have already been processed.

changing
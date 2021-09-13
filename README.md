# README

Welcome, please have a look :-)

Here are links to the deployed versions of the code challenge.

MVP: https://grcc-reviews.herokuapp.com
V2: https://grcc-reviews.herokuapp.com/2.0/

# What I would have done next
- Validate form data on the client before sending to the server
- Validate form data on the server before saving to the database
- Add error handling on the server and client
- Use isolated CSS e.g. using `CSS Modules`
- Take advantage of `SSR`
- Use a different approach to render Stars, that does not depend on global SVG definitions
- Make the frontend accessible
- Add localization if required
- Find best way to run integration tests or e2e tests
- Use a different `ActionCable` React implementation (Current one uses deprecated React methods)
- Prevent relaying of "live events" over the Websocket to the same browser window as the one that caused the event in the first place (and knows about the data already)
- Implement some authorization and allow only reviewing once per user
- Some ux improvements, like paginations and others
- Add cache headers to reduce load on the server and attach to a CDN

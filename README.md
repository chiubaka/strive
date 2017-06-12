# Serenity
## Local Dev
### Setup
Serenity uses Python 3.x. All `python` and `pip` commands refer to Python 3. Check your versions with `python --version`
and `pip --version`.

1. Clone this repo.
2. If you don't already have it, install `virtualenv` with `pip install virtualenv`. This keeps dependencies cleanly separate
   by project.
3. In the `server/` directory of this repo, run `virtualenv virtualenv` to create a new environment in the `virtualenv` dir.
4. If you don't already have it, install [`autoenv`](https://github.com/kennethreitz/autoenv). This allows us to script activating
   our virtualenv when entering a certain directory.
5. `cd` out of and then back into the `server/` directory. If prompted that this is the first time you're about to run `.env` in
   this directory, answer yes. The script here automatically activates our virtual environment.
6. Install all of the `serenity` dependencies by running `pip install -r server/requirements.txt`.
7. Create a file `server/serenity/secrets.py` which should contain `SECRET_KEY`, a random secret token, `SOCIAL_AUTH_FACEBOOK_KEY`,
   and `SOCIAL_AUTH_FACEBOOK_SECRET`. Facebook secrets can be retrieved from the [Facebook Developer Portal](https://developers.facebook.com/apps/).
   The `secrets.py` file is `.gitignored` for obvious security reasons.
7. Run the server DB migrations with `cd server && python manage.py migrate`.
8. Install client node modules with `cd client && yarn install`.

### Running
#### Client
`cd client && yarn start` to start the webpack dev server. This will watch and hot reload changes to source. Front-end is
accessible through a browser at http://localhost:8080.
#### Server
`cd server && python manage.py runserver`. Django server starts on the default http://localhost:8000. There is configuration in the
webpack dev server to proxy requests to the API to this location.

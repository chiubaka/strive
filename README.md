# Strive
## Local Dev
### Setup
Strive uses Python 3.x. All `python` and `pip` commands refer to Python 3. Check your versions with `python --version`
and `pip --version`. Some systems install Python 2 and Python 3 in parallel. In this case, Python 3 and Pip 3 are usually accessible with `python3 --version` and `pip3 --version`. Since this is confusing, it's recommended you add `alias python=python3` and `alias pip=pip3` to your `~/.bashrc` file and reload the shell.

1. Clone this repo.
2. If you don't already have it, install `virtualenv` with `pip install virtualenv`. This keeps dependencies cleanly separate
   by project.
3. In the `server/` directory of this repo, run `virtualenv virtualenv` to create a new environment in the `virtualenv` dir.
4. If you don't already have it, install [`autoenv`](https://github.com/kennethreitz/autoenv). This allows us to script activating
   our virtualenv when entering a certain directory. Don't forget to `source ~/.bashrc` or reload the shell after you're done.
5. `cd` out of and then back into the `server/` directory. If prompted that this is the first time you're about to run `.env` in
   this directory, answer yes. The script here automatically activates our virtual environment. (*Note*: to deactivate the virtual environment, run `deactivate`.)
6. Install all of the `strive` dependencies by running `pip install -r server/requirements.txt`.
7. Create a file `server/serenity/secrets.py` which should contain `SECRET_KEY`, a random secret token, `SOCIAL_AUTH_FACEBOOK_KEY`,
   and `SOCIAL_AUTH_FACEBOOK_SECRET`. Facebook secrets can be retrieved from the [Facebook Developer Portal](https://developers.facebook.com/apps/).
   The `secrets.py` file is `.gitignored` for obvious security reasons.
7. Run the server DB migrations with `cd server && python manage.py migrate`.
8. Install client node modules with `cd client && yarn install`. If `yarn` is not already installed, see [installing yarn](https://yarnpkg.com/lang/en/docs/install/).
9. Add client-side secrets (storing these secrets in code client-side is likely a security risk, and needs to be fixed soon!).
    1. Create a file `client/src/secrets.ts` with two export constants: `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET`. Not yet 
  clear where these values come from or what they should be, but auth is likely to change soon anyway, so use the value "test" for both.

### Running
#### Client
`cd client && yarn start` to start the webpack dev server. This will watch and hot reload changes to source. Front-end is
accessible through a browser at http://localhost:8080.
#### Server
`cd server && python manage.py runserver`. Django server starts on the default http://localhost:8000. There is configuration in the
webpack dev server to proxy requests to the API to this location.

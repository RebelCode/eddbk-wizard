# edd-spa

> SPA for the EDD plugin

## Environment
These commands are run in the local environment, and will set up a virtual
machine with all dependencies. This requires the host to have Vagrant
[installed][vagrant-installation].

``` bash
# bring up box
vagrant up

# login into the box
vagrant ssh
```

After this, run `npm run dev` (see "Build Setup") in the project folder located
at `/var/www/project`.

## Build Setup
These commands are run inside the virtual environment.

``` bash
# install dependencies
npm install

# serve with hot reload at 192.168.33.10:8090
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


[vagrant-installation]:                 https://www.vagrantup.com/docs/installation/

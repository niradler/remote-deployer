# Remote Deployer

***Deployer*** is an npm package to deploy to a remote server.

- deploy with ssh: connect to the server and run command from a script, good for running from client or build server.
- deploy with http: create get request with secret key to fire deploy process (preconfigure script run), to set up on the remote server.
- deploy with ftp: coming soon.

***
 Used by me at [devresources](https://devresources.site/), 
 helping me to setup ci/cd with gitlab worker.
***

### Setup

```
npm i -g remote-deployer
```

### API

- ```deployer -h //show help file```
- ```deployer ssh -h //show sub help file```
- ```deployer init```

### Notes

- to support multi configuration, you need to make sure the default_id key in the config is not set. (you need to run the commands in the project folder)
- to support running deployer from anywhere but support only one configuration make sure default_id is set.
- get config file path: ```deployer config path```
- print config file: ```deployer config all```

### TODO

- restore to last deployed commit and deploy.
- ftp deploy

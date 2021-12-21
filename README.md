# Musola test API
- name: Eduin Garcia Cordero
- linkedin: [https://www.linkedin.com/in/eduinlight/](https://www.linkedin.com/in/eduinlight/)
- github: [https://github.com/eduinlight](https://github.com/eduinlight)
- email: [eduinlight@gmail.com](mailto:eduinlight@gmail.com)
- stack: Nodejs + Nestjs + Mongodb + GIT + Docker + ESlint + Typescript + Gitlab-CI

## Notes

I include in this repository my .env local file to avoid run problems and because dont contain any sensitive information.

## For Development

### Start mongodb server

I recommend to use mongodb containerized with docker. You can use the docker-compose-db.yml file that came with this repository executing.

```bash
docker-compose -f docker-compose-db.yml up -d
```

### Open a terminal and execute
```bash
git clone https://gitlab.com/musola-gateway/api
cd api
```

### Install nodejs dependencies
```bash
npm i
```

### Start development server
```bash
npm start

```

### Test-Driven Development (TDD)

If you want to use TDD in the project for a better development enviromment execute
```bash
npm run tdd
```

## Run tests

```bash
npm run test
```

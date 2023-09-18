### back end NodeJS + Test + solid

# map
  - initial project
    - npm init -y
  - eslint
    - npm i eslint -D
    - eslint init or npm @eslint/config
    - add in file
      - "rules": {
        "no-useless-constructor": "off"
    }
  - entities/appointment.ts
  - appointment.spec.ts
  - Text
    - [Vitest](https://vitest.dev/guide/)
    - npm i vitest -D
    - create file main files `vite.config.ts`
  - create test `entities/appointment.spec.ts`
  - create script in `package.json`
    "test": "vitest"
    - npm run test
  - create `use-cases/create-appointment.ts`
  - create `use-cases/create-appointment.spec.ts`
  - create `tests/utils/get-future-date.ts`
  - lidar com datas
    - npm i date-fns
  

# about
  - entities
  - use-cases
    - funcionalidades da nossa função
    - dentro teremos as ações comun q nossa aplicação vai ter
  - repositories
    - seria tipo um banco de dados em memoria (array)
    - primeiro criar nosso contrato
      - vai ficar nossos metodos

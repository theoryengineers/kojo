Typescript, Webpack and more

psql -U postgres -c 'DROP DATABASE IF EXISTS kojo;'
psql -U postgres -c 'CREATE DATABASE kojo;'

pg_restore -U postgres -d kojo C:\whatever\location\kojo.tar

not finished yet
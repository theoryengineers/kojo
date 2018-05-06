Typescript, Webpack and more

psql -U postgres -c 'DROP DATABASE IF EXISTS kojo;'
psql -U postgres -c 'CREATE DATABASE kojo;'

pg_restore -U postgres -d kojo C:\whatever\location\kojo.tar

not finished yet

============================================================================
============================================================================
Command Flags for Server

./npm start -- -u -p -d -h

-u [database username]
-p [database password]
-d [database name]
-h [database host]
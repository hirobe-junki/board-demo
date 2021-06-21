# board-demo

## docker起動
```bash
docker-compose up --build -d
```

## docker終了
```bash
docker-compose stop
```

## node 起動(docker起動後)
```bash
docker exec -it board_demo bash
npm start
```

## DB準備
### マイグレーション
- up
```
npx sequelize-cli db:migrate --env {ENV}
```
- down
```
npx sequelize-cli db:migrate:undo --env {ENV}
```

## サーバー起動後アクセス
- Index  
http:localhost:8080
- ユーザー管理  
http:localhost:8080/users
- ログイン
http:localhost:8080/users/login

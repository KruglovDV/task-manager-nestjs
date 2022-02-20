migrate:
	npx typeorm migration:run

migration-generate:
	npx typeorm migration:generate -n $(NAME)

dev:
	npm run start:dev


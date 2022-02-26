module.exports = {
  type: 'postgres',
  host: 'task_manager_db',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrationsTableName: 'migration',
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: false,
  synchronize: false,
  autoLoadEntities: true,
};

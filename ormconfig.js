module.exports = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'task_manager_user',
  password: 'postgres',
  database: 'task_manager2',
  entities: ['dist/**/*.entity.js'],
  migrationsTableName: 'migration',
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'dist/migration',
  },
  ssl: false,
  synchronize: false,
  autoLoadEntities: true,
};

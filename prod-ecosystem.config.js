const basePort = process.env.PM2_PORT || 3000;

module.exports = {
  apps: [
    {
      name: 'compiler-api-gateway',
      script: 'dist/apps/api-gateway/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: basePort + 0
      },
    },
    {
      name: 'compiler-backend-engine',
      script: 'dist/apps/backend-engine/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: basePort + 1
      },
    },
    {
      name: 'compiler-cron-scheduler',
      script: 'dist/apps/cron-scheduler/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: basePort + 2
      },
    },
  ],
};

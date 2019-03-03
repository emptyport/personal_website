module.exports = {
  apps : [{
    name: 'michaelporter',
    script: './server.js',

    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

};

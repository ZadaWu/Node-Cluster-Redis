module.exports = {
  apps: [{
    name: "fibonacci-service",
    script: "./src/app.ts",
    instances: "max",
    exec_mode: "cluster",
    watch: true,
    max_memory_restart: "1G",
    interpreter: "bun",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    },
    env_development: {
      NODE_ENV: "development",
      PORT: 3000
    },
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    error_file: "logs/error.log",
    out_file: "logs/output.log",
    merge_logs: true,
  }]
} 
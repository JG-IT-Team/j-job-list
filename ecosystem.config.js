module.exports = {
  apps: [{
    name: 'job-list-static',
    script: 'npm',
    args: 'start',
    cwd: '/mnt/hddraid/projects/job-list-static',
    instances: 1, // Or more for clustering, e.g., 'max' for CPU cores
    exec_mode: 'fork', // Use 'cluster' for multiple instances
    env: {
      NODE_ENV: 'production',
      PORT: 54001
    },
    // Optional: Auto-restart on file changes (for dev, but can be used in prod)
    watch: false,
    // Logs
    log_file: '/var/log/pm2/job-list-static.log',
    out_file: '/var/log/pm2/job-list-static-out.log',
    error_file: '/var/log/pm2/job-list-static-error.log'
  }]
};
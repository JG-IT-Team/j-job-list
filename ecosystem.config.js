module.exports = {
  apps: [{
    name: 'j-job-list',
    script: 'npm',
    args: 'start',
    cwd: '/mnt/hddraid/projects/j-job-list',
    instances: 1, // Or more for clustering, e.g., 'max' for CPU cores
    exec_mode: 'fork', // Use 'cluster' for multiple instances
    env: {
      NODE_ENV: 'production',
      PORT: 54001
    },
    // Optional: Auto-restart on file changes (for dev, but can be used in prod)
    watch: false,
    // Logs
    log_file: '/var/log/pm2/j-job-list.log',
    out_file: '/var/log/pm2/j-job-list-out.log',
    error_file: '/var/log/pm2/j-job-list-error.log'
  }]
};
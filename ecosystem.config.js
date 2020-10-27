module.exports = {
  apps : [{
    script    : "src/index.js",
    instances : "3",
    exec_mode : "cluster",
    error_file: 'err.log',
    out_file: 'out.log',
    log_file: 'combined.log',
    time: true
  }]
}
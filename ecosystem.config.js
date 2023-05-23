module.exports = {
  apps : [{
    name:"hbos-people-counter-service",
    script: 'dist/server.js',
    watch: '.',
    ignore_watch:['dist/opencv/people_count.csv'],
    env:{
      PORT:3000
    }
  }],
};
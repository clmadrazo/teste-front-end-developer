module.exports=function(e){e.config("copy.index-files",{expand:!0,cwd:"build/umd/",src:["moment.js","locale/*.js","min/locales.js","min/moment-with-locales.js","min/tests.js"],dest:"."}),e.registerTask("update-index",["copy:index-files"])};
const app = require('./app');       

app.listen(app.get('port'),() => {
    console.log("servidor", app.get("port"));

});
import app from "./server.js";

app.listen(app.get('port'), () => {
    console.log(`Servidor en ejecucion! http://localhost:${app.get('port')}`);
})
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const estado_router_1 = require("./router/estado.router");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(cors());
    }
    routes() {
        this.express.use('/estados', estado_router_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map
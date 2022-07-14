// *********** Требования к функции *************************
// получает объект запроса который содержит тело запроса с объектом пользователя
// ищет пользвателя в базе данных
// возвращает объект положительного либо неудачного запроса к базе данных

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_DB } = process.env;
const express = require("express");
const req = require("supertest");
const app = express();
const login = require("../controllers/users/users").userLogin;
app.post("/api/auth/login", login);
const PORT = 3000;

describe("User login", () => {
    beforeAll(async () => {
        app.listen(PORT, async () => {
            console.log(`test start on port = ${PORT}`);
        });
        await mongoose.connect(MONGO_DB).then(() => {
            console.log(`mongoDB connection test`);
        });
    });
    afterAll(() => {
        app.close(function () {
            process.exit(0);
        });
    });

    test("req.newUser, res.succefull", async () => {
        const send = { password: "Vayatochkin", email: "pyatka@mail.com" };
        const res = await req(app).post("/api/auth/login").send(send);
        expect(res.status).toBe(200 || 400);
        // expect(res.body.hasOwnProperty("response")).toBe(true);
        // expect(res.body.hasOwnProperty("massage")).toBe(true);
        // expect(res.body.hasOwnProperty("error")).toBe(false);
        // expect(res.body.response).toEqual({
        //     password: String,
        //     email: String,
        //     subscription: String,
        //     avatarURL: String,
        //     token: String,
        //     _id: String,
        // });
    });

    test("req.emptyUser, res.error", async () => {
        const send = { password: "", email: "" };
        const res = await req(app).post("/api/auth/login").send(send);
        expect(res.status).toBe(404);
        // expect(res.body.hasOwnProperty("response")).toBe(true);
        // expect(res.body.hasOwnProperty("massage")).toBe(true);
        // expect(res.body.hasOwnProperty("error")).toBe(true);
        // expect(res.body.response).toBeNull();
    });
});

// *********** Требования к функции *************************
// получает объект запроса который содержит тело запроса с объектом пользователя
// проверяет дубликат пользвателя в базе данных
// возможно возвращает объект результата проверки на дубликат
// сохраняет пользователя в базу
// возвращает объект положительного либо неудачного запроса к базе данных

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_DB } = process.env;
const express = require("express");
const req = require("supertest");
const app = express();
const signin = require("../controllers/users/users").addNewUser;
app.post("/api/auth/signin", signin);
const PORT = 3030;

describe("User signin", () => {
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
        const send = { password: "NikolaRanok", email: "nikSun@mail.com" };
        const res = await req(app).post("/api/auth/signin").send(send);
        expect(res.status).toBe(200 || 400);
        // expect(res.body.hasOwnProperty("response")).toBe(true);
        // expect(res.body.hasOwnProperty("massage")).toBe(true);
        // expect(res.body.hasOwnProperty("error")).toBe(false);
    });

    test("req.emptyUser, res.error", async () => {
        const send = { password: "", email: "" };
        const res = await req(app).post("/api/auth/signin").send(send);
        expect(res.status).toBe(404);
        // expect(res.body.hasOwnProperty("response")).toBe(true);
        // expect(res.body.hasOwnProperty("massage")).toBe(true);
        // expect(res.body.hasOwnProperty("error")).toBe(true);
    });
});

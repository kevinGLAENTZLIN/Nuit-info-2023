import { app, db } from "./global.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import formRouter from "./routes/form.js";

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/form", formRouter);

app.get("/", (req, res) => {
    res.send("Area API");
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`App listening to http://${process.env.HOST_NAME}:${process.env.PORT}`);
});



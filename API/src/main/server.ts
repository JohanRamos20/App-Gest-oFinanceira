import { app } from "./app"
import { connectRedis } from "../infrastructure/cache/redis-client";

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
    await connectRedis();
    console.log("Redis conectado!");
    
    app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
});

}

bootstrap()
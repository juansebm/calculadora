import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
// Configura el middleware koa-bodyparser
app.use(bodyParser());
app.use(router.routes());

// Ruta para la suma
router.get('/suma/:num1/:num2', (ctx) => {
  const num1 = parseInt(ctx.params.num1);
  const num2 = parseInt(ctx.params.num2);
  const resultado = num1 + num2;
  ctx.body = {
    status: 'success',
    resultado: resultado,
  };
});

// Ruta para la resta
router.post('/resta', (ctx) => {
  const num1 = parseInt(ctx.request.body.num1);
  const num2 = parseInt(ctx.request.body.num2);
  const resultado = num1 - num2;
  ctx.body = {
    status: 'success',
    resultado: resultado,
  };
});

// Inicia el servidor Koa
app.listen(3000, () => {
  console.log('Servidor Koa iniciado en el puerto 3000');
});

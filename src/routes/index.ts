export { setRoutes };

import { Router } from 'express';
import { IndexController } from '../controllers';

const router = Router();
const indexController = new IndexController();

function setRoutes(app) {
    app.use('/', router);
    router.get('/', indexController.getIndex.bind(indexController));
}
import { Router } from "express";
import { loggerDev, loggerProduction } from "../utils/loggers.js";
const router = Router();

router.get('/', (req, res) => {
  
    loggerDev.debug('Mensaje de prueba en nivel debug');
    loggerDev.verbose('Mensaje de prueba en nivel verbose');
    loggerDev.http('Mensaje de prueba en nivel http');
    loggerDev.info('Mensaje de prueba en nivel info');
    loggerDev.warn('Mensaje de prueba en nivel warn');
    loggerDev.error('Mensaje de prueba en nivel error');
    
    loggerProduction.info('Mensaje de prueba en nivel info (producción)');
    loggerProduction.warn('Mensaje de prueba en nivel warn (producción)');
    loggerProduction.error('Mensaje de prueba en nivel error (producción)');
    
    
    res.send('Prueba de loggers realizada');
  });

export default router; 
  

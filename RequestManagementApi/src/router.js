const express = require('express');
const controllerRequest = require('./controllers/RequestController');

const routes = express.Router();

routes.get('/List', controllerRequest.List);
routes.get('/List/:requestId', controllerRequest.GetByRequestID);
routes.get('/List/Status/:requestStatus', controllerRequest.GetByRequestStatus);
routes.get('/List/Requester/:requesterName', controllerRequest.GetByRequesterName);
routes.get('/List/Item/:itemDescription', controllerRequest.GetByItemDescription);
routes.post('/Create', controllerRequest.Create);
routes.put('/Update/:requestId', controllerRequest.Update);
routes.delete('/Delete/:requestId', controllerRequest.Delete);

module.exports = routes;
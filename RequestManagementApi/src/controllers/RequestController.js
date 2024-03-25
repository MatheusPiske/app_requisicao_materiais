const { Op } = require('sequelize');
const RequestModel = require('../models/request');

module.exports = {
    async List(req, res) {
        try {
            const requests = await RequestModel.findAll();
            return res.json(requests);
        } catch (error) {
            console.error("List error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async GetByRequestID(req, res) {
        try {
            const requestId = req.params.requestId;
            const purchaseRequest = await RequestModel.findByPk(requestId);
            if (!purchaseRequest) {
                return res.status(404).json({ error: 'Request not found' });
            }
            return res.json(purchaseRequest);
        } catch (error) {
            console.error("GetByRequestID error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async GetByRequestStatus(req, res) {
        try {
            const requestStatus = req.params.requestStatus;
            const purchaseRequests = await RequestModel.findAll({
                where: {
                    RequestStatus: requestStatus
                }
            });
            return res.json(purchaseRequests);
        } catch (error) {
            console.error("GetByRequestStatus error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async GetByRequesterName(req, res) {
        try {
            const requesterName = req.params.requesterName;
            const purchaseRequests = await RequestModel.findAll({
                where: {
                    RequesterName: {
                        [Op.like]: `%${requesterName}%`
                    }
                }
            });
            return res.json(purchaseRequests);
        } catch (error) {
            console.error("GetByRequesterName error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async GetByItemDescription(req, res) {
        try {
            const itemDescription = req.params.itemDescription;
            const purchaseRequests = await RequestModel.findAll({
                where: {
                    ItemDescription: {
                        [Op.like]: `%${itemDescription}%`
                    }
                }
            });
            return res.json(purchaseRequests);
        } catch (error) {
            console.error("GetByItemDescription error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async GetLastCreated(req, res) {
        try {
            const lastRequest = await RequestModel.findOne({
                order: [['createdAt', 'DESC']]
            });
            return res.json(lastRequest);
        } catch (error) {
            console.error("GetLastCreated error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async Create(req, res) {
        try {
            const requests = await RequestModel.create({
                RequestID: req.body.RequestID,
                RequesterName: req.body.RequesterName,
                ItemDescription: req.body.ItemDescription,
                ProductPrice: req.body.ProductPrice,
                Quantity: req.body.Quantity,
                RequestStatus: req.body.RequestStatus,
                StatusDescription: req.body.StatusDescription,
            });
            return res.json(requests);
        } catch (error) {
            console.error("Create error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async Update(req, res) {
        try {
            const requestId = req.params.requestId;
            const purchaseRequest = await RequestModel.findByPk(requestId);
            if (!purchaseRequest) {
                return res.status(404).json({ error: 'Request not found' });
            }
            purchaseRequest.RequestStatus = req.body.RequestStatus;
            purchaseRequest.StatusDescription = req.body.StatusDescription;
            await purchaseRequest.save();
            return res.json(purchaseRequest);
        } catch (error) {
            console.error("Update error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    async Delete(req, res) {
        try {
            const requestId = req.params.requestId;
            const purchaseRequest = await RequestModel.findByPk(requestId);
            if (!purchaseRequest) {
                return res.status(404).json({ error: 'Request not found' });
            }
            await purchaseRequest.destroy();
            return res.json(purchaseRequest);
        } catch (error) {
            console.error("Delete error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },
};

import express from 'express';
import {
	getCompanies, getCompany, addCompany, removeCompany, putCompany, saveCompany,
	getFounders, getFounder, addFounder, removeFounder, putFounder, saveFounder
} from './service.mjs';

const router = express.Router();

router.route('/companies')
	.get((request, response) => getCompanies(request, response))
	.post((request, response) => addCompany(request, response));

router.route('/companies/:id')
	.get((request, response) => getCompany(request, response))
    .put((request, response) => putCompany(request, response))
	.post((request, response) => addCompany(request, response))
	.patch((request, response) => saveCompany(request, response))
	.delete((request, response) => removeCompany(request, response));

router.route('/founders')
	.get((request, response) => getFounders(request, response))
	.post((request, response) => addFounder(request, response));

router.route('/founders/:id')
	.get((request, response) => getFounder(request, response))
	.post((request, response) => addFounder(request, response))
    .put((request, response) => putFounder(request, response))
	.patch((request, response) => saveFounder(request, response))
	.delete((request, response) => removeFounder(request, response));

router.route('/companies/:id/founders')
	.get((request, response) => getFounders(request, response))
	.post((request, response) => addFounder(request, response));

router.route('/companies/:id/founders/:id')
	.get((request, response) => getFounder(request, response))
	.post((request, response) => addFounder(request, response))
    .put((request, response) => putFounder(request, response))
	.patch((request, response) => saveFounder(request, response))
	.delete((request, response) => removeFounder(request, response));

export default router;
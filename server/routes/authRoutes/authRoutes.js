const path = require('path')
const { Router } = require('express');
const router = Router();
const userAuth = require('../../middlewares/authentication');

//authControllers
const authCtrls = require(path.join(__dirname, "../", "../", "controllers", "authControllers", "authControllers.js"));

router.post('/registration', authCtrls.registration);
router.post('/registration/activation-token', authCtrls.activation);
router.post('/userdetails', authCtrls.userDetails);
router.post('/login', authCtrls.login);
router.get('/refresh_token', authCtrls.getAccessToken);
router.get('/userinfo', userAuth, authCtrls.userinfo);
router.get('/userdetails/:id', authCtrls.getUserDetails);
router.patch('/updateaboutme', authCtrls.updateAboutMe);
router.patch('/updatepersonaldetails', authCtrls.updatePersonalDetails);
router.patch('/add/company', authCtrls.addCompany);
router.patch('/update/company',authCtrls.updateCompany);
router.patch('/delete/company', authCtrls.deleteCompany);
router.patch('/add/college', authCtrls.addCollege);
router.patch('/update/college', authCtrls.updateCollege);
router.patch('/delete/college', authCtrls.deleteCollege);
router.patch('/add/skill', authCtrls.addSkill);
router.patch('/delete/skill/:userdetailsid/:id', authCtrls.deleteSkill);
router.patch('/add/language', authCtrls.addLanguage);
router.patch('/delete/language/:userdetailsid/:id', authCtrls.deleteLanguage);

module.exports = router;
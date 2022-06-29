const express = require('express');
const { check } = require('express-validator');

const dtcController = require('../controllers/dtc-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//Path is /api/dtc
router.get('/', dtcController.getAllDtcs);

router.get('/:id', dtcController.getDtcById);

router.use(checkAuth);

router.post(
  '/',
  [
    check('system.title').not().isEmpty(),
    check('system.subCode').not().isEmpty(),
    check('system.subName').not().isEmpty(),
    check('code.title').not().isEmpty(),
    check('code.description').not().isEmpty(), //.isLength({ min: 5 })
  ],
  dtcController.addDtc
);

router.patch(
  '/:id',
  [
    check('system.title').not().isEmpty(),
    check('system.subCode').not().isEmpty(),
    check('system.subName').not().isEmpty(),
    check('code.title').not().isEmpty(),
    check('code.description').not().isEmpty(),
  ],
  dtcController.editDtc
);

router.delete('/:id', dtcController.deleteDtc);

module.exports = router;

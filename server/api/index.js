const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/communities', require('./communities'));
router.use('/images', require('./images'));
router.use('/artifacts', require('./artifacts'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const { ZodError } = require('zod');

const validateRequest = (schema) => async (req, res, next) => {
  try {
    if (schema.body) {
      req.body = await schema.body.parseAsync(req.body);
    }
    if (schema.query) {
      req.query = await schema.query.parseAsync(req.query);
    }
    if (schema.params) {
      req.params = await schema.params.parseAsync(req.params);
    }
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        code: 'VALIDATION_ERROR'
      });
    }
    return next(error);
  }
};

module.exports = validateRequest;

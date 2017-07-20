'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Sanitizes a single given value.
 *
 * @param  {String} value The value to sanitize.
 *
 * @return {String}       The sanitized version of the value.
 */
const sanitizeValue = value => {
  // Non string types don't need to be sanitized
  if (typeof value !== 'string') return value;

  return value
  // Replace single character special characters
  .replace(/[*+\-=~><"?^${}():!/[\]\\\s]/g, '\\$&')
  // replace ||
  .replace(/\|\|/g, '\\||')
  // replace &&
  .replace(/&&/g, '\\&&')
  // replace AND
  .replace(/AND/g, '\\A\\N\\D')
  // replace OR
  .replace(/OR/g, '\\O\\R')
  // replace NOT
  .replace(/NOT/g, '\\N\\O\\T');
};

/**
 * Sanitizes a whole object of key value pairs.
 *
 * @param  {Object}  object The object of key value pairs to sanitize.
 *
 * @return {Boolean}        Always returns true.
 */
const sanitizeObject = (object = {}) => {
  // Sanitize all key value pairs of the object
  Object.keys(object).map(key => {
    // eslint-disable-next-line no-param-reassign
    object[key] = sanitizeValue(object[key]);
    return null;
  });

  return object;
};

/**
 * An Express middleware which sanitizes all parameter types for elasticsearch.
 *
 * @param  {Object}   req  The Express request object.
 * @param  {Object}   res  The Express response object.
 * @param  {Function} next The Express next function.
 */
const sanitize = (req, res, next) => {
  const PARAM_TYPES = ['body', 'params', 'query'];

  // Sanitize all param types
  PARAM_TYPES.map(type => {
    sanitizeObject(req[type]);
    return null;
  });

  return next();
};

exports.default = sanitize;
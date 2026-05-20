import { body, param, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

const validateResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

export const validateAddToCart = [
  param("productId").isMongoId().withMessage("Inavlid product ID"),
  param("variantId").optional().isMongoId().withMessage("Invalid variant ID"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity ,must be a number"),

  validateResult,
];

export const validateCartQuantity = [
  param("productId").isMongoId().withMessage("Inavlid product ID"),
  param("variantId").isMongoId().withMessage("Invalid variant ID"),
  validateResult,
];

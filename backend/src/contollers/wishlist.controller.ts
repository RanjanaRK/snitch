import type { Request, Response } from "express";
import type { JwtUser } from "../utils/types.js";
import productModel from "../model/product.model.js";
import { wishlistModel } from "../model/wishlist.model.js";

// export const createWishlist = async (req: Request, res: Response) => {
//   try {
//     const { productId, variantId } = req.params;
//     const user = req.user as JwtUser;

//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const wishlist =
//       (await wishlistModel.findOne({ user: user.id })) ||
//       (await wishlistModel.create({ user: user.id }));

//     const alreadyExists = wishlist.items.some(
//       (item) =>
//         item.product.toString() === productId &&
//         item.variant?.toString() === variantId,
//     );

//     if (alreadyExists) {
//       wishlist.set(
//         "items",
//         wishlist.items.filter(
//           (item) =>
//             !(
//               item.product.toString() === productId &&
//               item.variant?.toString() === variantId
//             ),
//         ),
//       );

//       await wishlist.save();

//       return res.status(200).json({
//         success: true,
//         message: "Removed from wishlist",
//         wishlist,
//       });
//     }

//     wishlist.items.push({ product: productId, variant: variantId });

//     await wishlist.save();

//     return res.status(200).json({
//       success: true,
//       message: "Added to wishlist",
//       wishlist,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const createWishlist = async (req: Request, res: Response) => {
  try {
    const { productId, variantId } = req.params;
    const user = req.user as JwtUser;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist =
      (await wishlistModel.findOne({ user: user.id })) ||
      (await wishlistModel.create({ user: user.id, items: [] }));

    const alreadyExists = wishlist.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    );

    // REMOVE from wishlist
    if (alreadyExists) {
      wishlist.set(
        "items",
        wishlist.items.filter(
          (item) =>
            !(
              item.product.toString() === productId &&
              item.variant?.toString() === variantId
            ),
        ),
      );
    }
    // ADD to wishlist
    else {
      wishlist.items.push({
        product: productId,
        variant: variantId,
      });
    }

    //  save updated wishlist
    await wishlist.save();

    await wishlist.populate("items.product");

    return res.status(200).json({
      success: true,
      message: alreadyExists ? "Removed from wishlist" : "Added to wishlist",
      wishlist: wishlist.items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtUser;

    const wishItems = await wishlistModel
      .find({ user: user.id })
      .populate("items.product");

    return res.status(200).json({
      success: true,
      message: "fetched wishlist",
      wishlist: wishItems[0]?.items || [],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteWishlist = async (req: Request, res: Response) => {
  try {
    const { productId, variantId } = req.params;
    const user = req.user as JwtUser;

    const wishlist = await wishlistModel.findOneAndUpdate(
      { user: user.id },
      {
        $pull: {
          items: {
            product: productId,
            variant: variantId,
          },
        },
      },
      {
        new: true,
      },
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Removed from wishlist", wishlist });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

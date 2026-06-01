// export interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   parentCategory: string | null;
// }

export interface Category {
  _id: string;
  name: string;
  slug: string;
  subCategories?: Category[];
}

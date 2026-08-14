// export const ingredientBenefits = {
//   // Key is ingredient_id from your DB
//   2: {
//     title: "Lavender",
//     summary: "Lavender is known for its calming scent and gentle soothing properties.",
//     sections: [
//       { heading: "Why we use it", body: "Adds a relaxing fragrance to soaps..." },
//       { heading: "Common benefits", body: "Often used to promote relaxation..." },
//     ],
//   },
// };

// export function getIngredientPost(id) {
//   return ingredientBenefits[Number(id)] || null;
// }

//version where whatever after /blog/ becomes the value [slug]

export const ingredientPostSlugById = {
  1: "bees-wax",
  2: "lavender",
  3: "cocoa-butter",
  4: "rosehip-oil",
};

export function getIngredientSlug(id) {
  return ingredientPostSlugById?.[Number(id)] || null;
}
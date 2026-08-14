// data/ingredientPosts.js

export const ingredientPostsById = {
  1: {
    title: "Beeswax",
    heroImage: require("../assets/ingredients/beeswax.jpg"),
    summary: "Beeswax helps create a firmer bar and can add a soft, conditioned after-feel.",
    sections: [
      {
        heading: "Why we use it",
        body: "Beeswax adds structure and supports a longer-lasting bar, especially in humid environments."
      },
      {
        heading: "What it’s known for",
        body: "A protective, comforting feel and a slightly creamier wash experience (depending on recipe)."
      },
      {
        heading: "Notes",
        body: "Because it can thicken trace, work efficiently and keep temperatures consistent."
      }
    ]
  },

  2: {
    title: "Lavender Essential Oil",
    heroImage: require("../assets/ingredients/lavender.jpg"),
    summary: "Lavender is loved for its calming scent and gentle, spa-like wash experience.",
    sections: [
      { heading: "Why we use it", body: "Adds a relaxing fragrance and pairs well with many scent profiles." },
      { heading: "Common benefits", body: "Often associated with winding down and a clean, comforting aroma." },
      { heading: "Notes", body: "Essential oils can irritate some people. Patch testing is always wise." }
    ]
  },

  3: {
    title: "Cocoa Butter",
    heroImage: require("../assets/ingredients/cocoa butter.jpg"),
    summary: "Cocoa butter contributes richness and can help produce a firm, creamy-feeling bar.",
    sections: [
      { heading: "Why we use it", body: "Adds hardness and a more luxurious, creamy wash feel." },
      { heading: "Common benefits", body: "Often used in recipes designed for a gentler, more conditioning vibe." },
      { heading: "Notes", body: "Balance with bubbly oils to avoid a bar that feels too ‘waxy’ or low-lather." }
    ]
  },

  4: {
    title: "Rosehip Oil",
    heroImage: require("../assets/ingredients/rose hip oil.jpg"),
    summary: "Rosehip oil is often used for a ‘skin-loving’ story and a more premium ingredient profile.",
    sections: [
      { heading: "Why we use it", body: "Adds a ‘special ingredient’ feel and supports gentle formula branding." },
      { heading: "Common benefits", body: "Often associated with softness and a pampering skincare routine." },
      { heading: "Notes", body: "Use at appropriate percentages and store oils well to protect freshness." }
    ]
  }
};

export function getIngredientPostById(id) {
  return ingredientPostsById?.[Number(id)] || null;
}
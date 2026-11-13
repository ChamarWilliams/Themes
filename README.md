# Themes: Shopify Storefront Themes

![Shopify](https://img.shields.io/badge/Shopify-7AB55C?style=for-the-badge&logo=shopify&logoColor=white)
![Liquid](https://img.shields.io/badge/Liquid-0D1F2D?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Three Shopify Online Store 2.0 themes built from the same conversion-focused layout, each with its own visual direction.

---

## Architecture Overview

```text
        +-------------------------------------------+
        |  layout/theme.liquid                       |
        +---------------------+---------------------+
                              |
              +---------------+----------------+
              v                                v
   +--------------------+          +----------------------+
   |  templates/*.json  | -------> |  sections/*.liquid    |
   |  index, collection,|          |  header, hero, grid,  |
   |  product, pages    |          |  product, trust bar   |
   +--------------------+          +----------+-----------+
                                              |
                                              v
                                   +----------------------+
                                   |  snippets/, assets/   |
                                   |  price, product card, |
                                   |  CSS and JS           |
                                   +----------------------+
```

---

## Themes

| Theme | Direction |
| :--- | :--- |
| [`shop1-conversion-theme`](themes/shop1-conversion-theme) | Starter theme with a search-first header, compact browsing and a sticky buy box. Its research notes are in `RESEARCH.md` |
| [`shop1-white-commerce-theme`](themes/shop1-white-commerce-theme) | Crisp white marketplace look |
| [`shop1-cream-commerce-theme`](themes/shop1-cream-commerce-theme) | Warm cream curated-shopping look for the Trefelle storefront, with search, cookie banner, policy pages and a legal checklist |

---

## Design Basis

* **Search-first header** and compact category and product browsing.
* **Clear pricing** and a sticky product buy box.
* **Trust and review cues** near the purchase decision.
* **Mobile-first** product and collection pages.

The layouts follow common high-traffic ecommerce patterns without copying any brand identity. Brand name, announcement text and hero image are theme settings, so a store can change them without editing code.

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Templating** | Shopify Liquid, JSON templates | Sections and page templates |
| **Styling** | CSS | Per-theme visual design |
| **Behavior** | Vanilla JavaScript | Theme interactions |
| **Settings** | `config/settings_schema.json` | Merchant-editable options |

---

## Quickstart

1. Install the [Shopify CLI](https://shopify.dev/docs/api/shopify-cli).
2. Preview a theme against a development store:

   ```bash
   cd themes/shop1-cream-commerce-theme
   shopify theme dev --store your-store.myshopify.com
   ```

3. Or upload the theme folder, or its matching `.zip` in `themes/`, through the Shopify admin theme tools.

Review brand name, imagery, menus and policies before publishing a theme live. If you connect a theme through Shopify's GitHub integration, the theme must sit at the repository root so Shopify can find `layout/theme.liquid`.

---

## Project Structure

```text
themes/
  shop1-conversion-theme/      Theme source
  shop1-white-commerce-theme/  Theme source
  shop1-cream-commerce-theme/  Theme source, policies and legal checklist
  *.zip                        Prebuilt archives for manual upload
```

Each theme follows the standard layout: `layout/`, `templates/`, `sections/`, `snippets/`, `assets/` and `config/`.

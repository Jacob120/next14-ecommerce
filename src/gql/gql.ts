/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddProduct($cartId: ID!, $input: MutationCartAddItemInput!) {\n  cartAddItem(input: $input, id: $cartId) {\n    items {\n      quantity\n      product {\n        name\n        id\n        price\n      }\n    }\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate($cartId: ID!, $slug: MutationCartFindOrCreateInput!) {\n  cartFindOrCreate(input: $slug, id: $cartId) {\n    id\n    items {\n      product {\n        name\n      }\n      quantity\n    }\n  }\n}": types.CartCreateDocument,
    "query CartGetById($slug: ID!) {\n  cart(id: $slug) {\n    id\n    items {\n      quantity\n      product {\n        name\n        id\n        price\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "mutation CartRemoveProduct($cartId: ID!, $productId: ID!) {\n  cartRemoveItem(id: $cartId, productId: $productId) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n      }\n    }\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetProductQuantity($quantity: Int!, $productId: ID!, $cartId: ID!) {\n  cartChangeItemQuantity(id: $cartId, productId: $productId, quantity: $quantity) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n      }\n    }\n  }\n}": types.CartSetProductQuantityDocument,
    "query CategoriesGetList {\n  categories {\n    data {\n      id\n      name\n    }\n  }\n}": types.CategoriesGetListDocument,
    "query CategoryGetByName($slug: String!) {\n  category(slug: $slug) {\n    id\n    name\n    description\n  }\n}": types.CategoryGetByNameDocument,
    "query CollectionGetByName($slug: String!) {\n  collection(slug: $slug) {\n    id\n    name\n  }\n}": types.CollectionGetByNameDocument,
    "query CollectionsGetList($take: Int) {\n  collections(take: $take) {\n    data {\n      id\n      name\n    }\n  }\n}": types.CollectionsGetListDocument,
    "mutation ProductAddReview($productId: ID!, $author: String!, $description: String!, $email: String!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    productId: $productId\n    author: $author\n    description: $description\n    email: $email\n    rating: $rating\n    title: $title\n  ) {\n    id\n    items {\n      product {\n        id\n      }\n    }\n  }\n}": types.ProductAddReviewDocument,
    "fragment ProductListItemFragment on Product {\n  id\n  name\n  price\n  images {\n    url\n    alt\n  }\n  categories {\n    id\n    name\n  }\n  rating\n}": types.ProductListItemFragmentFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionId($collectionId: ID!) {\n  collection(id: $collectionId) {\n    products {\n      id\n      name\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}": types.ProductsGetByCollectionIdDocument,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    categories {\n      name\n      id\n    }\n    images {\n      url\n      alt\n    }\n    price\n    rating\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetBySearchInput($slug: String) {\n  products(search: $slug) {\n    data {\n      id\n      name\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}": types.ProductsGetBySearchInputDocument,
    "query ProductsGetList($take: Int, $skip: Int) {\n  products(take: $take, skip: $skip) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($cartId: ID!, $input: MutationCartAddItemInput!) {\n  cartAddItem(input: $input, id: $cartId) {\n    items {\n      quantity\n      product {\n        name\n        id\n        price\n      }\n    }\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($cartId: ID!, $slug: MutationCartFindOrCreateInput!) {\n  cartFindOrCreate(input: $slug, id: $cartId) {\n    id\n    items {\n      product {\n        name\n      }\n      quantity\n    }\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($slug: ID!) {\n  cart(id: $slug) {\n    id\n    items {\n      quantity\n      product {\n        name\n        id\n        price\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($cartId: ID!, $productId: ID!) {\n  cartRemoveItem(id: $cartId, productId: $productId) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($quantity: Int!, $productId: ID!, $cartId: ID!) {\n  cartChangeItemQuantity(id: $cartId, productId: $productId, quantity: $quantity) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    data {\n      id\n      name\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetByName($slug: String!) {\n  category(slug: $slug) {\n    id\n    name\n    description\n  }\n}"): typeof import('./graphql').CategoryGetByNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetByName($slug: String!) {\n  collection(slug: $slug) {\n    id\n    name\n  }\n}"): typeof import('./graphql').CollectionGetByNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList($take: Int) {\n  collections(take: $take) {\n    data {\n      id\n      name\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProductAddReview($productId: ID!, $author: String!, $description: String!, $email: String!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    productId: $productId\n    author: $author\n    description: $description\n    email: $email\n    rating: $rating\n    title: $title\n  ) {\n    id\n    items {\n      product {\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductAddReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItemFragment on Product {\n  id\n  name\n  price\n  images {\n    url\n    alt\n  }\n  categories {\n    id\n    name\n  }\n  rating\n}"): typeof import('./graphql').ProductListItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionId($collectionId: ID!) {\n  collection(id: $collectionId) {\n    products {\n      id\n      name\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    categories {\n      name\n      id\n    }\n    images {\n      url\n      alt\n    }\n    price\n    rating\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetBySearchInput($slug: String) {\n  products(search: $slug) {\n    data {\n      id\n      name\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}"): typeof import('./graphql').ProductsGetBySearchInputDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($take: Int, $skip: Int) {\n  products(take: $take, skip: $skip) {\n    data {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

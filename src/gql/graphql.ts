/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
};

export type Cart = {
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: ListMeta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: ListMeta;
};

export type ListMeta = {
  /** The total number of items matching the query */
  count: Scalars['Int']['output'];
  /** The total number of items in the database */
  total: Scalars['Int']['output'];
};

export type Mutation = {
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartComplete: Order;
  cartFindOrCreate: Cart;
  cartRemoveItem: Cart;
  reviewCreate: Cart;
};


export type MutationCartAddItemArgs = {
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
};


export type MutationCartChangeItemQuantityArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCompleteArgs = {
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCartFindOrCreateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MutationCartFindOrCreateInput;
};


export type MutationCartRemoveItemArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationReviewCreateArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCartAddItemInput = {
  item: CartItemInput;
};

export type MutationCartFindOrCreateInput = {
  items?: InputMaybe<Array<CartItemInput>>;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines: Scalars['JSON']['output'];
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = {
  data: Array<Order>;
  meta: ListMeta;
};

export type OrderSortBy =
  | 'DEFAULT'
  | 'STATUS'
  | 'TOTAL';

export type OrderStatus =
  | 'CANCELLED'
  | 'CREATED'
  | 'FULFILLED'
  | 'PAID';

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductImage = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: ListMeta;
};

export type ProductSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE'
  | 'RATING';

export type Query = {
  cart?: Maybe<Cart>;
  categories: CategoryList;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  orders: OrderList;
  product?: Maybe<Product>;
  products: ProductList;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type Review = {
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewList = {
  data: Array<Review>;
  meta: ListMeta;
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type CartAddProductMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
}>;


export type CartAddProductMutation = { cartAddItem: { items: Array<{ product: { name: string, id: string, price: number } }> } };

export type CartCreateMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  slug: MutationCartFindOrCreateInput;
}>;


export type CartCreateMutation = { cartFindOrCreate: { id: string, items: Array<{ quantity: number, product: { name: string, id: string } }> } };

export type CartGetByIdQueryVariables = Exact<{
  slug: Scalars['ID']['input'];
}>;


export type CartGetByIdQuery = { cart?: { id: string, items: Array<{ quantity: number, product: { name: string, id: string, price: number, categories: Array<{ name: string }>, images: Array<{ url: string, alt: string }> } }> } | null };

export type CartRemoveProductMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type CartRemoveProductMutation = { cartRemoveItem: { id: string, items: Array<{ quantity: number, product: { id: string, name: string } }> } };

export type CartSetProductQuantityMutationVariables = Exact<{
  quantity: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
  cartId: Scalars['ID']['input'];
}>;


export type CartSetProductQuantityMutation = { cartChangeItemQuantity: { id: string, items: Array<{ quantity: number, product: { id: string, name: string } }> } };

export type CategoriesGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesGetListQuery = { categories: { data: Array<{ id: string, name: string }> } };

export type CategoryGetByNameQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CategoryGetByNameQuery = { category?: { id: string, name: string, description: string } | null };

export type CollectionGetByNameQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CollectionGetByNameQuery = { collection?: { id: string, name: string } | null };

export type CollectionsGetListQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionsGetListQuery = { collections: { data: Array<{ id: string, name: string }> } };

export type OrdersGetByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type OrdersGetByEmailQuery = { orders: { data: Array<{ id: string, lines: unknown, status: OrderStatus, totalAmount: number }>, meta: { count: number, total: number } } };

export type ProductAddReviewMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type ProductAddReviewMutation = { reviewCreate: { id: string, items: Array<{ product: { id: string } }> } };

export type ProductListItemFragmentFragment = { id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ id: string, name: string }> };

export type ProductsGetByCategorySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductsGetByCategorySlugQuery = { category?: { products: Array<{ id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ id: string, name: string }> }> } | null };

export type ProductsGetByCollectionIdQueryVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type ProductsGetByCollectionIdQuery = { collection?: { products: Array<{ id: string, name: string, price: number, categories: Array<{ name: string, id: string }>, images: Array<{ url: string, alt: string }> }> } | null };

export type ProductGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductGetByIdQuery = { product?: { id: string, name: string, description: string, price: number, rating?: number | null, categories: Array<{ name: string, id: string }>, images: Array<{ url: string, alt: string }>, reviews: Array<{ author: string, description: string, email: string, id: string, rating: number, createdAt: unknown, updatedAt: unknown }> } | null };

export type ProductsGetBySearchInputQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsGetBySearchInputQuery = { products: { data: Array<{ id: string, name: string, price: number, categories: Array<{ name: string, id: string }>, images: Array<{ url: string, alt: string }> }> } };

export type ProductsGetListQueryVariables = Exact<{
  orderBy?: InputMaybe<ProductSortBy>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortDirection>;
}>;


export type ProductsGetListQuery = { products: { data: Array<{ id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ id: string, name: string }> }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ProductListItemFragmentFragmentDoc = new TypedDocumentString(`
    fragment ProductListItemFragment on Product {
  id
  name
  price
  images {
    url
    alt
  }
  categories {
    id
    name
  }
  rating
}
    `, {"fragmentName":"ProductListItemFragment"}) as unknown as TypedDocumentString<ProductListItemFragmentFragment, unknown>;
export const CartAddProductDocument = new TypedDocumentString(`
    mutation CartAddProduct($cartId: ID!, $input: MutationCartAddItemInput!) {
  cartAddItem(input: $input, id: $cartId) {
    items {
      product {
        name
        id
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartAddProductMutation, CartAddProductMutationVariables>;
export const CartCreateDocument = new TypedDocumentString(`
    mutation CartCreate($cartId: ID!, $slug: MutationCartFindOrCreateInput!) {
  cartFindOrCreate(input: $slug, id: $cartId) {
    id
    items {
      product {
        name
        id
      }
      quantity
    }
  }
}
    `) as unknown as TypedDocumentString<CartCreateMutation, CartCreateMutationVariables>;
export const CartGetByIdDocument = new TypedDocumentString(`
    query CartGetById($slug: ID!) {
  cart(id: $slug) {
    id
    items {
      quantity
      product {
        name
        id
        price
        categories {
          name
        }
        images {
          url
          alt
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartGetByIdQuery, CartGetByIdQueryVariables>;
export const CartRemoveProductDocument = new TypedDocumentString(`
    mutation CartRemoveProduct($cartId: ID!, $productId: ID!) {
  cartRemoveItem(id: $cartId, productId: $productId) {
    id
    items {
      quantity
      product {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartRemoveProductMutation, CartRemoveProductMutationVariables>;
export const CartSetProductQuantityDocument = new TypedDocumentString(`
    mutation CartSetProductQuantity($quantity: Int!, $productId: ID!, $cartId: ID!) {
  cartChangeItemQuantity(id: $cartId, productId: $productId, quantity: $quantity) {
    id
    items {
      quantity
      product {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartSetProductQuantityMutation, CartSetProductQuantityMutationVariables>;
export const CategoriesGetListDocument = new TypedDocumentString(`
    query CategoriesGetList {
  categories {
    data {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<CategoriesGetListQuery, CategoriesGetListQueryVariables>;
export const CategoryGetByNameDocument = new TypedDocumentString(`
    query CategoryGetByName($slug: String!) {
  category(slug: $slug) {
    id
    name
    description
  }
}
    `) as unknown as TypedDocumentString<CategoryGetByNameQuery, CategoryGetByNameQueryVariables>;
export const CollectionGetByNameDocument = new TypedDocumentString(`
    query CollectionGetByName($slug: String!) {
  collection(slug: $slug) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<CollectionGetByNameQuery, CollectionGetByNameQueryVariables>;
export const CollectionsGetListDocument = new TypedDocumentString(`
    query CollectionsGetList($take: Int) {
  collections(take: $take) {
    data {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionsGetListQuery, CollectionsGetListQueryVariables>;
export const OrdersGetByEmailDocument = new TypedDocumentString(`
    query OrdersGetByEmail($email: String!) {
  orders(email: $email) {
    data {
      id
      lines
      status
      totalAmount
    }
    meta {
      count
      total
    }
  }
}
    `) as unknown as TypedDocumentString<OrdersGetByEmailQuery, OrdersGetByEmailQueryVariables>;
export const ProductAddReviewDocument = new TypedDocumentString(`
    mutation ProductAddReview($productId: ID!, $author: String!, $description: String!, $email: String!, $rating: Int!, $title: String!) {
  reviewCreate(
    productId: $productId
    author: $author
    description: $description
    email: $email
    rating: $rating
    title: $title
  ) {
    id
    items {
      product {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductAddReviewMutation, ProductAddReviewMutationVariables>;
export const ProductsGetByCategorySlugDocument = new TypedDocumentString(`
    query ProductsGetByCategorySlug($slug: String!) {
  category(slug: $slug) {
    products {
      ...ProductListItemFragment
    }
  }
}
    fragment ProductListItemFragment on Product {
  id
  name
  price
  images {
    url
    alt
  }
  categories {
    id
    name
  }
  rating
}`) as unknown as TypedDocumentString<ProductsGetByCategorySlugQuery, ProductsGetByCategorySlugQueryVariables>;
export const ProductsGetByCollectionIdDocument = new TypedDocumentString(`
    query ProductsGetByCollectionId($collectionId: ID!) {
  collection(id: $collectionId) {
    products {
      id
      name
      categories {
        name
        id
      }
      images {
        url
        alt
      }
      price
    }
  }
}
    `) as unknown as TypedDocumentString<ProductsGetByCollectionIdQuery, ProductsGetByCollectionIdQueryVariables>;
export const ProductGetByIdDocument = new TypedDocumentString(`
    query ProductGetById($id: ID!) {
  product(id: $id) {
    id
    name
    description
    categories {
      name
      id
    }
    images {
      url
      alt
    }
    price
    rating
    reviews {
      author
      description
      email
      id
      rating
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<ProductGetByIdQuery, ProductGetByIdQueryVariables>;
export const ProductsGetBySearchInputDocument = new TypedDocumentString(`
    query ProductsGetBySearchInput($slug: String) {
  products(search: $slug) {
    data {
      id
      name
      categories {
        name
        id
      }
      images {
        url
        alt
      }
      price
    }
  }
}
    `) as unknown as TypedDocumentString<ProductsGetBySearchInputQuery, ProductsGetBySearchInputQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList($orderBy: ProductSortBy, $take: Int, $skip: Int, $order: SortDirection) {
  products(orderBy: $orderBy, order: $order, take: $take, skip: $skip) {
    data {
      ...ProductListItemFragment
    }
  }
}
    fragment ProductListItemFragment on Product {
  id
  name
  price
  images {
    url
    alt
  }
  categories {
    id
    name
  }
  rating
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;
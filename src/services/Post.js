// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const PostApi = createApi({
  reducerPath: "PostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/",
    headers: {
      "x-auth-token-user": localStorage.getItem("token"),
    },
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body) => {
        console.log("update login data", body);
        return {
          url: `/admin/user/login`,
          method: "post",
          body,
        };
      },
    }),
    createOffer: builder.mutation({
      query: (body) => ({
        url: `admin/offer/add-offer`,
        method: "POST",
        body,
      }),
    }),
    getOfferList: builder.query({
      query: (name) => ({
        url: `admin/offer/offer-list`,
        method: "post",
      }),
    }),
    getStaffList: builder.query({
      query: (name) => ({
        url: `admin/staff/staff/list`,
        method: "post",
      }),
    }),
    getTransactionList: builder.query({
      query: (name) => ({
        url: `admin/transacation/list`,
        method: "post",
      }),
    }),
    getReportList: builder.query({
      query: (name) => ({
        url: `admin/reporter/reporter/list`,
        method: "post",
      }),
    }),
    getContentList: builder.query({
      query: (name) => ({
        url: `admin/content/content/list`,
        method: "post",
      }),
    }),
    getFile: builder.query({
      query: (name) => ({
        url: `admin/user/download`,
        method: "post",
      }),
    }),
    searchOffer: builder.mutation({
      query: (body) => ({
        url: `admin/offer/search-offer`,
        method: "post",
        body,
      }),
    }),
    getTransactionListDetails: builder.mutation({
      query: (id) => ({
        url: `admin/transacation/details/${id}`,
        method: "post",
      }),
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `user/order/order/create-order`,
        method: "post",
        body,
      }),
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: `user/carts/carts/add-cart`,
        method: "post",
        body,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `user/address/address/delete-address/${id}`,
        method: "DELETE",
      }),
    }),
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `user/carts/carts/saveCarts-delete/${id}`,
        method: "DELETE",
      }),
    }),
    deleteCompare: builder.mutation({
      query: (id) => ({
        url: `user/compare/compare/compare-delete/${id}`,
        method: "post",
      }),
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `admin/offer/delete-offer/${id}`,
        method: "DELETE",
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `admin/contact/contact/contactDelete/${id}`,
        method: "DELETE",
      }),
    }),
    updateAddress: builder.mutation({
      query: (body) => {
        console.log("update address", body);
        const { id, ...data } = body;
        console.log("update address body data", data);
        return {
          url: `user/address/address/update-address/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
    updateCard: builder.mutation({
      query: (body) => {
        console.log("update address", body);
        const { id, ...data } = body;
        console.log("update address body data", data);
        return {
          url: `user/carts/carts/saveCarts-update/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
    updateOffer: builder.mutation({
      query: (body) => {
        console.log("update offer", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `admin/offer/offer-update/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateCategory: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `admin/category/category/update/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateSubCategory: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update Sub category body data", data);
        console.log("update Sub category body id", id);
        return {
          url: `admin/category/subCategory/subCategoryUpdate/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateValue: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update Sub category body data", data);
        console.log("update Sub category body id", id);
        return {
          url: `admin/category/values/valuesUpdate/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateStaff: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update Sub category body data", data);
        console.log("update Sub category body id", id);
        return {
          url: `admin/staff/staff/updateStaff/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateContent: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update Sub category body data", data);
        console.log("update Sub category body id", id);
        return {
          url: `admin/content/content/updateContent/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateCoupan: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update Sub category body data", data);
        console.log("update Sub category body id", id);
        return {
          url: `admin/coupan/coupan/updateCoupan/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
    editProductList: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/product/updateProduct/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    editOrderList: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/order/order/order-update/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
    deleteProductList: builder.mutation({
      query: (id) => ({
        url: `/admin/product/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useCreateOrderMutation,
  useDeleteCompareMutation,
  useAddToCartMutation,
  useCreateOfferMutation,
  useGetOfferListQuery,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
  useGetTransactionListQuery,
  useGetTransactionListDetailsMutation,
  useSearchOfferMutation,
  useUpdateCategoryMutation,
  useUpdateSubCategoryMutation,
  useUpdateValueMutation,
  useUpdateStaffMutation,
  useGetStaffListQuery,
  useGetReportListQuery,
  useGetContentListQuery,
  useUpdateContentMutation,
  useUpdateCoupanMutation,
  useDeleteContactMutation,
  useGetFileQuery,
  useUserLoginMutation,
  useEditProductListMutation,
  useDeleteProductListMutation,
  useEditOrderListMutation,
  // useSearchOfferQuery,
} = PostApi;

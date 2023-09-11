// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const brandId = localStorage?.getItem("brandId");

export const PostApi = createApi({
  reducerPath: "PostApi",
  // headers: {
  //   "x-auth-token-user": getAuthToken(),
  // },
  // prepareHeaders: (headers) => {
  //   headers.set("Authorization", `Bearer ${getAuthToken()}`);
  //   return headers;
  // },
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
          url: "/admin/user/login",
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
    createContact: builder.mutation({
      query: (body) => ({
        url: `/admin/contact/contact/createContact`,
        method: "POST",
        body,
      }),
    }),
    createInformation: builder.mutation({
      query: (body) => ({
        url: `/admin/information/info/create`,
        method: "POST",
        body,
      }),
    }),
    createContent: builder.mutation({
      query: (body) => ({
        url: `/admin/content/content/createContent`,
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
    getDashboardCount: builder.query({
      query: (name) => ({
        url: "/admin/dashboards/count/order-dashboards",
        method: "post",
      }),
    }),
    getLatLongitude: builder.query({
      query: (name) => ({
        url: "/admin/user/location",
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
    createMap: builder.mutation({
      query: (body) => ({
        url: "/admin/user/create-map",
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
    updateBrand: builder.mutation({
      query: ({id1, formData}) => {
        return {
          url: `/admin/product/edit-brand/${id1}`,
          method: "post",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token-user": localStorage.getItem("token"),
          },
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
    updateHomeScreenBanner: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/home/homeScreen/update-status/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
    orderAssign: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/agent/agent/order-assign/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
    catogaryStatus: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/category/category/checkstatus/${id}`,
          method: "post",
          body: data,
        };
      },
    }),
    subCatogaryStatus: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/category/subCategory/checkstatus/${id}`,
          method: "patch",
          body: data,
        };
      },
    }),
    subSubCatogaryStatus: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/category/subSubCategory/checkstatus/${id}`,
          method: "patch",
          body: data,
        };
      },
    }),
    attributesStatus: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/category/attribute/checkStatus/${id}`,
          method: "patch",
          body: data,
        };
      },
    }),
    valueStatus: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `/admin/category/values/checkStatus/${id}`,
          method: "patch",
          body: data,
        };
      },
    }),
    blockUser: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id, ...data } = body;
        console.log("update offer body data", data);
        const dataValue = data ? "false" : "true";
        return {
          url: `/admin/user/block-user/${id}/${dataValue}`,
          method: "post",
          // body: data,
        };
      },
    }),
    deleteProductList: builder.mutation({
      query: (id) => ({
        url: `/admin/product/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
    deleteCoupanList: builder.mutation({
      query: (id) => ({
        url: `/admin/coupan/coupan/delete/${id}`,
        method: "DELETE",
      }),
    }),
    deleteHelpList: builder.mutation({
      query: (id) => ({
        url: `/admin/contact/contact/contactDelete/${id}`,
        method: "DELETE",
      }),
    }),
    deleteBrabdList: builder.mutation({
      query: (id) => ({
        url: `/admin/product/delete-brand/${id}`,
        method: "post",
      }),
    }),
    deleteAgentList: builder.mutation({
      query: (id) => ({
        url: `/admin/agent/agent/delete-user/${id}`,
        method: "DELETE",
      }),
    }),
    deleteHelpManagementList: builder.mutation({
      query: (id) => ({
        url: `/admin/help/help/delete-help/${id}`,
        method: "post",
      }),
    }),
    deleteHelpThoughtList: builder.mutation({
      query: (id) => ({
        url: `/admin/thougth/thougth/delete-thougth/${id}`,
        method: "post",
      }),
    }),
    deleteOrderList: builder.mutation({
      query: (id) => ({
        url: `/admin/order/order/delete-order/${id}`,
        method: "DELETE",
      }),
    }),
    deleteCategoryList: builder.mutation({
      query: (id) => ({
        url: `/admin/category/category/delete-category/${id}`,
        method: "post",
      }),
    }),
    deleteSubCategoryList: builder.mutation({
      query: (id) => ({
        url: `/admin/category/Subcategory/delete-SubCategory/${id}`,
        method: "post",
      }),
    }),
    deleteSubSubCategoryList: builder.mutation({
      query: (id) => ({
        url: `/admin/category/subSubcategory/delete-subSubCategory/${id}`,
        method: "post",
      }),
    }),
    deleteAttributeList: builder.mutation({
      query: (id) => ({
        url: `/admin/category/attribute/delete-attribute/${id}`,
        method: "post",
      }),
    }),
    deleteValueList: builder.mutation({
      query: (id) => ({
        url: `/admin/category/values/delete-values/${id}`,
        method: "post",
      }),
    }),
    deleteNotificationList: builder.mutation({
      query: (id) => ({
        url: `/admin/notification/notification/delete-notification/${id}`,
        method: "post",
      }),
    }),
    deleteAnnouncementList: builder.mutation({
      query: (id) => ({
        url: `/admin/announcement/announcement/delete-announcement/${id}`,
        method: "post",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/order/delete-order/${id}`,
        method: "DELETE",
      }),
    }),
    userDetailsAll: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id } = body;
        console.log("user details body data", id);
        return {
          url: `/admin/user/details/${id}`,
          method: "post",
        };
      },
    }),
    agentDetailsAll: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id } = body;
        console.log("user details body data", id);
        return {
          url: `/admin/agent/agent/user-details/${id}`,
          method: "post",
        };
      },
    }),
    orderDetailsAll: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { id } = body;
        console.log("user details body data", id);
        return {
          url: `/admin/order/order/order-Details/${id}`,
          method: "post",
        };
      },
    }),
  }),
});

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
  useDeleteCoupanListMutation,
  useDeleteHelpListMutation,
  useDeleteAgentListMutation,
  useCreateContactMutation,
  useDeleteHelpManagementListMutation,
  useDeleteHelpThoughtListMutation,
  useCreateInformationMutation,
  useCreateContentMutation,
  useCatogaryStatusMutation,
  useSubCatogaryStatusMutation,
  useSubSubCatogaryStatusMutation,
  useAttributesStatusMutation,
  useValueStatusMutation,
  useDeleteOrderListMutation,
  useDeleteCategoryListMutation,
  useDeleteSubCategoryListMutation,
  useDeleteSubSubCategoryListMutation,
  useDeleteAttributeListMutation,
  useDeleteValueListMutation,
  useDeleteNotificationListMutation,
  useDeleteAnnouncementListMutation,
  useCreateMapMutation,
  useGetLatLongitudeQuery,
  useBlockUserMutation,
  useDeleteBrabdListMutation,
  useUserDetailsAllMutation,
  useDeleteOrderMutation,
  useUpdateBrandMutation,
  useOrderDetailsAllMutation,
  useOrderAssignMutation,
  useAgentDetailsAllMutation,
  useUpdateHomeScreenBannerMutation,
  useGetDashboardCountQuery,
} = PostApi;

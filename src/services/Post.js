import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../app/localSlice";
const brandId = localStorage?.getItem("brandId");

export const PostApi = createApi({
  reducerPath: "PostApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://euser.techgropsedev.com:2087/",
    // headers: {
    //   "x-auth-token-admin": localStorage.getItem("token"),
    // },
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body) => {
        return {
          url: "api/admin/login",
          method: "PATCH",
          body,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (body) => {
        return {
          url: "api/admin/forgetPassword",
          method: "PATCH",
          body,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (body) => {
        return {
          url: "api/admin/verifyOtp",
          method: "PATCH",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: "api/admin/updatePassword",
          method: "PATCH",
          body,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;
        return {
          url: "api/admin/changePassword",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
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
    // createCoupan: builder.mutation({
    //   query: (body) => ({
    //     url: `admin/coupan/coupan/create`,
    //     method: "POST",
    //     body,
    //   }),
    // }),
    createCoupan: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/coupan/coupan/create",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    createNotification: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/notification/notification/createNotification",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    createInformation: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/information/info/create",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    // createInformation: builder.mutation({
    //   query: (body) => ({
    //     url: `admin/information/info/create`,
    //     method: "POST",
    //     body,
    //   }),
    // }),
    // createContent: builder.mutation({
    //   query: (body) => ({
    //     url: `admin/content/content/createContent`,
    //     method: "POST",
    //     body,
    //   }),
    // }),
    createContent: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/content/content/createContent",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getOfferList: builder.query({
      query: (name) => ({
        url: `admin/offer/offer-list`,
        method: "post",
      }),
    }),
    getAdminData: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "api/admin/getAdminData",
        method: "get",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getBannerList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/home/homeScreen/category-banner-list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getDashboardCount: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/dashboards/count/order-dashboards",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getOrderList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/order/order/list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getOrderListAll: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/order/order/list",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getUserList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/agent/agent/user-List",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getAgentList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/agent/agent/user-List",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getUserListAll: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/user/userList",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getUserListAllSearch: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/user/userList",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getProductList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/product/productList",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getBannerListAll: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/home/homeScreen/getBanners",
        method: "get",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getProductListSearch: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/product/productList",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getLatLongitude: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/user/location",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    // getLatLongitude: builder.query({
    //   query: (name) => ({
    //     url: "/admin/user/location",
    //     method: "post",
    //   }),
    // }),
    getStaffList: builder.query({
      query: (name) => ({
        url: `admin/staff/staff/list`,
        method: "post",
      }),
    }),
    getTransactionList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: `admin/transacation/list`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getReportList: builder.query({
      query: (name) => ({
        url: `admin/reporter/reporter/list`,
        method: "post",
      }),
    }),
    getContentList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: `admin/content/content/list`,
        method: "get",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getCatogarySideBannerList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/home/homeScreen/side-banner-list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getCatogaryBottomBannerList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/home/homeScreen/bottom-banner-list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getCatogaryMiddleBannerList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/home/homeScreen/middle-banner-list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getCatogaryScrollBannerList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/home/homeScreen/scroll-banner-list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),

    getBrandList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/product/brand-list",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    // getBrandList: builder.query({
    //   query: ({ ecomAdmintoken }) => ({
    //     url: "admin/product/brand-list",
    //     method: "post",
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),
    // getCoupanList: builder.query({
    //   query: ({ ecomAdmintoken }) => ({
    //     url: "admin/coupan/coupan/list",
    //     method: "post",
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),
    getCoupanListAll: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/coupan/coupan/list",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getInfoList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/information/info/list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getContactList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/contact/contact/contactList",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getHelpList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/help/help/list",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getProductTopBannerList: builder.query({
      query: (name) => ({
        url: "admin/home/homeScreen/product-banner-list",
        method: "post",
      }),
    }),
    getProductBottomBannerList: builder.query({
      query: (name) => ({
        url: "admin/home/homeScreen/product-bottom-list",
        method: "post",
      }),
    }),
    getProductSideBannerList: builder.query({
      query: (name) => ({
        url: "admin/home/homeScreen/product-side-list",
        method: "post",
      }),
    }),
    getProductMiddleBannerList: builder.query({
      query: (name) => ({
        url: "admin/home/homeScreen/product-midlle-list",
        method: "post",
      }),
    }),
    getProductScrollBannerList: builder.query({
      query: (name) => ({
        url: "admin/home/homeScreen/product-scroll-list",
        method: "post",
      }),
    }),

    getFile: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/user/download",
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    getFileUser: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/user/download",
          method: "post",
          // body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getSelectCategoryList: builder.query({
      query: ({ ecomAdmintoken }) => ({
        url: "admin/category/listing/selectCategory",
        method: "get",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),

    getCategoryList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/category/category/list",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getQuestionList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/help/help/questionList",
          method: "post",
          // body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),

    getSubCategoryList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/category/subCategory/SubCategoryList",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    // getSubCategoryList: builder.query({
    //   query: ({ ecomAdmintoken }) => ({
    //     url: "admin/category/subCategory/SubCategoryList",
    //     method: "post",
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),
    // getSubSubCategoryList: builder.query({
    //   query: ({ ecomAdmintoken }) => ({
    //     url: "admin/category/subSubCategory/subSubCategoryList",
    //     method: "post",
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),
    getSubSubCategoryList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/category/subSubCategory/subSubCategoryList",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getAttibutesList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/category/attribute/attributeList",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    // getAttibutesList: builder.query({
    //   query: ({ ecomAdmintoken }) => ({
    //     url: "admin/category/attribute/attributeList",
    //     method: "post",
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),
    getValueList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/category/values/valuesList",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    // getValueList: builder.query({
    //   query: ({ ecomAdmintoken }) => ({
    //     url: "admin/category/values/valuesList",
    //     method: "post",
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),
    // getAnnounceList: builder.query({
    //   query: ({ ecomAdmintoken, search }) => ({
    //     url: "api/admin/announcementLists",
    //     method: "PATCH",
    //     body: search,
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),

    getAnnounceList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "api/admin/announcementLists",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getNotificationList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/notification/notification/list",
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    // getNotificationList: builder.query({
    //   query: ({ ecomAdmintoken }) => ({
    //     url: "admin/notification/notification/list",
    //     method: "PATCH",
    //     headers: {
    //       "x-auth-token-admin": ecomAdmintoken,
    //     },
    //   }),
    // }),
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

    createStaff: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/staff/staff/createStaff",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    getAllStaff: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/staff/staff/list",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
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
    deleteCategoryTopBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/top-banner-delete/${id}`,
        method: "post",
      }),
    }),
    deleteCategoryMiddleBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/middle-banner-delete/${id}`,
        method: "post",
      }),
    }),
    deleteCategorySideBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/side-banner-delete/${id}`,
        method: "post",
      }),
    }),
    deleteCategoryBottomBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/bottom-banner-delete/${id}`,
        method: "post",
      }),
    }),
    deleteCategoryScrollBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/scroll-banner-delete/${id}`,
        method: "post",
      }),
    }),
    deleteProductTopBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/product-top-delete/${id}`,
        method: "post",
      }),
    }),
    deleteProductMiddleBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/product-middle-delete/${id}`,
        method: "post",
      }),
    }),
    deleteProductSideBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/product-side-delete/${id}`,
        method: "post",
      }),
    }),
    deleteProductBottomBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/product-bottom-delete/${id}`,
        method: "post",
      }),
    }),
    deleteProductScrollBanner: builder.mutation({
      query: (id) => ({
        url: `admin/home/homeScreen/product-scroll-delete/${id}`,
        method: "post",
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
      query: ({ alldata, itemId, ecomAdmintoken }) => ({
        url: `admin/category/category/update/${itemId}`,
        method: "PATCH",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: "api/admin/editProfile",
        method: "PUT",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    updateSubCategory: builder.mutation({
      query: ({ alldata, itemId, ecomAdmintoken }) => ({
        url: `admin/category/subCategory/subCategoryUpdate/${itemId}`,
        method: "PATCH",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),

    updateBrand: builder.mutation({
      query: ({ id1, formData, ecomAdmintoken }) => {
        return {
          url: `admin/product/edit-brand/${id1}`,
          method: "post",
          body: formData,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    createAnnouncement: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => {
        return {
          url: "api/admin/createAnnouncement",
          method: "post",
          body: alldata,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),

    updateValue: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id, ...data } = body;

        return {
          url: `admin/category/values/valuesUpdate/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),

    updateStaff: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ids, ...data } = body;

        return {
          url: `admin/staff/staff/updateStaff/${ids}`,
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    staffStatus: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ids, ...data } = body;

        return {
          url: `admin/staff/staff/stafstatus/${ids}`,
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    updateContent: builder.mutation({
      query: (body) => {
        const { id, ecomAdmintoken, ...data } = body;

        return {
          url: `admin/content/content/updateContent/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    updateSubSubCategory: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id, ...data } = body;

        return {
          url: `admin/category/subSubCategory/subSubCategoryUpdate/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    updateAttribute: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id, ...data } = body;

        return {
          url: `admin/category/attribute/attributeUpdate/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    createHelp: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/help/help/createHelp",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    createQuestion: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, ...data } = body;

        return {
          url: "admin/help/help/createQuestion",
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),

    updateCoupan: builder.mutation({
      query: (body) => {
        const { id, ecomAdmintoken, ...data } = body;

        return {
          url: `admin/coupan/coupan/updateCoupan/${id}`,
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    editProductList: builder.mutation({
      query: ({ id, alldata, ecomAdmintoken }) => ({
        url: `admin/product/updateProduct/${id}`,
        method: "PATCH",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    // editProductList: builder.mutation({
    //   query: (body) => {
    //     console.log("update product", body);
    //     const { id, ...data } = body;
    //     console.log("update offer body data", data);
    //     return {
    //       url: `admin/product/updateProduct/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    // }),
    editOrderList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id, ...data } = body;
        return {
          url: `admin/order/order/order-update/${id}`,
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
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
        const { ecomAdmintoken, id, ...data } = body;
        return {
          url: `admin/agent/agent/order-assign/${id}`,
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    addAgents: builder.mutation({
      query: ({ formData, ecoAdminToken }) => ({
        url: `admin/agent/agent/addUser`,
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token-admin": ecoAdminToken,
        },
      }),
    }),
    catogaryStatus: builder.mutation({
      query: (body) => {
        console.log("update category", body);
        const { ecomAdmintoken, id, ...data } = body;
        console.log("update offer body data", data);
        return {
          url: `admin/category/category/checkstatus/${id}`,
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    updateQuestion: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, selectedQuestionId, ...data } = body;

        return {
          url: `admin/help/help/updateQuestion/${selectedQuestionId}`,
          method: "post",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    updateInfo: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, itemId, ...data } = body;

        return {
          url: `admin/information/info/update/${itemId}`,
          method: "PATCH",
          body: data,
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
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
    addReccomded: builder.mutation({
      query: ({ productId, ecoAdminToken }) => ({
        url: `admin/product/addRecommendedProduct/${productId}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecoAdminToken,
        },
      }),
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
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/product/delete-product/${id}`,
        method: "DELETE",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteCoupanList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/coupan/coupan/delete/${id}`,
        method: "DELETE",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteHelpList: builder.mutation({
      query: (id) => ({
        url: `/admin/contact/contact/contactDelete/${id}`,
        method: "DELETE",
      }),
    }),
    deleteBrabdList: builder.mutation({
      query: ({ categoryId, ecomAdmintoken }) => ({
        url: `admin/product/delete-brand/${categoryId}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    // deleteAgentList: builder.mutation({
    //   query: (id) => ({
    //     url: `/admin/agent/agent/delete-user/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
    deleteAgentList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/agent/agent/delete-user/${id}`,
        method: "DELETE",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteHelpManagementList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/help/help/delete-help/${id}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteHelpThoughtList: builder.mutation({
      query: (id) => ({
        url: `/admin/thougth/thougth/delete-thougth/${id}`,
        method: "post",
      }),
    }),
    deleteOrderList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/order/order/delete-order/${id}`,
        method: "DELETE",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteCategoryList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/category/category/delete-category/${id}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteSubCategoryList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/category/Subcategory/delete-SubCategory/${id}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteSubSubCategoryList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/category/subSubcategory/delete-subSubCategory/${id}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteAttributeList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/category/attribute/delete-attribute/${id}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteValueList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/category/values/delete-values/${id}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteBannerAllList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/home/homeScreen/deleteBanner/${id}`,
        method: "DELETE",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteContent: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/content/content/delete/${id}`,
        method: "DELETE",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteNotificationList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `admin/notification/notification/delete-notification/${id}`,
        method: "post",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    // deleteNotificationList: builder.mutation({
    //   query: (id) => ({
    //     url: `/admin/notification/notification/delete-notification/${id}`,
    //     method: "post",
    //   }),
    // }),
    // deleteAnnouncementList: builder.mutation({
    //   query: (id) => ({
    //     url: `/admin/announcement/announcement/delete-announcement/${id}`,
    //     method: "post",
    //   }),
    // }),
    deleteAnnouncementList: builder.mutation({
      query: ({ id, ecomAdmintoken }) => ({
        url: `api/admin/deleteAnnouncement/${id}`,
        method: "DELETE",
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/order/delete-order/${id}`,
        method: "DELETE",
      }),
    }),
    // userDetailsAll: builder.mutation({
    //   query: (body) => {
    //     console.log("update category", body);
    //     const { id } = body;
    //     console.log("user details body data", id);
    //     return {
    //       url: `/admin/user/details/${id}`,
    //       method: "post",
    //     };
    //   },
    // }),
    userDetailsAll: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/user/details/${id}`,
          method: "post",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    productDetails: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/category/product/product-details/${id}`,
          method: "post",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    subCategoryList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/category/listing/selectSubCategory/${id}`,
          method: "get",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    subSubCategoryList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/category/listing/selectSubSubCategory/${id}`,
          method: "get",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    attributesList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/category/listing/selectAttribute/${id}`,
          method: "get",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    valueList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/category/values/selectAttribute/${id}`,
          method: "post",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    valueListforAttributes: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/category/listing/selectValues/${id}`,
          method: "get",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    brandList: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/product/select-brand/${id}`,
          method: "post",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    staffDetails: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, i } = body;
        return {
          url: `admin/staff/staff/StaffDetails/${i}`,
          method: "post",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    agentDetailsAll: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;

        return {
          url: `admin/agent/agent/user-details/${id}`,
          method: "post",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    orderDetailsAll: builder.mutation({
      query: (body) => {
        const { ecomAdmintoken, id } = body;
        return {
          url: `admin/order/order/getOrder/${id}`,
          method: "get",
          headers: {
            "x-auth-token-admin": ecomAdmintoken,
          },
        };
      },
    }),
    createProduct: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/product/createProduct`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createBrand: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/product/addBrand`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createCategory: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/category/category/create`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createTopBanner: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/home/homeScreen/category-banner`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createSubCategory: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/category/subCategory/createSubCategory`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createAttribute: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/category/attribute/createAttribute`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createValues: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/category/values/createvalues`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createSubSubCategory: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: `admin/category/subSubCategory/createSubSubCategory`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createBanners: builder.mutation({
      query: ({ alldata, ecomAdmintoken }) => ({
        url: "admin/home/homeScreen/ScreenOne",
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    createInventory: builder.mutation({
      query: ({ formData, ecomAdmintoken }) => ({
        url: "admin/category/product/importInventory",
        method: "PATCH",
        body: formData,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
    }),
    addNewVariant: builder.mutation({
      query: ({ productId, alldata, ecomAdmintoken }) => ({
        url: `admin/product/new-varient/${productId}`,
        method: "POST",
        body: alldata,
        headers: {
          "x-auth-token-admin": ecomAdmintoken,
        },
      }),
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
  useGetBannerListQuery,
  useGetCatogarySideBannerListQuery,
  useGetCatogaryBottomBannerListQuery,
  useGetCatogaryMiddleBannerListQuery,
  useGetCatogaryScrollBannerListQuery,
  useDeleteCategoryTopBannerMutation,
  useDeleteCategoryBottomBannerMutation,
  useDeleteCategoryMiddleBannerMutation,
  useDeleteCategoryScrollBannerMutation,
  useDeleteCategorySideBannerMutation,
  useGetProductTopBannerListQuery,
  useGetProductBottomBannerListQuery,
  useGetProductMiddleBannerListQuery,
  useGetProductScrollBannerListQuery,
  useGetProductSideBannerListQuery,
  useDeleteProductBottomBannerMutation,
  useDeleteProductMiddleBannerMutation,
  useDeleteProductScrollBannerMutation,
  useDeleteProductSideBannerMutation,
  useDeleteProductTopBannerMutation,
  useAddAgentsMutation,
  useAddReccomdedMutation,
  useCreateStaffMutation,
  useGetAllStaffMutation,
  useStaffDetailsMutation,
  useStaffStatusMutation,
  useCreateCoupanMutation,
  useGetOrderListQuery,
  useGetProductListQuery,
  useGetUserListQuery,
  useGetUserListAllQuery,
  useGetCategoryListQuery,
  useSubCategoryListMutation,
  useBrandListMutation,
  useSubSubCategoryListMutation,
  useAttributesListMutation,
  useValueListMutation,
  useCreateProductMutation,
  useAddNewVariantMutation,
  useCreateCategoryMutation,
  useGetSubCategoryListQuery,
  useCreateSubCategoryMutation,
  useGetSubSubCategoryListQuery,
  useCreateSubSubCategoryMutation,
  useGetAttibutesListQuery,
  useCreateAttributeMutation,
  useGetValueListQuery,
  useCreateValuesMutation,
  useUpdateSubSubCategoryMutation,
  useUpdateAttributeMutation,
  useProductDetailsMutation,
  useGetAgentListQuery,
  useGetBrandListQuery,
  useCreateBrandMutation,
  useGetNotificationListQuery,
  useGetAnnounceListQuery,
  useGetCoupanListQuery,
  useGetInfoListQuery,
  useGetContactListQuery,
  useGetHelpListQuery,
  useGetCategoryListMutation,
  useCreateHelpMutation,
  useGetQuestionListMutation,
  useCreateQuestionMutation,
  useGetSelectCategoryListQuery,
  useGetSubCategoryListMutation,
  useGetSubSubCategoryListMutation,
  useGetAttibutesListMutation,
  useGetValueListMutation,
  useGetBrandListMutation,
  useValueListforAttributesMutation,
  useGetProductListSearchMutation,
  useUpdateQuestionMutation,
  useCreateTopBannerMutation,
  useCreateBannersMutation,
  useGetBannerListAllQuery,
  useDeleteBannerAllListMutation,
  useGetCoupanListAllMutation,
  useGetUserListAllSearchMutation,
  useGetFileUserMutation,
  useGetOrderListAllMutation,
  useUpdateInfoMutation,
  useDeleteContentMutation,
  useGetNotificationListMutation,
  useCreateNotificationMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useGetAnnounceListMutation,
  useCreateAnnouncementMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useGetAdminDataQuery,
  useChangePasswordMutation,
  useCreateInventoryMutation,
} = PostApi;

// Cấu hình chung
const PREFIX = "cuongvv";
const GLOBAL_VER = "v1";

// Setup thời gian
export const TTL = {
  TINY: 60, // 1 phút
  SHORT: 300, // 5 phút
  MEDIUM: 900, // 15 phút
  LONG: 3600, // 1 giờ
  VERY_LONG: 86400, // 1 ngày,
  WEEK: 604800, // 1 tuần
};

// Quản lý key và tag
export const CACHE = {
  USER: {
    _VER: "v1",
    _KEY: {
      LIST: () => `${PREFIX}:${GLOBAL_VER}:users:${CACHE.USER._VER}:list`,
      DETAIL: (id: number) =>
        `${PREFIX}:${GLOBAL_VER}:users:${CACHE.USER._VER}:detail:id_${id}`,
    },
    TAGS: {
      ROOT: () => [`${PREFIX}:user`],
      DETAIL: (id: string) => [`${PREFIX}:user`, id],
      LIST: () => [`${PREFIX}:user-list`],
    },
  },
  PRODUCT: {
    _VER: "v1",
    _KEY: {
      LIST: () => `${PREFIX}:${GLOBAL_VER}:products:${CACHE.PRODUCT._VER}:list`,
      DETAIL: (id: number) =>
        `${PREFIX}:${GLOBAL_VER}:products:${CACHE.PRODUCT._VER}:detail:id_${id}`,
    },
    TAGS: {
      ROOT: () => [`${PREFIX}:product`],
      DETAIL: (id: string) => [`${PREFIX}:product`, id],
      LIST: () => [`${PREFIX}:product-list`],
    },
  },
};

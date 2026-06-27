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
      DETAIL: (id: string) =>
        `${PREFIX}:${GLOBAL_VER}:users:${CACHE.USER._VER}:detail:id_${id}`,
    },
    TAGS: {
      ROOT: () => ["users"],
      DETAIL: (id: string) => [CACHE.USER.TAGS.ROOT, id],
      LIST: () => ["users-list"],
    },
  },
  PRODUCT: {
    _VER: "v1",
    _KEY: {
      LIST: () => `${PREFIX}:${GLOBAL_VER}:products:${CACHE.PRODUCT._VER}:list`,
      DETAIL: (id: string) =>
        `${PREFIX}:${GLOBAL_VER}:products:${CACHE.PRODUCT._VER}:detail:id_${id}`,
    },
    TAGS: {
      ROOT: () => ["products"],
      DETAIL: (id: string) => [CACHE.PRODUCT.TAGS.ROOT, id],
      LIST: () => ["products-list"],
    },
  },
};

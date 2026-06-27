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
      LIST: (limit: number, page: number, hashFilters: string) => {
        let key = `${PREFIX}:${GLOBAL_VER}:users:${CACHE.USER._VER}:list:limit_${limit}_page_${page}`;
        if (hashFilters) {
          key += `_hash_${hashFilters}`;
        }
        return key;
      },
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
      LIST: (limit: number, page: number, hashFilters: string) => {
        let key = `${PREFIX}:${GLOBAL_VER}:products:${CACHE.PRODUCT._VER}:list:limit_${limit}_page_${page}`;
        if (hashFilters) {
          key += `_hash_${hashFilters}`;
        }
        return key;
      },
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

/**
 * Quy tắc TTL
 *
 * 1. Độ biến động dữ liệu
 *   - Dữ liệu tĩnh: cấu hình hệ thống, danh mục, menu, danh sách tỉnh/thành phố, danh sách quốc gia, danh sách loại sản phẩm, danh sách loại người dùng, ...
 *    + LONG/VERY_LONG/WEEK
 *    + Chiến lược: Xóa bằng tag khi cập nhật dữ liệu
 *
 *   - Dữ liệu bán tính: User profile, danh sách sản phẩm, danh sách bài viết, chi tiết sản phẩm
 *    + TTL: MEDIUM/LONG (1 giờ, vài giờ)
 *    + Chiến lược: xóa bằng tag khi update
 *
 *   - Dữ liệu biến động cao: giá sản phẩm, số lượng tồn kho, số lượng đơn hàng, lượt xem bài viết, lượt xem sản phẩm, ...
 *   + TTL: TINY/SHORT (1 phút, 5 phút)
 *    + Chiến lược: Để tự động hết hạn, không cần xóa bằng tag -> dễ gây áp lực cho redis
 *
 * 2. Phân cấp TTL
 *   Nếu dùng Cache Tags:
 *   - List key: TTL ngắn
 *   - Detail key: TTL dài hơn
 *  => List key ngắn hơn detail key để khi có update dữ liệu, list key sẽ bị xóa trước, detail key vẫn còn -> tránh tình trạng list key bị xóa nhưng detail key vẫn còn dữ liệu cũ
 *
 * 3. Không để cache hết hạn cùng lúc
 *   - Nếu có nhiều key cache hết hạn cùng thì sẽ ảnh hưởng đến hiệu năng của hệ thống, vì khi cache hết hạn, hệ thống sẽ phải truy vấn lại dữ liệu từ database
 *
 * const jitter = Math.flor(Math.random() * 3600); --> 0 - 5 phút
 */

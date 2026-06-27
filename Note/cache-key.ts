// Đặt cache key sao cho hiệu quả

// Công thức: Prefix:Version:Entity:EntityVersion:Scope:Params

/**
 * prefix: tên dự án/service (ví dụ: blog, auth, user)
 * version: phiên bản của cache key (ví dụ: v1, v2)
 * entity: đối tượng chính (ví dụ: user, post, comment)
 * entityVersion: phiên bản của entity (ví dụ: v1, v2)
 * scope: phạm vi của cache key (ví dụ:detail, list, ...)
 * params: các tham số bổ sung để xác định cache key (ví dụ: id:101, page:2, limit:10)
 */

// Ví dụ:

// Danh sách (list)

/**
 * - Danh sách mặc định: (Trang 1): blog:v1:posts:v1:list:page_1_limit_10
 * - danh sách theo category (ví dụ: thể thao) blog:v1:posts:v1:list:category_sports_page_1
 * - tìm kiếm theo từ khóa: blog:v1:posts:v1:list:q_iphone_sort_price_desc
 * - danh sách được lọc phức tạp (dùng MD5 hash cho params): blog:v1:posts:v1:list:filter_3a4f5e6d7c8b9a0b1c2d3e4f5g6h7i8j)
 */

// Quản lý version cho list

/**
 * blog:v1:posts:v1:list_v1:page_1_limit_10
 * blog:v1:posts:v1:list_v1:cat_sports_page_1
 */

// chi tiết thực thể

/**
 *  - chi tiết bài viết: blog:v1:posts:v1:detail:id_101
 *  - thông tin user (dùng attribute để chia nhỏ)
 *  - identity:v1:users:v1:detail:id_55:profile
 *  - identity:v1:users:v1:detail:id_55:settings
 */

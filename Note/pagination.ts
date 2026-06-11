/**
 * Phân trang là kỹ thuật cực kỳ quan trọng để tối ưu hiệu năng ứng dụng, giúp bạn không phải tải hàng triệu bản ghi cùng lúc lên bộ nhớ
 * 
 * Trong Prisma, có hai phương pháp phân trang là Offset-based pagination (truyền thống) và Cursor-based pagination (hiệu năng cao).
 */

// 1. Offset-based pagination (phân trang theo vị trí)

/**
 * Đây là cách tiếp cận phổ biến nhất, sử dụng hai tham số  skip (bỏ qua bao nhiêu bản ghi) và take (lấy bao nhiêu bản ghi).
 * Cách hoạt động:
 * 
 * tương tự như LIMIT và OFFSET trong SQL, bạn sẽ truyền vào số lượng bản ghi muốn bỏ qua (skip) và số lượng bản ghi muốn lấy (take).
 * 
 * const result = await prisma.user.findMany({
 *   skip: 10, // bỏ qua 10 bản ghi đầu tiên
 *   take: 5,  // lấy 5 bản ghi tiếp theo,
 *   orderBy: {
 *   createdAt: 'desc' // sắp xếp theo ngày tạo giảm dần}
 *  });
 */

/**
 * - Ưu điểm: Dễ triển khai và sử dụng, phù hợp với các trường hợp dữ liệu nhỏ hoặc khi người dùng có thể nhảy đến bất kỳ trang nào.
 * - Nhược điểm: Hiệu năng kém khi dữ liệu lớn, vì cơ sở dữ liệu phải bỏ qua tất cả các bản ghi trước đó để tìm đến vị trí mong muốn.
 */

// 2. Cursor-based pagination (phân trang theo con trỏ)

/**
 * Thay vì nhảy đến một vị trí dựa trên số thứ tự, cursor-based pagination sử dụng một giá trị duy nhất (thường là ID hoặc timestamp) của bản ghi cuối cùng của trang trước đó làm
 * "điểm đánh dấu" (con trỏ) để xác định nơi bắt đầu cho trang tiếp theo.
 * 
 * Cách hoạt động:
 * 
 * Sử dụng tham số cursor để chỉ định điểm bắt đầu, và take để xác định số lượng bản ghi muốn lấy.
 * 
 * const secondPage = await prisma.user.findMany({
 *  take: 10,
 *  cursor: {
 *    id: 42 // ID của bản ghi cuối cùng trên trang trước đó
 *  },
 *  skip: 1, // bỏ qua bản ghi có ID 42 để không bị lặp lại
 *  orderBy: {
 *    createdAt: 'desc' // sắp xếp theo ngày tạo giảm dần
 *  }
 * });
 */


/**
 * Ưu điểm: Hiệu năng tốt hơn khi làm việc với dữ liệu lớn, vì cơ sở dữ liệu có thể sử dụng chỉ mục để tìm đến vị trí bắt đầu nhanh chóng. Phù hợp với các ứng dụng 
 *          có dữ liệu liên tục được thêm vào, như mạng xã hội hoặc hệ thống tin tức.
 * Nhược điểm: Khó triển khai hơn so với offset-based pagination, và không cho phép người dùng nhảy đến bất kỳ trang nào một cách dễ dàng như offset-based pagination.
 *             Hiểu đơn giản là không thể nhảy đến trang 5 nếu không biết con trỏ của trang 4, trong khi offset-based pagination có thể nhảy trực tiếp đến trang 5 bằng 
 *             cách tính toán skip = (5 - 1) * pageSize.
 */

// với trang thương mại điện tử thì sử dụng cursor-based pagination sẽ tốt hơn vì dữ liệu sản phẩm thường xuyên được cập nhật và có thể có hàng ngàn sản phẩm, 
// trong khi với trang blog thì offset-based pagination có thể phù hợp hơn vì người dùng thường muốn nhảy đến một trang cụ thể.

// trang chủ admin trang thương mại điện tử sẽ sử dụng cursor-based pagination để đảm bảo hiệu năng khi quản lý hàng ngàn sản phẩm,
// trong khi trang danh mục sản phẩm có thể sử dụng offset-based pagination để cho phép người dùng nhảy đến bất kỳ trang nào trong danh mục đó.
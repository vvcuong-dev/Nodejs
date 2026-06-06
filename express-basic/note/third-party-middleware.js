// Sử dụng Third-party Middleware: Express có nhiều middleware tích hợp sẵn và cũng hỗ trợ các middleware của bên thứ ba. 

/**
 * - Cộng đồng Nodejs đã xây dựng rất nhiều middleware mạnh mẽ. Bạn k nên "tự chế bánh xe" mà hãy tận dụng chúng
 */


// Morgan: là một middleware ghi log HTTP request. Nó giúp bạn theo dõi các yêu cầu đến server, bao gồm phương thức, URL, mã trạng thái và thời gian phản hồi.
// Cài đặt: npm install morgan
// Công dụng: 

/**
 * - Ghi log chi tiết về các yêu cầu HTTP, giúp bạn theo dõi và gỡ lỗi ứng dụng.
 * - Hỗ trợ nhiều định dạng log khác nhau (combined, common, dev, short, tiny).
 * - Có thể tùy chỉnh log theo nhu cầu của bạn.
 * - Tích hợp dễ dàng với Express bằng cách sử dụng app.use(morgan('dev')).
 * - Cung cấp thông tin hữu ích để phân tích hiệu suất và bảo mật của ứng dụng.
 */

// Helmet: là một middleware bảo mật giúp bảo vệ ứng dụng của bạn khỏi các lỗ hổng bảo mật phổ biến bằng cách thiết lập các header HTTP phù hợp.
// Cài đặt: npm install helmet
// Công dụng:

/**
 * - Bảo vệ ứng dụng khỏi các lỗ hổng bảo mật phổ biến như XSS, clickjacking, và sniffing.
 * - Thiết lập các header HTTP bảo mật như Content-Security-Policy, X-Frame-Options, và Strict-Transport-Security.
 * - Dễ dàng tích hợp với Express bằng cách sử dụng app.use(helmet()).
 * - Cung cấp một lớp bảo vệ bổ sung cho ứng dụng của bạn mà không cần phải cấu hình phức tạp.
 * - Giúp cải thiện điểm số bảo mật của ứng dụng trên các công cụ đánh giá bảo mật.
 */

// CORS: là một middleware giúp bạn quản lý chính sách chia sẻ tài nguyên giữa các nguồn (Cross-Origin Resource Sharing). Nó cho phép bạn kiểm soát việc chia sẻ tài nguyên giữa các domain khác nhau.
// Cài đặt: npm install cors
// Công dụng:

/**
 * - Quản lý chính sách chia sẻ tài nguyên giữa các domain khác nhau.
 * - Cho phép hoặc từ chối các yêu cầu từ các nguồn khác nhau dựa trên cấu hình của bạn.
 * - Hỗ trợ cấu hình linh hoạt, cho phép bạn chỉ định các domain được phép truy cập tài nguyên của bạn.
 * - Dễ dàng tích hợp với Express bằng cách sử dụng app.use(cors()).
 * - Giúp bảo vệ ứng dụng của bạn khỏi các cuộc tấn công Cross-Origin và đảm bảo rằng chỉ những nguồn đáng tin cậy mới có thể truy cập tài nguyên của bạn.
 */

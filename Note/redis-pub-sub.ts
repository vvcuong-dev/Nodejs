// Reids Pub/Sub - Cơ chế truyền tin thời gian thực

// Khái niệm

/**
 * Pub/Sub (viết tắt Publish/Subcribe) là một mô hình truyền tin (Messaging Pattern) nơi người gửi tin nhắn (Publisher) không gửi trực tiếp cho người nhận cụ thể.
 * Thay vào đó, tin nhắn được phân loại vào các kênh (Channels). Người nhận (Subcriber) sẽ đăng ký lắng nghe một hoặc nhiều kênh mà họ quan tâm.
 *
 * Cơ chế hoạt động:
 *   - Publisher: Phát tin nhắn lên một "Kênh" kèm them nội dung.
 *   - Channel: đóng vai trò như một đài phát thanh, nơi các tin nhắn được phân loại và gửi đi.
 *   - Subscriber: Đăng ký lắng nghe các kênh mà họ quan tâm và nhận tin nhắn khi có thông báo mới.
 *
 * Đặc điểm quan trọng:
 *   - Fire and Forget (Bắn và quên): Redis không lưu lại tin nhắn. Nếu Publisher gửi tin nhắn khi không có Subscriber nào đăng ký, tin nhắn đó sẽ bị mất vĩnh viễn.
 *   - Decoupling (Tách rời): Publisher và Subscriber không cần biết về nhau. Họ chỉ cần biết về kênh mà họ quan tâm.
 *
 * Ứng dụng thực tế:
 *   1. Hệ thống Chat thời gian thực: Redis Pub/Sub có thể được sử dụng để xây dựng các ứng dụng chat, nơi các tin nhắn được gửi và nhận ngay lập tức giữa các người dùng.
 *   2. Thông báo thời gian thực: Redis Pub/Sub có thể được sử dụng để gửi thông báo thời gian thực đến các ứng dụng web hoặc di động.
 *   3. Cập nhật dữ liệu theo thời gian thực: Redis Pub/Sub có thể được sử dụng để cập nhật dữ liệu theo thời gian thực trong các ứng dụng như bảng điều khiển, dashboard, hoặc các ứng dụng giám sát.
 *
 * Lưu ý: Redis Pub/Sub không đảm bảo rằng tất cả các Subscriber sẽ nhận được tất cả các tin nhắn. Nếu một Subscriber không đăng ký kịp thời, họ sẽ bỏ lỡ các tin nhắn đã được phát trước đó.
 */

// Các câu lệnh cơ bản trong Redis Pub/Sub:
/**
 * 1. PUBLISH <channel> <message>: Gửi một tin nhắn đến một kênh cụ thể.
 * 2. SUBSCRIBE <channel>: Đăng ký lắng nghe một kênh cụ thể.
 * 3. UNSUBSCRIBE <channel>: Hủy đăng ký lắng nghe một kênh cụ thể.
 * 4. PSUBSCRIBE <pattern>: Đăng ký lắng nghe các kênh theo mẫu (pattern).
 * 5. PUNSUBSCRIBE <pattern>: Hủy đăng ký lắng nghe các kênh theo mẫu (pattern).
 */

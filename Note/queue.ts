/**
 * Queue trong backend thì cần nắm chắc 2 khái niệm:
 * 1. Message queue: là một hàng đợi các tin nhắn (message) được gửi từ một producer (người gửi) đến một consumer (người nhận).
 *    Producer sẽ gửi tin nhắn vào queue, và consumer sẽ lấy tin nhắn từ queue để xử lý. Message queue giúp tách rời producer và consumer, cho phép chúng hoạt động độc lập
 *    và không bị ảnh hưởng bởi nhau.
 * 2. Job queue: là một hàng đợi các công việc (job) cần được thực hiện. Job queue thường được sử dụng để xử lý các tác vụ nặng hoặc tốn thời gian, như gửi email, xử lý ảnh, hoặc tính toán dữ liệu.
 *    Job queue giúp phân phối công việc cho nhiều worker (người thực hiện) để tăng hiệu suất và giảm tải cho hệ thống.
 */

// Hiểu đơn giản bằng ví dụ đời thực

/**
 * Message Queue giống như hòm thư bưu điện:
 *   - người gửi bò thư vào hòm, không cần biết ai nhận, nhận lúc nào. Người nhận mở hòm lấy thư khi rảnh. Hai bên hoàn toàn độc lập về thời gian.
 *
 * Job Queue giống như phiếu đặt hàng nhà máy:
 *   - Khách ghi yêu cầu vào phiếu, bỏ vào hộp rồi đi về. Công nhân (workder) lấy phiếu ra và thực hiện công việc nặng nhọc sau đó gửi sản phẩm cho khách.
 *     Khách không cần biết công nhân là ai, làm lúc nào, chỉ cần nhận sản phẩm khi xong.
 * 
 * 
 * 📐 Sơ đồ hoạt động
 *      Message Queue — 1 message → nhiều bên nhận
 *      [Service Đặt hàng] → [📮 MQ]    → [Service Kho hàng]
                                        → [Service Vận chuyển]  
                                        → [Service Gửi Email]

    => Ba service nhận cùng 1 sự kiện và chạy song song, độc lập nhau.

    *      Job Queue — 1 job → 1 bên nhận

    [User upload ảnh] → [📋 Job Queue] → [Worker 1 đang xử lý]
                                        → [Worker 2 đang xử lý]
                                        → [Worker 3 chờ việc]
                                                                → [✅ Lưu DB]

                                                         => Mỗi job chỉ được 1 worker nhận và thực thi đến xong.
 *      
 */

// Ví dụ thực tế:

/**
 * Message Queue (Kafka, RabbitMQ, SQS)
 *
 * # Hệ thống đặt hàng:
 *     - khi bạn bấm "Đặt hàng", service Order gửi 1 message vào MQ. Ngay lập tức và song song: Service Kho hàng trừ tồn kho, service Thanh toán xác nhận, service thông báo gửi SMS cho bạn.
 *       Không service nào phải chờ service nào, tất cả đều nhận cùng 1 message và xử lý song song.
 * # Thu thập log hệ thống
 *    - Hàng nhìn server gửi log vào Kafka. Một consumber lưu vào db, một consumer phân tích bất thường, một consumber hiển thị dashboard - tất cả cùng xử lý song song.
 * # Hệ thống chat
 *   - Khi bạn gửi tin nhắn, service chat gửi message vào MQ. Các service khác nhận message và hiển thị cho người nhận, lưu vào db, gửi thông báo push notification.
 */

/**
 * Job Queue (Celery, RQ, Sidekiq)
 *
 * # Xử lý ảnh sau khi upload
 *  - User upload ảnh đại diện -> server trả về "Thành công!" ngay lập tức -> phía sau, job chạy nền: resice 3 kích thước, nén file tạo thumbnail, upload lên CDN.
 *    User không cần biết ai làm, chỉ cần nhận ảnh khi xong.
 *
 * # gửi email marketing hàng loạt:
 *   - cần gửi 100,000 email. Thay vì gửi trong 1 request (chắc chắn sẽ timeout), hệ thống đẩy 100,000 job vào queue.
 *     Các worker sẽ lấy job ra gửi email, mỗi worker gửi 1 số lượng nhất định, khi xong sẽ lấy job tiếp theo. Hệ thống gửi email nhanh hơn, không bị timeout.
 *
 * # Export báo cáo PDF, Excel nặng
 *   - User bấm "Xuất báo cáo" -> server trả về "Đang xử lý, sẽ gửi email khi xong" -> phía sau, job chạy nền: lấy dữ liệu, tạo file PDF/Excel, upload lên CDN, gửi email thông báo cho user.
 *
 * # Xử lý thanh toán
 *   - User bấm "Thanh toán" -> server trả về "Đang xử lý, sẽ gửi email khi xong" -> phía sau, job chạy nền: gọi API thanh toán, lưu kết quả vào DB, gửi email thông báo cho user.
 *
 */

// 💡 Quy tắc chọn nhanh

// "Tôi cần thông báo cho nhiều bên về 1 sự kiện?" → Message Queue

// "Tôi cần thực hiện 1 việc nặng mà không làm lag user?" → Job Queue

// "Cần cả hai?" → Dùng Celery (Job Queue) trên nền RabbitMQ (Message Queue) — đây là combo phổ biến nhất trong thực tế!

# DLX

1. Queue chính "work_queue" (nơi mà worker lấy ra để xử lý) --> Nếu lỗi --> gọi nack để chuyển sang DLX

2. Queue chờ "retry_queue" (nơi mà message được gửi đến khi worker xử lý lỗi) --> Lưu trữ tạm thời 10 giây --> gửi lại message vào queue chính "work_queue"

3. Bộ đếm: Mỗi lần quay lại queue chính "work_queue" thì tăng bộ đếm lên 1. (Dùng header "x-retry-count" để lưu trữ số lần retry)

giới hạn số lần retry: 3 lần

Nếu sau 3 lần --> vẫn lỗi --> đẩy sang Dead Letter Queue (DLQ) để lưu trữ phân tích sau hoặc xóa bỏ.

# BullMQ

là một thư viện Node.js mạnh mẽ để quản lý hàng đợi công việc (job queues) và xử lý các tác vụ bất đồng bộ. Nó được xây dựng trên Redis và cung cấp các tính năng như:

- Hỗ trợ các loại hàng đợi khác nhau (queues, jobs, workers).
- Quản lý trạng thái công việc (pending, completed, failed).
- Hỗ trợ retry tự động cho các công việc thất bại.
- Hỗ trợ các sự kiện (events) để theo dõi trạng thái công việc.

1. Job Queue (Hàng đợi công việc) - ví dụ: BullMQ sử dụng Redis để lưu trữ các công việc trong hàng đợi. Mỗi công việc được định nghĩa bởi một payload (dữ liệu) và có thể có các thuộc tính như priority, delay, attempts, v.v.

Mục đích: thực thi một tác vụ cụ thể ở nền, thường bởi chính hệ thống của bạn (không giao tiếp giữa nhiều service khác nhau).

Đặc điểm:

- Job có trạng thái vòng đời rõ ràng: waiting, active, completed, failed, delayed.
- Thường có 1 loại "người tiêu thụ" (worker) duy nhất để xử lý công việc. biết chính xác cách xử lý job đó (vì worker được viết trong cùng codebase, cùng hệ thống)
- Tập trung vào: retry, delay, priority, concurrency, rate limiting, job events, job progress, job logs.
- Ví dụ: "Xử lý ảnh này", "Gửi email xác nhận", "Tạo báo cáo hàng ngày", "Chạy job lúc 2h sáng mỗi ngày"
- Sau khi job hoàn thành, nó kết thúc luôn - không có khái niệm "nhiều consumer đều nhận được job này" (không có pub/sub)

=> Tóm gọn: Job Queue = "làm việc X, báo tôi biết đã xong chưa, nếu lỗi thì thử lại"

2. Message Queue (Hàng đợi tin nhắn) - ví dụ: RabbitMQ, Kafka, SQS, v.v.

Mục đích: giao tiếp giữa nhiều service khác nhau, thường là các service độc lập (microservices) hoặc các hệ thống khác nhau. Service A gửi thông điệp, service B (hoặc C, D...) nhận thông điệp đó và xử lý.

Đặc điểm:

- Tập trung vào việc truyền dữ liệu/sự kiện giữa các hệ thống độc lập, không nhất thiết biết ai sẽ xử lý
- Có các mô hình phân phối phức tạp hơn:
  - Pub/Sub: một message có thể được nhiều consumer đều nhận (broadcast)
  - Routing/Exchange (RabbitMQ): định tuyến message dựa trên các tiêu chí (routing key, topic, fanout)
  - Partition & Offset (Kafka): dùng để xử lý luồng dữ liệu (streaming) cực lớn, cho phép "replay" lại message cũ
  - Nhấn mạnh vào: độ tin cậy truyền tải, thứ tự, khả năng mở rộng giữa nhiều service
  - Ví dụ: "user-registered event" được gửi đi, rồi service Email, service Analytics, service CRM đều lắng nghe event đó và tự xử lý theo cách riêng.

  Tóm gọn: Message Queue = "sự kiện X đã xảy ra, ai quan tâm thì tự lấy mà xử lý"

3. Concurrency Worker (Đa luồng xử lý) - ví dụ: BullMQ Worker, RabbitMQ Consumer

Mục đích: xử lý các công việc hoặc tin nhắn từ hàng đợi một cách song song, tăng hiệu suất và khả năng mở rộng.

Đặc điểm:

- Worker có thể được cấu hình để xử lý nhiều công việc cùng lúc (concurrency), giúp tận dụng tối đa tài nguyên hệ thống.
- Worker có thể được triển khai trên nhiều instance hoặc máy chủ khác nhau, cho phép mở rộng theo nhu cầu.
- Worker thường có cơ chế retry, delay, và quản lý trạng thái công việc để đảm bảo rằng các công việc được xử lý một cách đáng tin cậy.
- Worker có thể lắng nghe các sự kiện từ hàng đợi để thực hiện các hành động cụ thể khi công việc hoàn thành, thất bại, hoặc bị hủy bỏ.

- Ví dụ: Trong BullMQ, bạn có thể tạo một Worker để xử lý các công việc từ một hàng đợi cụ thể, và bạn có thể cấu hình số lượng công việc mà Worker có thể xử lý đồng thời bằng cách sử dụng tùy chọn concurrency.

  Tóm gọn: Concurrency Worker = "tôi sẽ xử lý nhiều job/message cùng lúc, nếu lỗi thì thử lại, nếu xong thì báo lại"

4. Delay job/message (Trì hoãn công việc/tin nhắn) - ví dụ: BullMQ Delay, RabbitMQ Delayed Message Exchange

Mục đích: cho phép các công việc hoặc tin nhắn được xử lý sau một khoảng thời gian nhất định, thay vì ngay lập tức.

Đặc điểm:

- Cho phép đặt thời gian trì hoãn (delay) cho các công việc hoặc tin nhắn, giúp kiểm soát thời điểm xử lý.
- Thường được sử dụng trong các tình huống như retry sau khi thất bại, gửi thông báo sau một khoảng thời gian, hoặc thực hiện các tác vụ định kỳ.
- Ví dụ: Trong BullMQ, bạn có thể tạo một công việc với tùy chọn delay, và công việc đó sẽ chỉ được xử lý sau khi thời gian trì hoãn đã kết thúc.

Tóm gọn: Delay job/message = "tôi sẽ xử lý job/message này sau X giây, nếu lỗi thì thử lại sau X giây nữa"

5. Retry job/message (Thử lại công việc/tin nhắn) - ví dụ: BullMQ Retry, RabbitMQ Dead Letter Exchange

Mục đích: cho phép các công việc hoặc tin nhắn được thử lại khi gặp lỗi, nhằm tăng khả năng thành công trong việc xử lý.

Đặc điểm:

- Cho phép cấu hình số lần thử lại (retry attempts) và khoảng thời gian giữa các lần thử lại (retry delay).
- Thường được sử dụng trong các tình huống như xử lý các tác vụ không đáng tin cậy, nơi mà lỗi có thể xảy ra do các yếu tố bên ngoài (ví dụ: mạng, dịch vụ bên thứ ba).
- Ví dụ: Trong BullMQ, bạn có thể cấu hình số lần thử lại và khoảng thời gian giữa các lần thử lại cho một công việc, và nếu công việc thất bại, nó sẽ được tự động thử lại theo cấu hình đã định.

Tóm gọn: Retry job/message = "nếu job/message này lỗi thì thử lại X lần, mỗi lần cách nhau Y giây, nếu vẫn lỗi thì gửi sang DLQ"

6. Job Scheduler (Lập lịch công việc) - ví dụ: BullMQ Repeatable Jobs, RabbitMQ Scheduled Messages

Mục đích: cho phép lập lịch các công việc hoặc tin nhắn để được xử lý vào một thời điểm cụ thể trong tương lai hoặc theo một lịch trình định kỳ.

Đặc điểm:

- Cho phép định nghĩa các công việc hoặc tin nhắn có thể được lập lịch để chạy vào một thời điểm cụ thể hoặc theo một lịch trình định kỳ (ví dụ: hàng ngày, hàng tuần).
- Thường được sử dụng trong các tình huống như gửi thông báo định kỳ, thực hiện các tác vụ bảo trì, hoặc chạy các báo cáo định kỳ.
- Ví dụ: Trong BullMQ, bạn có thể tạo các công việc có thể lặp lại (repeatable jobs) với các tùy chọn như cron expressions hoặc interval để xác định lịch trình chạy.

Tóm gọn: Job Scheduler = "tôi sẽ xử lý job này vào lúc X hoặc theo lịch trình Y, nếu lỗi thì thử lại theo retry config"

7. Cronjob (Công việc theo lịch trình) - ví dụ: BullMQ Cron Jobs, RabbitMQ Scheduled Messages

Mục đích: cho phép lập lịch các công việc hoặc tin nhắn để được xử lý vào một thời điểm cụ thể trong tương lai hoặc theo một lịch trình định kỳ, sử dụng cú pháp cron.

Đặc điểm:

- Cho phép định nghĩa các công việc hoặc tin nhắn có thể được lập lịch để chạy vào một thời điểm cụ thể hoặc theo một lịch trình định kỳ, sử dụng cú pháp cron.
- Thường được sử dụng trong các tình huống như gửi thông báo định kỳ, thực hiện các tác vụ bảo trì, hoặc chạy các báo cáo định kỳ.
- Ví dụ: Trong BullMQ, bạn có thể tạo các công việc theo lịch trình (cron jobs) với các tùy chọn như cron expressions để xác định lịch trình chạy.

Tóm gọn: Cronjob = "tôi sẽ xử lý job này vào lúc X hoặc theo lịch trình Y (theo cron), nếu lỗi thì thử lại theo retry config"

## Rate Limit

Kỹ thuật giới hạn số lần request trong 1 đơn vị thời gian nhất định

Ví dụ:

- mỗi người dùng chúng ta chỉ cho phép gửi 100 request/s. Nếu vượt quá thì sẽ trả về response lỗi.
- mỗi người dùng chỉ cho phép nhập sai thẻ credit 3 lần trong 1 ngày
- mỗi địa chỉ IP chỉ có thể tạo được 2 account trong 1 ngày

Tác dụng của Rate Limit:

- hạn chế tấn công DOS (Denial of Service) đến hệ thống
- hạn chế brute force password (thử nhiều lần để đoán password)
- Hạn chế brute force thông tin thẻ credit card (thử nhiều lần để đoán số thẻ, ngày hết hạn, CVV)
- bảo mật: không cho phép nhập sai password quá nhiều lần
- Doanh thu: với mỗi plan sẽ có rate limit khác nhau. Nếu muốn dùng nhiều hơn thì cần mua lên plan đắt tiền hơn

Cách triển khai Rate Limit:

- Rate limit theo cái gì?
  - IP --> Thường áp dụng cho các API public, không cần login
  - User --> Các API Private (xác thực email và password) --> dựa vào userId
  - API Key --> API Private (Xác thực bằng API Key) --> dựa vào apiKey

- Lưu trữ số lượng Request ở đâu?
  - Database
  - Redis (thường dùng nhất vì tốc độ nhanh, có thể set expire)
  - File (không nên dùng vì tốc độ chậm, không thể set expire, không thể scale ra nhiều server)

- Xây dựng logic:
  - Xác định số lượng Request
  - Đơn vị thời gian (1 giây, 1 phút, 1 giờ, 1 ngày)
  - Ví dụ: theo địa chỉ IP, mỗi IP chỉ được phép gửi 100 request trong 1 phút. Nếu vượt quá thì trả về lỗi 429 Too Many Requests

  - Khi có Request, thực hiện các thao tác sau:
    - Lấy địa chỉ IP của người dùng
    - Lấy số lượng request cũ với địa địa IP vừa lấy được, nếu chưa có trong kho lưu trữ -> khởi tạo giá trị 0 và thời gian gửi request đầu tiên
    - Tăng số lượng request lên 1
    - Cập nhật vào kho lưu trữ (có thể set expire để tự động reset sau 1 phút)

  - Trong middleware kiểm tra
    - Lấy được số lượng request của địa chỉ IP đang gửi Request
    - Nếu vượt quá giá trị cho phép --> kiểm tra thời gian hiện tại --> so sánh với thời gian gửi request đầu tiên
      - Nếu chưa hết 1 phút --> trả về lỗi 429 Too Many Requests
      - Nếu đã hết 1 phút --> reset số lượng request về 0 và cập nhật thời gian gửi request đầu tiên là thời gian hiện tại

    Xây dựng Database

    Table rate_limit
    - id: uuid
    - ip_address: string
    - request_number: number
    - start_time: timestamp
    - created_at: timestamp
    - updated_at: timestamp

    Table request_log
    - id: uuid
    - ip_address: string
    - created_at: timestamp
    - updated_at: timestamp

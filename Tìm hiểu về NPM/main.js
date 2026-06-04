// Quản lý gói với PNPM

/**
 * 1. PNPM là gì?
 *   - PNPM (Performant NPM) là một trình quản lý gói JavaScript nhanh và hiệu quả, được thiết kế để thay thế NPM truyền thống.
 *  - PNPM sử dụng một cơ chế lưu trữ gói thông minh, giúp giảm thiểu việc sao chép gói và tăng tốc độ cài đặt.
 *
 * 2. Cài đặt PNPM
 *   - Bạn có thể cài đặt PNPM bằng cách sử dụng NPM:
 *     npm install -g pnpm
 *
 * 3. Sử dụng PNPM
 *   - khởi tạo dự án mới: pnpm init
 *   - Cài đặt gói: pnpm install <package-name>
 *   - Cài đặt tất cả gói trong package.json: pnpm install
 *   - Cập nhật gói: pnpm update <package-name>
 *   Gỡ bỏ gói: pnpm remove <package-name>
 *
 * 4. Lợi ích của PNPM
 *   - Tốc độ nhanh hơn so với NPM truyền thống.
 *   Sử dụng ít dung lượng đĩa hơn nhờ cơ chế lưu trữ gói thông minh.
 *   Hỗ trợ tốt hơn cho monorepos và các dự án lớn.
 *
 * 5. Kết luận
 *   - PNPM là một lựa chọn tuyệt vời cho các nhà phát triển JavaScript muốn cải thiện hiệu suất quản lý gói và tối ưu hóa quá trình phát triển.
 */


// Note

/**
 * 1. -g: Cài đặt gói ở cấp độ toàn cầu, cho phép bạn sử dụng gói đó từ bất kỳ đâu trên hệ thống của mình.
 * 2. -D hoặc --save-dev: Cài đặt gói như một phụ thuộc phát triển, chỉ cần thiết trong quá trình phát triển và không cần thiết khi triển khai ứng dụng.
 * 3. -P hoặc --save-prod: Cài đặt gói như một phụ thuộc sản xuất, cần thiết cho ứng dụng khi triển khai.: lấy cái dependency (bỏ qua devdependencies) của project đó, 
 *     nếu có thì sẽ cài đặt, nếu không có thì sẽ bỏ qua
 * 4. -E hoặc --save-exact: Cài đặt gói với phiên bản chính xác được chỉ định, không cho phép cập nhật tự động lên phiên bản mới hơn.
 * 5. --save-optional: Cài đặt gói như một phụ thuộc tùy chọn, có thể được bỏ qua nếu không cần thiết.
 * 6. --save-peer: Cài đặt gói như một phụ thuộc đồng đẳng, yêu cầu người dùng cài đặt gói đó riêng biệt để đảm bảo tính tương thích.
 * 7. --no-save: Cài đặt gói mà không lưu nó vào package.json, có nghĩa là gói sẽ được cài đặt nhưng không được ghi nhận là một phụ thuộc của dự án.
 */

// Cấu trúc quản lý của PNPM

/**
 * Khi bạn cài đặt một thư viện, PNPM sẽ tạo ra 2 thành phần chính:
 *  1. thư mục node_modules: Đây là nơi chứa các gói đã cài đặt, nhưng thay vì sao chép toàn bộ gói vào đây, 
 *     PNPM sẽ tạo liên kết (symlink) đến các gói được lưu trữ trong một kho lưu trữ trung tâm.
 *  2. Kho lưu trữ trung tâm: Đây là nơi PNPM lưu trữ tất cả các gói đã cài đặt trên hệ thống của bạn. 
 *     Khi bạn cài đặt một gói mới, PNPM sẽ kiểm tra xem gói đó đã tồn tại trong kho lưu trữ trung tâm chưa. 
 *     Nếu có, nó sẽ tạo liên kết đến gói đó trong thư mục node_modules của dự án của bạn thay vì sao chép toàn bộ gói.
 *  3. file pnpm-lock.yaml: Đây là file khóa của PNPM, chứa thông tin về các gói đã cài đặt và phiên bản của chúng.
 *     File này giúp đảm bảo rằng tất cả các nhà phát triển trong dự án sử dụng cùng một phiên bản của các gói, 
 *     tránh các vấn đề về sự không tương thích giữa các phiên bản khác nhau.
 *  4. file package.json: Đây là file cấu hình của dự án, chứa thông tin về các gói phụ thuộc mà dự án cần để hoạt động.
 *     Khi bạn cài đặt một gói mới, PNPM sẽ tự động cập nhật file package.json để thêm gói đó vào danh sách phụ thuộc của dự án.
 */
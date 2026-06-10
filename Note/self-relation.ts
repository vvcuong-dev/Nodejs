/** Self-relation */

/**
 * - Self-relation là một mối quan hệ giữa một bảng với chính nó, trong đó một bản ghi của bảng có thể liên kết với nhiều bản ghi khác của cùng một bảng.
 * - Ví dụ: Một nhân viên (Employee) có thể có một người quản lý (Manager) là một nhân viên khác trong cùng bảng Employee.
 * - Trong Prisma, để thiết lập mối quan hệ Self-relation, bạn cần sử dụng các trường liên kết (relation fields) và chỉ định các ràng buộc phù hợp.
 * - Ví dụ: Trong bảng Employee, bạn có thể có một trường managerId để liên kết với chính bảng Employee, và một trường manager để liên kết với bản ghi quản lý tương ứng.
 * - Khi xóa một bản ghi của bảng Employee, bạn có thể sử dụng onDelete: SetNull để tự động đặt giá trị của trường managerId thành null cho các bản ghi liên quan.
 * 
 * - Trong ví dụ trên, chúng ta đã thiết lập mối quan hệ Self-relation giữa Employee và chính nó. Mỗi Employee có thể có một Manager, nhưng mỗi Manager cũng là một Employee.
 * - Khi xóa một Employee, các bản ghi liên quan sẽ được cập nhật để đặt giá trị của trường managerId thành null nhờ vào onDelete: SetNull.
 * 
 * - Lưu ý: Mối quan hệ Self-relation thường được sử dụng khi bạn muốn lưu trữ thông tin về các thực thể có mối quan hệ phức tạp với chính chúng, như các mối quan hệ giữa nhân viên và quản lý, sản phẩm và phụ kiện, v.v.
 *   Việc sử dụng mối quan hệ Self-relation giúp bạn tổ chức dữ liệu một cách hiệu quả và dễ dàng truy vấn thông tin liên quan giữa các bản ghi trong cùng một bảng.
 * 
 * - Khi thiết kế cơ sở dữ liệu, việc sử dụng mối quan hệ Self-relation giúp bạn tổ chức dữ liệu một cách hiệu quả và dễ dàng truy vấn thông tin liên quan giữa các bản ghi trong cùng một bảng.
 * 
 * - Trong Prisma, bạn có thể sử dụng các phương thức như findMany, create, update, delete để thao tác với dữ liệu trong mối quan hệ Self-relation.
 */
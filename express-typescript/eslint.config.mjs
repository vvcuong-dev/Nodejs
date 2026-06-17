import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'prefer-const': 'error', // Yêu cầu sử dụng const thay vì let nếu biến không được gán lại
             'no-unused-vars': 'off', // Cảnh báo khi có biến được khai báo nhưng không sử dụng
             '@typescript-eslint/no-unused-vars': 'warn', // Cảnh báo khi có biến TypeScript được khai báo nhưng không sử dụng
              '@typescript-eslint/no-explicit-any': 'warn', // Tắt cảnh báo khi sử dụng kiểu any trong TypeScript,
              "no-undef": "off", // Tắt cảnh báo khi sử dụng biến chưa được định nghĩa (vì TypeScript sẽ xử lý điều này)
        },
    },
    {
        files: ['src/**/*.ts'], // Áp dụng quy tắc này chỉ cho các file TypeScript
        ignores: ['node_modules/**', 'dist/**'], // Bỏ qua thư mục node_modules và dist
    },
    eslintConfigPrettier
);
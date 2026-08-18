# LeadFlow Demo

Một project demo để luyện quy trình freelance web cơ bản.

## Yêu cầu giả lập từ khách

> Build a responsive landing page with a lead form.
> Fields: name, phone, service.
> Validate required fields and phone number.
> After submission, show success feedback and display submitted leads in a simple admin table.
> The page must work on desktop and mobile.

## Cách chạy

Cách đơn giản nhất:
1. Giải nén file ZIP.
2. Mở file `index.html` bằng Chrome/Safari/Edge.
3. Nhập:
   - Họ tên
   - Số điện thoại Việt Nam
   - Nhu cầu
4. Bấm `Gửi thông tin`.
5. Xem lead xuất hiện trong bảng phía dưới.
6. Refresh trang: dữ liệu vẫn còn vì được lưu bằng `localStorage`.

## Test checklist

- [ ] Không nhập tên → phải báo lỗi.
- [ ] Nhập số điện thoại sai → phải báo lỗi.
- [ ] Không chọn nhu cầu → phải báo lỗi.
- [ ] Nhập đầy đủ → báo thành công.
- [ ] Lead mới xuất hiện trong bảng.
- [ ] Refresh trang → lead vẫn còn.
- [ ] Bấm `Xóa dữ liệu demo` → bảng trở về rỗng.
- [ ] Mở bằng điện thoại hoặc thu nhỏ cửa sổ → giao diện không vỡ.

## Lưu ý

Đây là demo front-end, chưa có backend thật.
Dữ liệu chỉ nằm trong trình duyệt hiện tại.

Bước nâng cấp tiếp theo có thể là:
- gửi dữ liệu lên Google Sheets;
- thêm backend/serverless API;
- deploy lên Vercel/Netlify;
- thêm email notification;
- thêm dashboard đăng nhập.

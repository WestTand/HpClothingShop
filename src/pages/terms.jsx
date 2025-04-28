import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-[#8755f2]">
          Điều khoản Dịch vụ
        </h1>

        <p className="text-gray-600 mb-4">
          Chào mừng bạn đến với nền tảng của chúng tôi. Bằng việc sử dụng dịch vụ,
          bạn đồng ý tuân thủ các Điều khoản Dịch vụ ("Điều khoản") dưới đây. Vui
          lòng đọc kỹ.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Chấp nhận Điều khoản
        </h2>
        <p className="text-gray-600 mb-4">
          Khi sử dụng nền tảng, bạn xác nhận mình từ 18 tuổi trở lên và đồng ý
          tuân thủ các Điều khoản này. Nếu không đồng ý, bạn không được sử dụng
          dịch vụ.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. Sử dụng Dịch vụ
        </h2>
        <p className="text-gray-600 mb-4">
          Bạn cam kết sử dụng dịch vụ chỉ cho các mục đích hợp pháp và tuân theo
          Điều khoản. Bạn không được:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Tham gia vào các hoạt động bất hợp pháp.</li>
          <li>Thử truy cập trái phép vào hệ thống hoặc mạng của chúng tôi.</li>
          <li>Phát tán nội dung độc hại, như mã độc hoặc virus.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Trách nhiệm Tài khoản
        </h2>
        <p className="text-gray-600 mb-4">
          Bạn chịu trách nhiệm bảo mật thông tin đăng nhập tài khoản. Mọi hoạt
          động dưới tài khoản của bạn thuộc trách nhiệm của bạn. Vui lòng thông
          báo ngay nếu nghi ngờ tài khoản bị sử dụng trái phép.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Quyền Sở hữu Trí tuệ
        </h2>
        <p className="text-gray-600 mb-4">
          Tất cả nội dung trên nền tảng, bao gồm văn bản, hình ảnh, và logo, thuộc
          sở hữu của chúng tôi hoặc đối tác cấp phép. Bạn không được sao chép,
          phân phối, hoặc tạo sản phẩm phái sinh mà không có sự cho phép trước.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Chấm dứt Dịch vụ
        </h2>
        <p className="text-gray-600 mb-4">
          Chúng tôi có thể tạm ngưng hoặc chấm dứt quyền truy cập của bạn nếu bạn
          vi phạm Điều khoản hoặc có hành vi gây hại đến nền tảng hoặc người dùng
          khác.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          6. Giới hạn Trách nhiệm
        </h2>
        <p className="text-gray-600 mb-4">
          Dịch vụ được cung cấp "nguyên trạng" mà không có bất kỳ bảo đảm nào.
          Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ
          việc sử dụng dịch vụ, bao gồm thiệt hại trực tiếp, gián tiếp, hoặc hậu
          quả.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. Thay đổi Điều khoản
        </h2>
        <p className="text-gray-600 mb-4">
          Chúng tôi có thể cập nhật Điều khoản này theo thời gian. Bạn sẽ được
          thông báo về các thay đổi quan trọng qua email hoặc trên nền tảng. Việc
          tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận Điều khoản mới.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Liên hệ</h2>
        <p className="text-gray-600 mb-4">
          Nếu bạn có câu hỏi về Điều khoản, vui lòng liên hệ qua{" "}
          <a
            href="mailto:support@example.com"
            className="text-[#8755f2] hover:underline"
          >
            support@example.com
          </a>
          .
        </p>

        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
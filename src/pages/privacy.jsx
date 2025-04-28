import { useNavigate } from "react-router-dom";

export default function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="container px-4 py-8 mx-auto max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-6 text-[#8755f2]">
                    Chính sách Bảo mật
                </h1>

                <p className="text-gray-600 mb-4">
                    Chúng tôi coi trọng quyền riêng tư của bạn. Chính sách Bảo mật này giải
                    thích cách chúng tôi thu thập, sử dụng, chia sẻ và bảo vệ thông tin cá
                    nhân của bạn khi sử dụng dịch vụ của chúng tôi.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    1. Thông tin Chúng tôi Thu thập
                </h2>
                <p className="text-gray-600 mb-4">
                    Chúng tôi thu thập các loại thông tin sau:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>
                        <strong>Thông tin Cá nhân:</strong> Tên, địa chỉ email, thông tin
                        thanh toán và các chi tiết khác bạn cung cấp khi tạo tài khoản hoặc
                        mua hàng.
                    </li>
                    <li>
                        <strong>Dữ liệu Sử dụng:</strong> Thông tin về cách bạn tương tác với
                        nền tảng, như địa chỉ IP, loại trình duyệt và các trang đã truy cập.
                    </li>
                    <li>
                        <strong>Cookie:</strong> Chúng tôi sử dụng cookie để cải thiện trải
                        nghiệm của bạn. Bạn có thể quản lý tùy chọn cookie qua cài đặt trình
                        duyệt.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    2. Cách Chúng tôi Sử dụng Thông tin
                </h2>
                <p className="text-gray-600 mb-4">
                    Chúng tôi sử dụng thông tin của bạn để:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Cung cấp và cải thiện dịch vụ của chúng tôi.</li>
                    <li>Xử lý giao dịch và hoàn thành đơn hàng.</li>
                    <li>Gửi thông báo, khuyến mãi hoặc tin nhắn hỗ trợ.</li>
                    <li>Phân tích hành vi sử dụng để nâng cao trải nghiệm người dùng.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    3. Chia sẻ Thông tin
                </h2>
                <p className="text-gray-600 mb-4">
                    Chúng tôi có thể chia sẻ thông tin của bạn với:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>
                        <strong>Nhà cung cấp Dịch vụ:</strong> Các bên thứ ba hỗ trợ vận hành,
                        như đơn vị xử lý thanh toán hoặc nhà cung cấp phân tích.
                    </li>
                    <li>
                        <strong>Cơ quan Pháp luật:</strong> Khi được yêu cầu bởi luật pháp
                        hoặc để bảo vệ quyền lợi và an toàn của chúng tôi.
                    </li>
                </ul>
                <p className="text-gray-600 mb-4">
                    Chúng tôi không bán thông tin cá nhân của bạn cho bên thứ ba.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    4. Bảo mật Dữ liệu
                </h2>
                <p className="text-gray-600 mb-4">
                    Chúng tôi áp dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin của
                    bạn. Tuy nhiên, không có hệ thống nào an toàn tuyệt đối, và chúng tôi
                    không thể đảm bảo bảo mật hoàn toàn.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    5. Quyền của Bạn
                </h2>
                <p className="text-gray-600 mb-4">
                    Tùy thuộc vào khu vực của bạn, bạn có thể có quyền:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Truy cập hoặc chỉnh sửa thông tin cá nhân của bạn.</li>
                    <li>Yêu cầu xóa dữ liệu của bạn.</li>
                    <li>Từ chối nhận thông tin tiếp thị.</li>
                </ul>
                <p className="text-gray-600 mb-4">
                    Để thực hiện các quyền này, vui lòng liên hệ qua{" "}
                    <a
                        href="mailto:support@example.com"
                        className="text-[#8755f2] hover:underline"
                    >
                        support@example.com
                    </a>
                    .
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    6. Liên kết Bên thứ ba
                </h2>
                <p className="text-gray-600 mb-4">
                    Nền tảng của chúng tôi có thể chứa liên kết đến các trang web bên thứ
                    ba. Chúng tôi không chịu trách nhiệm về chính sách bảo mật của họ. Vui
                    lòng xem xét chính sách của các trang đó trước khi cung cấp thông tin.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    7. Thay đổi Chính sách
                </h2>
                <p className="text-gray-600 mb-4">
                    Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Bạn sẽ
                    được thông báo về các thay đổi quan trọng qua email hoặc trên nền tảng.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">8. Liên hệ</h2>
                <p className="text-gray-600 mb-4">
                    Nếu bạn có câu hỏi về Chính sách Bảo mật, vui lòng liên hệ qua{" "}
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
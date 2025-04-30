
import TeamMember from "../components/TeamMember";
import phatInfo from "../assets/z5330619618016_daeb33562f9ea005717c9fc77d6e7b3f.jpg";
import hungInfo from "../assets/429876726_1477842142803283_6210550601855463646_n.jpg";
export default function AboutUs() {
    const members = [
        {
            name: "Đặng Trần Tấn Phát",
            studentId: "22649051",
            image: phatInfo,
            description:
                "Nghiên cứu, xây dựng giao diện, thực hiện các chức năng, cấu trúc dự án để hệ thống hoạt động ổn định nhất.",

            github: "https://github.com/WestTand",
            facebook: "https://www.facebook.com/profile.php?id=100009307655746",
        },
        {
            name: "Huỳnh Ánh Hưng",
            studentId: "22645171",
            image: hungInfo,
            description:
                "Tìm kiếm xây dựng nguồn dữ liệu, hình ảnh đa dạng để đưa vào các trang của website, kiểm thử sản phẩm.",
            github: "https://github.com/DarqPL",
            facebook: "https://www.facebook.com/DarqPL456",
        },
    ];


    return (
        <div className="min-h-screen bg-gray-100">
            <section className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-[#8755f2] mb-4">1.Về Chúng Tôi</h2>
                    <p className="text-gray-700 mb-4 text-justify ">
                        Chào mừng bạn đến với trang web thương mại điện tử của chúng tôi!
                        <br />
                        Trang web này được tham khảo xây dựng giao diện từ Udemy
                        <br />
                        <strong>Đặng Trần Tấn Phát</strong> và <strong>Huỳnh Ánh Hưng</strong> của trường Đại học Công Nghiệp TP.HCM.
                        <br />
                        Chúng tôi đã cố gắng tạo ra một trang web thương mại điện tử đơn giản nhưng đầy đủ chức năng, với giao diện thân thiện và dễ sử dụng.
                        <br />
                        Mục tiêu của chúng tôi là cung cấp cho người dùng trải nghiệm mua sắm trực tuyến tốt nhất có thể.
                        <br />
                        Chúng tôi hy vọng bạn sẽ thích trang web này và tìm thấy những sản phẩm mà bạn yêu thích.
                        <br />
                        Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, xin vui lòng liên hệ với chúng tôi qua các liên kết bên dưới.
                    </p>

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold  text-[#8755f2] mb-4">2. Thành viên thực hiện</h2>
                        <p className="text-gray-700 mb-4">Nhóm thực hiện bao gồm 2 thành viên:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {members.map((member, index) => (
                                <TeamMember
                                    key={index}
                                    name={member.name}
                                    studentId={member.studentId}
                                    image={member.image}
                                    description={member.description}
                                    github={member.github}
                                    facebook={member.facebook}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
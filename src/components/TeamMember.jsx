export default function TeamMember({ name, studentId, image, description, github, facebook }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden max-w-sm mx-auto">
            <img src={image} alt={name} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800">
                    {name} <span className="text-sm text-gray-500">{studentId}</span>
                </h5>
                <p className="text-gray-600 h-20">{description}</p>
                <div className="flex gap-2 mt-2">
                    <a
                        href={github}
                        className="flex-1 bg-gray-800 text-white text-center py-2 rounded hover:bg-gray-900"
                    >
                        Github
                    </a>
                    <a
                        href={facebook}
                        className="flex-1 bg-[#8755f2] text-white text-center py-2 rounded hover:bg-purple-700"
                    >
                        Facebook
                    </a>
                </div>
            </div>
        </div>
    );
}
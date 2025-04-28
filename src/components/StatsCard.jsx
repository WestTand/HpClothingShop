import PropTypes from "prop-types";

export default function StatCard({ title, value, bgColor, textColor }) {
    return (
        <div className={`p-4 rounded-lg ${bgColor}`}>
            <h3 className={`font-medium ${textColor}`}>{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
};

StatCard.defaultProps = {
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
};
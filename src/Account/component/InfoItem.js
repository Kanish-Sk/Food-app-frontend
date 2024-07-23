const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-white truncate">{value}</p>
    </div>
  </div>
);

export default InfoItem;

interface AdditionalInfoTabContentProps {
  data: any;
}

export default function AdditionalInfoTabContent({
  data,
}: AdditionalInfoTabContentProps) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {data?.additional_info?.length > 0 ? (
          data.additional_info.map(
            (info: { key: string; value: string }, index: number) => (
              <tr
                key={info.key}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="py-3 px-4 text-brand-dark font-medium capitalize w-1/4">
                  {info.key.replace(/_/g, " ")}
                </td>
                <td className="py-3 px-4">{info.value || "N/A"}</td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan={2} className="py-3 px-4 text-center text-gray-500">
              No additional information available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

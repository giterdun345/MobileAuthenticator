import Typography from "@components/ZCommon/Typography";

export default function KeyValuePair({
  valueKey,
  value,
}: {
  valueKey: string;
  value: string;
}) {
  return (
    <>
      <Typography
        size={13}
        weight="semiBold"
        sx={{ marginTop: 10, marginBottom: 10 }}
      >
        {valueKey}:{" "}
      </Typography>
      <Typography size={15} weight="bold" sx={{ marginLeft: 15 }}>
        {value}
      </Typography>
    </>
  );
}

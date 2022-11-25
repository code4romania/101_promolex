import { Box, Link, Stack, Typography } from "@mui/material";
import { useLegislationInitiativeDetailsQuery } from "../queries";
import { legislationInitiativesTableColumns } from "../utils";
import { DetailsRow } from "./DetailsRow";
import { Table } from "./Table";

type LegislationInitiativeDetailsProps = {
  docId: string;
};

export const LegislationInitiativeDetails = ({
  docId,
}: LegislationInitiativeDetailsProps) => {
  const { data } = useLegislationInitiativeDetailsQuery(docId);

  return (
    <Stack gap={4}>
      {data && (
        <Table
          columns={legislationInitiativesTableColumns}
          getRowId={() => docId}
          height={138}
          hideFooter
          rows={[data]}
        />
      )}
      <DetailsRow
        details={data?.last_update ?? ""}
        label="Ultima actualizare a proiectului"
      />
      <Stack direction="row" gap={1}>
        <Typography fontWeight={700}>Link:</Typography>
        <Link href={data?.link_proiect} target="_blank">
          {data?.link_proiect}
        </Link>
      </Stack>
      <DetailsRow
        details={data?.dom_int ?? ""}
        label="Domeniul de intervenție în legislație"
      />
      <DetailsRow
        details={data?.autor?.map(({ full_name }) => full_name) ?? ""}
        label="Autori"
      />
      <DetailsRow
        details={data?.urgenta ?? ""}
        label="Procedură de urgență sau mod prioritar"
      />
      <DetailsRow
        details={
          data?.comisia_sesizata?.map(({ committee }) => committee) ?? ""
        }
        label="Comisia permanentă sesizată în fond"
      />
      <DetailsRow
        details={data?.cons_pub ?? ""}
        label="Consultări publice în Parlament"
      />
      <DetailsRow
        details={data?.avizat_proiectul ?? ""}
        label="Avize/expertize la proiectul de lege"
      />
      <DetailsRow
        details={data?.amendamente ?? ""}
        label="Amendamente depuse de deputați"
      />
      <Stack gap={1}>
        <DetailsRow
          details={data?.data_vot_1_lect ?? ""}
          label="Votare I lectură"
        />
        <Box pl={4}>
          <DetailsRow
            details={
              data?.dep_pentru_1_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Pentru (${data?.dep_pentru_1_lect?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.dep_contra_1_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Contra (${data?.dep_contra_1_lect?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.dep_abtinut_1_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Nu a votat (${data?.dep_abtinut_1_lect?.length ?? 0})`}
          />
        </Box>
      </Stack>
      <Stack gap={1}>
        <DetailsRow
          details={data?.data_vot_2_lect ?? ""}
          label="Votare a-II-a lectură"
        />
        <Box pl={4}>
          <DetailsRow
            details={
              data?.dep_pentru_2_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Pentru (${data?.dep_pentru_2_lect?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.dep_contra_2_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Contra (${data?.dep_contra_2_lect?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.dep_abtinut_2_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Nu a votat (${data?.dep_abtinut_2_lect?.length ?? 0})`}
          />
        </Box>
      </Stack>
      <Stack gap={1}>
        <DetailsRow
          details={data?.data_vot_3_lect ?? ""}
          label="Votare a-III-a lectură"
        />
        <Box pl={4}>
          <DetailsRow
            details={
              data?.dep_pentru_3_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Pentru (${data?.dep_pentru_3_lect?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.dep_contra_3_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Contra (${data?.dep_contra_3_lect?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.dep_abtinut_3_lect?.map(({ full_name }) => full_name) ?? ""
            }
            label={`Nu a votat (${data?.dep_abtinut_3_lect?.length ?? 0})`}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

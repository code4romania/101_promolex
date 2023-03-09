import { Box, Link, Stack, Typography } from '@mui/material';
import { useLegislationInitiativeDetailsQuery } from '../queries';
import { legislationInitiativesTableColumns } from '../utils';
import { DetailsRow } from './DetailsRow';
import { Table } from './Table';

type LegislationInitiativeDetailsProps = {
  docId: string;
};

export function LegislationInitiativeDetails({
  docId,
}: LegislationInitiativeDetailsProps) {
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
        details={data?.lastUpdate ?? ''}
        label='Ultima actualizare a proiectului'
      />
      <Stack direction='row' gap={1} flexWrap='wrap'>
        <Typography fontWeight={700}>Link:</Typography>
        <Link href={data?.linkProiect} target='_blank'>
          Vezi proiect
        </Link>
      </Stack>
      <DetailsRow
        details={data?.domInt ?? ''}
        label='Domeniul de intervenție în legislație'
      />
      <DetailsRow
        details={
          Array.isArray(data?.autor)
            ? data?.autor?.map(({ fullName }) => fullName) ?? ''
            : data?.autor ?? ''
        }
        label='Autori'
      />
      <DetailsRow
        details={data?.urgenta ?? ''}
        label='Procedură de urgență sau mod prioritar'
      />
      <DetailsRow
        details={data?.comisiaSesizata?.map(({ committee }) => committee) ?? ''}
        label='Comisia permanentă sesizată în fond'
      />
      <DetailsRow
        details={data?.consPub ?? ''}
        label='Consultări publice în Parlament'
      />
      <DetailsRow
        details={data?.avizatProiectul ?? ''}
        label='Avize/expertize la proiectul de lege'
      />
      <DetailsRow
        details={data?.amendamente ?? ''}
        label='Amendamente depuse de deputați'
      />
      <Stack gap={1}>
        <DetailsRow
          details={data?.dataVot1Lect ?? ''}
          label='Votare I lectură'
        />
        <Box pl={4}>
          <DetailsRow
            details={
              data?.['1LectDepPentru']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Pentru (${data?.['1LectDepPentru']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['1LectDepContra']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Contra (${data?.['1LectDepContra']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['1LectDepAbtinut']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Nu a votat (${data?.['1LectDepAbtinut']?.length ?? 0})`}
          />
        </Box>
      </Stack>
      <Stack gap={1}>
        <DetailsRow
          details={data?.dataVot2Lect ?? ''}
          label='Votare a-II-a lectură'
        />
        <Box pl={4}>
          <DetailsRow
            details={
              data?.['2LectDepPentru']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Pentru (${data?.['2LectDepPentru']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['2LectDepContra']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Contra (${data?.['2LectDepContra']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['2LectDepAbtinut']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Nu a votat (${data?.['2LectDepAbtinut']?.length ?? 0})`}
          />
        </Box>
      </Stack>
      <Stack gap={1}>
        <DetailsRow
          details={data?.dataVot3Lect ?? ''}
          label='Votare a-III-a lectură'
        />
        <Box pl={4}>
          <DetailsRow
            details={
              data?.['3LectDepPentru']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Pentru (${data?.['3LectDepPentru']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['3LectDepContra']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Contra (${data?.['3LectDepContra']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['3LectDepAbtinut']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Nu a votat (${data?.['3LectDepAbtinut']?.length ?? 0})`}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

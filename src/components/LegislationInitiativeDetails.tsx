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
      <Stack direction='row' gap={1}>
        <Typography fontWeight={700}>Link:</Typography>
        <Link href={data?.linkProiect} target='_blank'>
          {data?.linkProiect}
        </Link>
      </Stack>
      <DetailsRow
        details={data?.domInt ?? ''}
        label='Domeniul de intervenție în legislație'
      />
      <DetailsRow
        details={data?.autor?.map(({ fullName }) => fullName) ?? ''}
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
              data?.['1depPentruLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Pentru (${data?.['1depPentruLect']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['1depContraLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Contra (${data?.['1depContraLect']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['1depAbtinutLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Nu a votat (${data?.['1depAbtinutLect']?.length ?? 0})`}
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
              data?.['2depContraLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Pentru (${data?.['2depContraLect']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['2depContraLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Contra (${data?.['2depContraLect']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['2depAbtinutLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Nu a votat (${data?.['2depAbtinutLect']?.length ?? 0})`}
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
              data?.['3depPentruLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Pentru (${data?.['3depPentruLect']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['3depContraLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Contra (${data?.['3depContraLect']?.length ?? 0})`}
          />
          <DetailsRow
            details={
              data?.['3depAbtinutLect']?.map(({ fullName }) => fullName) ?? ''
            }
            label={`Nu a votat (${data?.['3depAbtinutLect']?.length ?? 0})`}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

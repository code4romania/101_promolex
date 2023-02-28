import {
  Box,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  StackProps,
  styled,
  Typography,
} from '@mui/material';
import { chain, toPairs } from 'lodash';
import { ReactNode, useMemo, useState } from 'react';
import columns from '../assets/images/columns.png';
import folder from '../assets/images/folder.png';
import gears from '../assets/images/gears.png';
import info from '../assets/images/info.png';
import logoPromoLexRo from '../assets/images/logo_promo_lex_ro.png';
import logoUsaid from '../assets/images/logo_usaid.png';
import monitoring from '../assets/images/monitoring.png';
import promo from '../assets/images/promo.png';
import publications from '../assets/images/publications.png';
import shootingTarget from '../assets/images/shooting_target.png';
import signpost from '../assets/images/signpost.png';
import { PageContainer } from '../components';

interface StyledStackProps extends StackProps {
  isSelected?: boolean;
}

const StyledStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'success',
})<StyledStackProps>(({ isSelected, theme }) => ({
  alignItems: 'center',
  border: '1px solid',
  borderColor: isSelected ? '#88A9B5' : theme.palette.common.white,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  gap: 4,
  padding: theme.spacing(4),

  '&:hover': {
    borderColor: '#88A9B5',
  },
}));

const objectives = {
  scop: {
    label: 'Scop',
    image: shootingTarget,
  },
  metodologie: {
    label: 'Metodologie',
    image: gears,
    title: 'Metodologia de monitorizare',
  },
  piloni: {
    label: 'Piloni',
    image: columns,
  },
  directii: {
    label: 'Direcții',
    image: signpost,
  },
  publicatii: {
    label: 'Publicații',
    image: publications,
  },
};

const pillarItems = {
  monitoring: {
    label: 'Monitorizare',
    image: monitoring,
    description:
      'Prin observarea activității Parlamentului realizată de monitori prin: urmărire directă, efectuarea de vizite, prin scanarea online a surselor de informare, interviuri etc.',
  },
  research: {
    label: 'Cercetare',
    image: folder,
    description:
      'Prin elaborarea de studii analitice (opinii pe proiecte de legi; note analitice; rapoarte de monitorizare etc.) pe anumite probleme separate sau în rezultatul monitorizării anuale.',
  },
  piloni: {
    label: 'Informare',
    image: info,
    description:
      'Prin informarea în mod constant a publicului privind rezultatele monitorizării prin: postări periodice pe rețelele sociale; comunicate de presă; publicarea analizelor tematice și a raportului anual, etc.',
  },
  directii: {
    label: 'Promovare & Advocacy',
    image: promo,
    description:
      'Promovarea permanentă a concluziilor și recomandărilor deduse în rezultatul monitorizării.',
  },
};

type ObjectiveKey = keyof typeof objectives;
type PillarItemKey = keyof typeof pillarItems;

export function AboutProjectPage() {
  const [selectedObjective, setSelectedObjective] =
    useState<ObjectiveKey>('scop');
  const [selectedPillarItem, setSelectedPillarItem] =
    useState<PillarItemKey>('monitoring');

  const objectiveItems = useMemo<
    Record<keyof typeof objectives, { title: string; description: ReactNode }>
  >(
    () => ({
      scop: {
        title: 'Scopul activității de monitorizare',
        description:
          'Scopul monitorizării activității Parlamentului este de a asigura o transparență mai mare a instituției, de a eficientiza procedura legislativă și de a responsabiliza părțile implicate, inclusiv, prin sporirea participării cetățenești.',
      },
      metodologie: {
        title: 'Metodologia de monitorizare',
        description: (
          <Stack gap={4}>
            <Typography fontSize={20}>
              Metodologia stabilește și reglementează cadrul metodic, părțile,
              durata și procedurile de monitorizare a activității Parlamentului
              Republicii Moldova, în perioada anilor 2021-2025. Exercițiul de
              monitorizare presupune colectarea și prelucrarea informațiilor
              calitative și cantitative prin intermediul unor metode/instrumente
              de lucru prestabilite. Acesta reprezintă un ansamblu structurat de
              obiective, instrumente și metode de cunoaștere caracterizată
              printr-un grad anumit de generalizare. La necesitate,
              instrumentele metodologice ar putea fi adaptate pe parcurs, dar
              fără a afecta obiectivitatea datelor colectate și vectorul
              evoluției în timp a rezultatelor monitorizării.
            </Typography>
            <Typography fontSize={20}>
              Metodologia a fost prezentată și discutată la începutul
              monitorizării cu conducerea Parlamentului și reprezentanții
              Secretariatului instituției.,
            </Typography>
          </Stack>
        ),
      },
      piloni: {
        title: 'Pilonii de intervenție',
        description: (
          <>
            <Typography fontSize={20}>
              Instrumentele utilizate se referă la patru aspecte fundamentale
              ale construcției metodologice:
            </Typography>
            <Stack
              alignItems='flex-start'
              justifyContent='center'
              direction='row'
              gap={4}
              overflow='auto'
            >
              {toPairs(pillarItems).map(
                ([key, { label, image, description }]) => (
                  <StyledStack
                    flexGrow={0}
                    isSelected
                    key={key}
                    onClick={() => setSelectedPillarItem(key as PillarItemKey)}
                    onMouseEnter={() =>
                      setSelectedPillarItem(key as PillarItemKey)
                    }
                    textAlign='center'
                    sx={{
                      transition: 'height 0.3s ease-in-out',
                    }}
                    width={280}
                  >
                    <Box>
                      <img alt={label} height={70} src={image} />
                    </Box>
                    <Typography fontWeight='medium' variant='h5'>
                      {label}
                    </Typography>
                    <Collapse in={selectedPillarItem === key} unmountOnExit>
                      <Typography mt={3}>{description}</Typography>
                    </Collapse>
                  </StyledStack>
                ),
              )}
            </Stack>
          </>
        ),
      },
      directii: {
        title: 'Direcțiile de monitorizare',
        description: (
          <Box>
            <Typography fontSize={20}>
              Monitorizarea se realizează în baza următoarelor obiective:
            </Typography>

            <List dense sx={{ listStyleType: 'disc', pl: 8 }}>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='Transparența organului legislativ și promovarea conceptului de
              Open Data.'
                  primaryTypographyProps={{ fontSize: 20 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='Etapele și transparența procedurii legislative.'
                  primaryTypographyProps={{ fontSize: 20 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='Comunicarea dintre instituția parlamentară și deputați, pe de o
              partea, și cetățean, de cealaltă parte.'
                  primaryTypographyProps={{ fontSize: 20 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='Activitatea unor comisii parlamentare permanente.'
                  primaryTypographyProps={{ fontSize: 20 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='Exercitarea de către Legislativ a funcției de control parlamentar.'
                  primaryTypographyProps={{ fontSize: 20 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='Managementul bugetar și administrativ.'
                  primaryTypographyProps={{ fontSize: 20 }}
                />
              </ListItem>
            </List>
          </Box>
        ),
      },
      publicatii: {
        title: 'Publicații',
        description:
          'Sinteza activităților de monitorizare a proiectului va fi inclusă într-un Raport anual, cu caracter periodic, pe parcursul anilor 2022 - 2026. Raportul va include principalele aspecte ale monitorizării, fiind analizate, inclusiv, din perspectiva evolutivă.',
      },
    }),
    [selectedPillarItem],
  );

  return (
    <PageContainer pageTitle='Despre proiect'>
      <Typography
        color='secondary'
        fontWeight='medium'
        gutterBottom
        variant='h5'
      >
        Monitorizarea activității Parlamentului Republicii Moldova
      </Typography>
      <Typography fontSize={20}>
        Asociația Promo-LEX monitorizează activitatea Parlamentului Republicii
        Moldova în perioada anilor 2021 - 2025, în special din perspectiva
        transparenței, legalității și eficienței procedurilor. Exercițiul de
        monitorizare cuprinde câteva dintre domeniile gestionate de instituția
        parlamentară. Acestea se referă la respectarea transparenței
        decizionale, la evaluarea modului de desfășurare a ședințelor plenare, a
        activității unor comisii parlamentare, a funcției de control
        parlamentar, a managementului bugetar și administrativ. De asemenea,
        este evaluat nivelul de interacțiune a deputaților cu publicul larg și
        modul de comunicare a Parlamentului cu cetățenii.
      </Typography>
      <Grid container py={12}>
        <Grid
          alignItems='center'
          display='flex'
          item
          xs={12}
          justifyContent='center'
          md={6}
        >
          <Box>
            <img alt='Logo Promo-LEX' height={98} src={logoPromoLexRo} />
          </Box>
          <Box>
            <img alt='Logo USAID' height={98} src={logoUsaid} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography fontSize={20}>
            Activitatea de monitorizare a Parlamentului Republicii Moldova are
            loc în cadrul Programului „
            <strong>Democrație, Transparență și Responsabilitate</strong>”,
            implementat de Asociația Promo-LEX, în perioada anilor 2016 - 2025,
            cu sprijinul financiar a Agenției Statelor Unite pentru Dezvoltare
            Internațională (USAID).
          </Typography>
        </Grid>
      </Grid>
      <Stack justifyContent='center' direction='row' gap={12} overflow='auto'>
        {chain(objectives)
          .toPairs()
          .map(([key, objective]) => (
            <StyledStack
              key={objective.label}
              onClick={() => setSelectedObjective(key as ObjectiveKey)}
              isSelected={selectedObjective === key}
              width={160}
            >
              <Typography fontWeight='medium' variant='h5'>
                {objective.label}
              </Typography>
              <Box>
                <img alt={objective.label} height={98} src={objective.image} />
              </Box>
            </StyledStack>
          ))
          .value()}
      </Stack>
      <Stack gap={8} pt={20}>
        {objectiveItems[selectedObjective] && (
          <>
            <Typography
              color='secondary'
              fontWeight='medium'
              gutterBottom
              variant='h5'
            >
              {objectiveItems[selectedObjective].title}
            </Typography>
            {typeof objectiveItems[selectedObjective].description ===
            'string' ? (
              <Typography fontSize={20}>
                {objectiveItems[selectedObjective].description}
              </Typography>
            ) : (
              objectiveItems[selectedObjective].description
            )}
          </>
        )}
      </Stack>
      <Typography fontSize={20} fontWeight='bold' textAlign='center' my={15}>
        Informațiile plasate pe această platformă pot fi preluate în mod liber
        pentru a fi distribuite, publicate și difuzate cu condiția menționării
        exprese în material a sursei (referință la Asociația Promo-LEX și/sau
        pagina www.101.promolex.md).
      </Typography>

      <Box bgcolor='#83538838' py={6} px={8}>
        <Typography fontWeight='medium' gutterBottom variant='h5'>
          Asociația Promo-LEX
        </Typography>
        <Typography fontSize={20}>
          <u>Asociația Promo-LEX</u> este o organizație neguvernamentală, care
          are drept scop dezvoltarea democrației în Republica Moldova, inclusiv
          în regiunea transnistreană, prin promovarea și apărarea drepturilor
          omului, monitorizarea proceselor democratice și consolidarea
          societății civile. Asociația Promo-LEX a fost constituită în anul 2002
          și este o organizație apolitică, nonprofit și care deține Certificat
          de Utilitate Publică.
        </Typography>
      </Box>
    </PageContainer>
  );
}

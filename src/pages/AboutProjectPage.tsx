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
import { Link } from 'react-router-dom';
import columns from '../assets/images/columns.png';
import folder from '../assets/images/folder.png';
import gears from '../assets/images/gears.png';
import impact from '../assets/images/impact.png';
import info from '../assets/images/info.png';
import logoPromoLexRo from '../assets/images/logo_promo_lex_ro.png';
import logoUsaid from '../assets/images/logo_usaid.png';
import monitoring from '../assets/images/monitoring.png';
import promo from '../assets/images/promo.png';
import shootingTarget from '../assets/images/shooting_target.png';
import { PageContainer } from '../components';
import { Routes } from '../types';

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
  impact: {
    label: 'Impact',
    image: impact,
  },
};

const pillarItems = {
  monitoring: {
    label: 'Monitorizare',
    image: monitoring,
    descriptions: [
      'monitorizarea transparenței decizionale;',
      'evaluarea modului de organizare/desfășurare a ședințelor Parlamentului;',
      'monitorizarea comisiilor parlamentare;',
      'monitorizarea mecanismelor de control parlamentar;',
      'monitorizarea managementului bugetar și administrativ.',
    ],
  },
  research: {
    label: 'Analiză și Cercetare',
    image: folder,
    descriptions: [
      'elaborarea rapoartelor anuale de monitorizare;',
      'elaborarea sintezelor ședințelor în plen;',
      'elaborarea de note analitice, documente de politici pe subiecte din agenda parlamentară sau de interes public;',
      'elaborarea opiniilor asupra proiectelor de legi/hotărârilor de Parlament relevante ariei de interes a Asociației Promo-LEX.',
    ],
  },
  piloni: {
    label: 'Informare',
    image: info,
    descriptions: [
      'crearea unei pagini web dedicată activității Parlamentului și deputaților;',
      'organizarea meselor rotunde, dezbaterilor pe subiecte de actualitate;',
      'comunicarea și promovarea rezultatelor monitorizării prin intermediul mass-media și a rețelelor sociale.',
    ],
  },
  promo: {
    label: 'Promovare & Advocacy',
    image: promo,
    descriptions: [
      'elaborarea și promovarea propunerilor de îmbunătățire a activității Parlamentului;',
      'advocacy pentru implementarea conceptului Open data (date deschise);',
      'încurajarea stabilirii unei platforme durabile de comunicare între Parlament și organizațiile societății civile.',
    ],
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
        description: (
          <Typography textAlign='justify'>
            <strong>Scopul monitorizării</strong> activității Parlamentului este
            de a asigura o transparență mai mare a instituției, de a eficientiza
            procedurile legislative și de a responsabiliza părțile implicate,
            inclusiv, prin sporirea interacțiunii dintre Parlament/deputați și
            societate.
          </Typography>
        ),
      },
      metodologie: {
        title: 'Metodologia de monitorizare',
        description: (
          <Stack gap={4}>
            <Typography textAlign='justify'>
              <strong>Metodologia</strong> elaborată de Promo-LEX ține cont de
              experiența anterioară de monitorizare a activității Parlamentului,
              inclusiv a eforturilor de monitorizare desfășurate de alte
              asociații obștești din Republica Moldova, dar în special de bunele
              practici internaționale cu privire la monitorizarea activității
              legislativului și asigurarea unei comunicări eficiente cu
              cetățenii.
            </Typography>
            <Typography textAlign='justify'>
              Prezenta Metodologie de monitorizare abordează aspect precum:
              respectarea transparenței decizionale în activitatea
              legislativului; evaluează modul de desfășurare a ședințelor
              plenare, dar și a activității unor comisii parlamentare;
              analizează felul în care instituția își exercită funcția de
              control parlamentar; precum și executarea managementului bugetar
              și administrativ. De asemenea, este evaluat nivelul de
              interacțiune a deputaților cu cetățenii, dar și modul de
              comunicare a Parlamentului în ansamblu cu publicul larg.
            </Typography>
            <Typography textAlign='justify'>
              În practică, monitorizarea activității Parlamentului și a
              deputaților presupune:
            </Typography>

            <List dense sx={{ listStyleType: 'disc', pl: 8 }}>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='colectarea, din surse deschise, a informațiilor calitative și cantitative de către monitorii Promo-LEX, inclusiv prin urmărirea directă a ședințelor legislativului;'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='analiza răspunsurilor la cererile de acces la informație transmise în adresa legislativului și/sau a altor persoane/instituții care pot oferi informații relevante pentru procesul de monitorizare;'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='desfășurarea interviurilor cu deputații, reprezentanții Secretariatului instituției dar și alte persoane relevante;'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='analiza informațiilor publicate în sursele media de informare, inclusiv în rețelele sociale. '
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
            </List>
            <Typography textAlign='justify'>
              Metodologia a fost prezentată și discutată la începutul
              monitorizării cu conducerea Parlamentului și reprezentanții
              Secretariatului instituției.
            </Typography>
          </Stack>
        ),
      },
      piloni: {
        title: 'Pilonii de intervenție',
        description: (
          <>
            <Typography>
              Activitățile proiectului sunt concentrate pe patru piloni de
              intervenție:
            </Typography>
            <Stack
              alignItems='flex-start'
              justifyContent={{ xs: 'flex-start', sm: 'center' }}
              direction='row'
              gap={4}
              overflow='auto'
            >
              {toPairs(pillarItems).map(
                ([key, { label, image, descriptions }]) => (
                  <StyledStack
                    flexShrink={0}
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
                      <List dense sx={{ listStyleType: 'disc', pl: 8 }}>
                        {descriptions.map((description) => (
                          <ListItem
                            key={description}
                            disablePadding
                            sx={{ display: 'list-item' }}
                          >
                            <ListItemText primary={description} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </StyledStack>
                ),
              )}
            </Stack>
          </>
        ),
      },
      impact: {
        title: 'Impact',
        description: (
          <Box>
            <List dense sx={{ listStyleType: 'disc', pl: 8 }}>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='realizarea de către Republica Moldova a Obiectivelor de Dezvoltare Durabilă (ODD), în special ODD 16, care se concentrează pe promovarea „păcii, justiției și instituțiilor puternice”;'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='implementarea în Republica Moldova a Declarației privind deschiderea parlamentară (Declaration on Parliamentary Openness, 2012)'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='consolidarea transparenței Parlamentului, respectiv îmbunătățirea imaginii autorității și sporirea gradului de informare a opiniei publice privind procesul legislative;'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='îmbunătățirea calității procesului decizional prin monitorizarea procesului legislativ din perspectiva conformității acestuia cu cerințele legale;'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
              <ListItem disablePadding sx={{ display: 'list-item' }}>
                <ListItemText
                  primary='eficientizarea comunicării între Parlament și organizațiile societății civile, care pot contribui la sporirea calității procesului legislativ datorită expertizei deținute.'
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItem>
            </List>
          </Box>
        ),
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
      <Typography textAlign='justify' gutterBottom>
        Asociația Promo-LEX implementează în perioada 2016 - 2025 Programul
        „Democrație, Transparență și Responsabilitate”, cu susținerea financiară
        a Agenției Statelor Unite pentru Dezvoltare Internațională (USAID).
      </Typography>
      <Typography textAlign='justify' gutterBottom>
        În cadrul acestui Program, în anii 2016 - 2019 Promo-LEX a monitorizat
        activitatea Parlamentului din perspectiva realizării funcției de control
        parlamentar, dar și de asigurare a respectării cadrului legal privind
        ocuparea și încetarea funcțiilor publice în partea ce ține de
        atribuțiile legislativului.{' '}
        <em>
          Rapoartele respective de monitorizare pot fi consultate{' '}
          <Link to={Routes.Reports} style={{ textDecoration: 'none' }}>
            <Typography
              color='primary'
              component='span'
              fontSize='inherit'
              fontWeight='inherit'
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              aici
            </Typography>
          </Link>
        </em>
        .
      </Typography>
      <Typography textAlign='justify' gutterBottom>
        Pornind de la concluziile respectivei monitorizări, dar și de la
        necesitatea consolidării proceselor de luare a deciziilor și a
        asigurării unei transparențe proactive în activitatea legislativului,
        Promo-LEX a decis sa extindă și să aprofundeze, eforturile de
        monitorizare a Parlamentului Republicii Moldova.
      </Typography>
      <Typography textAlign='justify' gutterBottom>
        Astfel, în perioada 2021 - 2025 Promo-LEX și-a propus să monitorizeze
        activitatea Parlamentului Republicii Moldova, în special din perspectiva
        transparenței, legalității și eficienței procedurilor.
      </Typography>
      <Typography textAlign='justify' gutterBottom>
        Monitorizarea activității Parlamentului este necesară și benefică în
        virtutea necesității de îmbunătățire a calității proceselor decizionale,
        a transparentizării continue a acestora, precum și în vederea
        responsabilizării actorilor implicați.
      </Typography>
      <Stack
        justifyContent={{ xs: 'flex-start', sm: 'center' }}
        direction='row'
        gap={12}
        overflow='auto'
        mt={10}
      >
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
              <Typography textAlign='justify'>
                {objectiveItems[selectedObjective].description}
              </Typography>
            ) : (
              objectiveItems[selectedObjective].description
            )}
          </>
        )}
      </Stack>

      <Box bgcolor='#83538838' py={6} px={8} mt={15}>
        <Typography fontWeight='medium' gutterBottom variant='h5'>
          Asociația Promo-LEX
        </Typography>
        <Typography textAlign='justify'>
          Asociația Promo-LEX este o organizație neguvernamentală, care are
          drept scop dezvoltarea democrației în Republica Moldova, inclusiv în
          regiunea transnistreană, prin promovarea și apărarea drepturilor
          omului, monitorizarea proceselor democratice și consolidarea
          societății civile.
        </Typography>
        <Typography textAlign='justify'>
          Responsabilitatea pentru opiniile exprimate pe această pagină, precum
          și în produsele analitice elaborate în cadrul Programului „Democrație,
          Transparență și Responsabilitate” aparțin Asociației Promo-LEX și nu
          reflectă neapărat poziția donatorului.
        </Typography>
      </Box>
      <Grid container py={12} spacing={10}>
        <Grid display={{ xs: 'none', md: 'block' }} md={3} />
        <Grid
          alignItems='center'
          display='flex'
          item
          xs={12}
          justifyContent='center'
          md={3}
        >
          <Box>
            <img alt='Logo Promo-LEX' height={98} src={logoPromoLexRo} />
          </Box>
        </Grid>
        <Grid
          alignItems='center'
          display='flex'
          item
          xs={12}
          justifyContent='center'
          md={3}
        >
          <Box>
            <img alt='Logo USAID' height={98} src={logoUsaid} />
          </Box>
        </Grid>
      </Grid>

      <Typography fontWeight='bold' textAlign='center'>
        Informațiile plasate pe această platformă pot fi preluate în mod liber
        pentru a fi distribuite, publicate și difuzate cu condiția menționării
        exprese în material a sursei (referință la Asociația Promo-LEX și/sau
        pagina www.101.promolex.md).
      </Typography>
    </PageContainer>
  );
}
